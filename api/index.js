import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';
import UserAgent from 'user-agents';
import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// Add stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

const app = express();

app.use(cors());
app.use(express.json());

// Browser instance management
let browser = null;
const DATA_DIR = path.join(process.cwd(), 'api', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret-change-me';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

const AIRPORT_CODES = {
    ahmedabad: 'AMD',
    bengaluru: 'BLR',
    bangalore: 'BLR',
    chennai: 'MAA',
    delhi: 'DEL',
    goa: 'GOI',
    hyderabad: 'HYD',
    jaipur: 'JAI',
    kolkata: 'CCU',
    lucknow: 'LKO',
    mumbai: 'BOM',
    pune: 'PNQ'
};

async function readUsers() {
    try {
        const raw = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        return [];
    }
}

async function writeUsers(users) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
    const hash = crypto.pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
    const [salt, expected] = stored.split(':');
    const actual = hashPassword(password, salt).split(':')[1];
    return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function signToken(user) {
    const payload = Buffer.from(JSON.stringify({
        sub: user.id,
        email: user.email,
        name: user.name,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64url');
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
    return `${payload}.${signature}`;
}

function verifyToken(token) {
    if (!token || !token.includes('.')) return null;
    const [payload, signature] = token.split('.');
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.exp > Date.now() ? data : null;
}

function requireAuth(req, res, next) {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    const session = verifyToken(token);
    if (!session) return res.status(401).json({ error: 'Please sign in to continue' });
    req.user = session;
    next();
}

function airportCode(cityOrCode) {
    const value = String(cityOrCode || '').trim();
    if (/^[A-Z]{3}$/.test(value)) return value;
    return AIRPORT_CODES[value.toLowerCase()] || null;
}

function parseMoney(value) {
    if (typeof value === 'number') return value;
    const match = String(value || '').match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, ''), 10) : null;
}

async function getBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--disable-blink-features=AutomationControlled'
            ]
        });
    }
    return browser;
}

// ============================================
// REAL FLIGHT SCRAPING - Google Flights
// ============================================
async function searchSerpApiFlights(from, to, date) {
    if (!process.env.SERPAPI_KEY) {
        console.log('    -> SERPAPI_KEY missing, skipping Google Flights API provider');
        return null;
    }

    const departureId = airportCode(from);
    const arrivalId = airportCode(to);
    if (!departureId || !arrivalId) {
        console.log(`    -> Airport code missing for ${from} or ${to}, skipping SerpApi`);
        return null;
    }

    try {
        console.log(`    -> Requesting live Google Flights data via SerpApi (${departureId} -> ${arrivalId})`);
        const response = await axios.get('https://serpapi.com/search.json', {
            timeout: 30000,
            params: {
                engine: 'google_flights',
                type: 2,
                departure_id: departureId,
                arrival_id: arrivalId,
                outbound_date: date,
                currency: 'INR',
                hl: 'en',
                api_key: process.env.SERPAPI_KEY
            }
        });

        const rows = [
            ...(response.data?.best_flights || []),
            ...(response.data?.other_flights || [])
        ].slice(0, 20);

        const flights = rows.map((row, index) => {
            const firstLeg = row.flights?.[0] || {};
            const lastLeg = row.flights?.[row.flights.length - 1] || firstLeg;
            const price = parseMoney(row.price);
            if (!price) return null;

            return {
                id: index + 1,
                airline: firstLeg.airline || 'Unknown airline',
                flightNumber: firstLeg.flight_number || `GF-${1000 + index}`,
                from,
                to,
                departure: firstLeg.departure_airport?.time || '',
                arrival: lastLeg.arrival_airport?.time || '',
                duration: row.total_duration ? `${Math.floor(row.total_duration / 60)}h ${row.total_duration % 60}m` : '',
                price,
                stops: Math.max((row.flights?.length || 1) - 1, 0),
                isDirect: (row.flights?.length || 1) === 1,
                source: 'Google Flights via SerpApi',
                bookingLink: response.data?.search_metadata?.google_flights_url || 'https://www.google.com/travel/flights',
                logo: firstLeg.airline_logo || ''
            };
        }).filter(Boolean);

        return flights.length ? flights.sort((a, b) => a.price - b.price) : null;
    } catch (error) {
        console.error('    SerpApi flight search failed:', error.response?.data?.error || error.message);
        return null;
    }
}

async function scrapeGoogleFlights(from, to, date) {
    console.log(`  🌐 Scraping Google Flights: ${from} → ${to}`);

    try {
        const browser = await getBrowser();
        const page = await browser.newPage();

        // Set realistic user agent
        const userAgent = new UserAgent({ deviceCategory: 'desktop' });
        await page.setUserAgent(userAgent.toString());

        // Set viewport
        await page.setViewport({ width: 1920, height: 1080 });

        // Build Google Flights URL
        const url = `https://www.google.com/travel/flights?q=Flights%20from%20${encodeURIComponent(from)}%20to%20${encodeURIComponent(to)}%20on%20${date}`;

        console.log(`    → Navigating to Google Flights...`);
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Wait for flight results to load
        await page.waitForTimeout(5000);

        // Extract flight data
        const flights = await page.evaluate(() => {
            const results = [];

            // Try multiple selectors for flight cards
            const flightCards = document.querySelectorAll('[jsname="IWWDBc"], .pIav-d, [class*="flight"]');

            flightCards.forEach((card, index) => {
                if (index >= 15) return; // Limit to 15 results

                try {
                    // Extract airline
                    const airlineEl = card.querySelector('[class*="sSHqwe"], [class*="airline"], img[alt*="logo"]');
                    const airline = airlineEl?.textContent?.trim() || airlineEl?.alt || 'Airline';

                    // Extract times
                    const timeElements = card.querySelectorAll('[class*="mv1WYe"], [class*="time"], span[aria-label*="Departure"], span[aria-label*="Arrival"]');
                    const departure = timeElements[0]?.textContent?.trim() || '';
                    const arrival = timeElements[1]?.textContent?.trim() || '';

                    // Extract price from visible currency text. Avoid guessing when Google changes classes.
                    const priceEl = Array.from(card.querySelectorAll('span, div'))
                        .find((el) => /₹|INR|Rs\.?/i.test(el.textContent || ''));
                    const priceText = priceEl?.textContent?.trim() || '';
                    const priceMatch = priceText.match(/[\d,]+/);
                    const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : null;

                    // Extract duration
                    const durationEl = card.querySelector('[class*="gvkrdb"], [aria-label*="Total duration"]');
                    const duration = durationEl?.textContent?.trim() || '';

                    // Extract stops
                    const stopsEl = card.querySelector('[class*="ogfYpf"], [class*="stops"]');
                    const stopsText = stopsEl?.textContent?.trim() || '';
                    const isDirect = stopsText.toLowerCase().includes('nonstop') || stopsText.toLowerCase().includes('direct');
                    const stopsMatch = stopsText.match(/(\d+)\s*stop/i);
                    const stops = isDirect ? 0 : (stopsMatch ? parseInt(stopsMatch[1]) : 1);

                    if (airline && departure && arrival && price) {
                        results.push({
                            airline,
                            departure,
                            arrival,
                            duration,
                            price,
                            stops,
                            isDirect,
                            stopsText
                        });
                    }
                } catch (err) {
                    console.log('Error parsing flight card:', err.message);
                }
            });

            return results;
        });

        await page.close();

        if (flights.length > 0) {
            console.log(`    ✅ Scraped ${flights.length} flights from Google`);
            return flights.map((flight, i) => ({
                id: i + 1,
                airline: flight.airline,
                flightNumber: `${flight.airline.substring(0, 2).toUpperCase()}-${1000 + i}`,
                from,
                to,
                departure: flight.departure,
                arrival: flight.arrival,
                duration: flight.duration,
                price: flight.price,
                stops: flight.stops,
                isDirect: flight.isDirect,
                source: 'Google Flights (Browser scrape)',
                bookingLink: url,
                logo: `https://images.kiwi.com/airlines/64/${flight.airline.substring(0, 2).toUpperCase()}.png`
            }));
        }

        console.log(`    No live flight prices found in Google Flights DOM`);
        return null;

    } catch (error) {
        console.error(`    ❌ Google Flights scraping failed:`, error.message);
        return null;
    }
}

// ============================================
// REAL HOTEL SCRAPING - Booking.com
// ============================================
async function scrapeBookingCom(destination, checkIn, checkOut) {
    console.log(`  🌐 Scraping Booking.com: ${destination}`);

    try {
        const browser = await getBrowser();
        const page = await browser.newPage();

        // Set realistic user agent
        const userAgent = new UserAgent({ deviceCategory: 'desktop' });
        await page.setUserAgent(userAgent.toString());

        await page.setViewport({ width: 1920, height: 1080 });

        // Build Booking.com URL
        const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=2&no_rooms=1`;

        console.log(`    → Navigating to Booking.com...`);
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Wait for results
        await page.waitForTimeout(5000);

        // Extract hotel data
        const hotels = await page.evaluate(() => {
            const results = [];

            // Try multiple selectors for hotel cards
            const hotelCards = document.querySelectorAll('[data-testid="property-card"], [data-testid*="property"], .sr_property_block');

            hotelCards.forEach((card, index) => {
                if (index >= 15) return;

                try {
                    // Extract name
                    const nameEl = card.querySelector('[data-testid="title"], h3, .sr-hotel__name');
                    const name = nameEl?.textContent?.trim();

                    // Extract price
                    const priceEl = card.querySelector('[data-testid="price-and-discounted-price"], .prco-valign-middle-helper, [class*="price"]');
                    const priceText = priceEl?.textContent?.trim() || '';
                    const priceMatch = priceText.match(/[\d,]+/);
                    const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : null;

                    // Extract rating
                    const ratingEl = card.querySelector('[data-testid="review-score"], .bui-review-score__badge');
                    const ratingText = ratingEl?.textContent?.trim() || '';
                    const ratingMatch = ratingText.match(/\d+\.?\d*/);
                    const rating = ratingMatch ? parseFloat(ratingMatch[0]) : 4.0;

                    // Extract image
                    const imageEl = card.querySelector('img[data-testid="image"], img');
                    const image = imageEl?.src || imageEl?.dataset?.src || '';

                    // Extract location
                    const locationEl = card.querySelector('[data-testid="address"], [class*="location"]');
                    const location = locationEl?.textContent?.trim() || '';

                    if (name && price) {
                        results.push({
                            name,
                            price,
                            rating,
                            image,
                            location
                        });
                    }
                } catch (err) {
                    console.log('Error parsing hotel card:', err.message);
                }
            });

            return results;
        });

        await page.close();

        if (hotels.length > 0) {
            console.log(`    ✅ Scraped ${hotels.length} hotels from Booking.com`);
            return hotels.map((hotel, i) => ({
                id: i + 1,
                name: hotel.name,
                location: hotel.location || destination,
                price: hotel.price,
                rating: hotel.rating,
                reviews: Math.floor(Math.random() * 1000) + 100,
                image: hotel.image || `https://source.unsplash.com/800x600/?hotel,luxury&sig=${i}`,
                amenities: ['WiFi', 'Breakfast', 'Pool', 'Parking'].slice(0, 2 + Math.floor(Math.random() * 3)),
                source: 'Booking.com (Scraped)',
                bookingLink: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`
            }));
        }

        console.log(`    ⚠️ No hotels found, using fallback`);
        return null;

    } catch (error) {
        console.error(`    ❌ Booking.com scraping failed:`, error.message);
        return null;
    }
}

// ============================================
// HOTEL FALLBACK (Only when hotel scraping fails)
// ============================================
function generateSmartHotels(destination) {
    console.log(`  ⚠️ Using smart fallback for hotels`);

    const cityData = {
        'Goa': { base: 4500, areas: ['Calangute', 'Baga', 'Candolim'] },
        'Mumbai': { base: 5500, areas: ['Colaba', 'Juhu', 'Bandra'] },
        'Delhi': { base: 4000, areas: ['Connaught Place', 'Aerocity'] },
        'default': { base: 5000, areas: ['City Center'] }
    };

    const config = cityData[destination] || cityData['default'];
    const chains = ['Taj', 'Marriott', 'Hyatt', 'Radisson', 'Lemon Tree'];
    const hotels = [];

    for (let i = 0; i < 15; i++) {
        const rating = 3.5 + Math.random() * 1.5;
        const stars = rating > 4.5 ? 5 : rating > 4.0 ? 4 : 3;

        hotels.push({
            id: i + 1,
            name: `${chains[i % chains.length]} ${destination}`,
            location: `${config.areas[i % config.areas.length]}, ${destination}`,
            price: Math.round(config.base * (stars * 0.4) * (0.8 + Math.random() * 0.5)),
            rating: parseFloat(rating.toFixed(1)),
            reviews: Math.floor(100 + Math.random() * 2000),
            image: `https://source.unsplash.com/800x600/?hotel,luxury&sig=${i}`,
            amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Breakfast'].slice(0, 3 + Math.floor(Math.random() * 3)),
            source: 'Estimated (Scraping blocked)',
            bookingLink: `https://www.booking.com/searchresults.html?ss=${destination}`
        });
    }

    return hotels.sort((a, b) => a.price - b.price);
}

// ============================================
// UNIFIED SEARCH
// ============================================
async function searchFlights(from, to, date) {
    console.log(`\n✈️  FLIGHT SEARCH: ${from} → ${to}\n`);

    let flights = await searchSerpApiFlights(from, to, date);

    if (!flights || flights.length === 0) {
        flights = await scrapeGoogleFlights(from, to, date);
    }

    if (!flights || flights.length === 0) {
        const details = process.env.SERPAPI_KEY
            ? 'Live providers returned no parsable fares for this route/date.'
            : 'Add SERPAPI_KEY to backend/.env for reliable Google Flights prices. Browser scraping is blocked or returned no fare text.';
        const error = new Error(details);
        error.status = 503;
        throw error;
    }

    return flights;
}

async function searchHotels(destination, checkIn, checkOut) {
    console.log(`\n🏨 HOTEL SEARCH: ${destination}\n`);

    // Try scraping first
    let hotels = await scrapeBookingCom(destination, checkIn, checkOut);

    // Fallback to smart generator
    if (!hotels || hotels.length === 0) {
        hotels = generateSmartHotels(destination);
    }

    return hotels;
}

// ============================================
// API ENDPOINTS
// ============================================

app.post('/api/auth/signup', async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const email = String(req.body.email || '').trim().toLowerCase();
        const password = String(req.body.password || '');

        if (!name || !email || password.length < 6) {
            return res.status(400).json({ error: 'Name, valid email, and 6+ character password are required' });
        }

        const users = await readUsers();
        if (users.some((user) => user.email === email)) {
            return res.status(409).json({ error: 'An account with this email already exists' });
        }

        const user = {
            id: crypto.randomUUID(),
            name,
            email,
            passwordHash: hashPassword(password),
            createdAt: new Date().toISOString()
        };
        users.push(user);
        await writeUsers(users);

        const token = signToken(user);
        res.status(201).json({ success: true, token, user: { id: user.id, name, email } });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Could not create account' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const email = String(req.body.email || '').trim().toLowerCase();
        const password = String(req.body.password || '');
        const users = await readUsers();
        const user = users.find((item) => item.email === email);

        if (!user || !verifyPassword(password, user.passwordHash)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = signToken(user);
        res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Could not sign in' });
    }
});

app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({ success: true, user: { id: req.user.sub, name: req.user.name, email: req.user.email } });
});

app.post('/api/payments/create-order', requireAuth, async (req, res) => {
    try {
        const amount = Math.round(Number(req.body.amount || 0));
        const currency = req.body.currency || 'INR';
        if (!amount || amount < 1) {
            return res.status(400).json({ error: 'Valid amount is required' });
        }

        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            return res.json({
                success: true,
                mode: 'mock',
                keyId: 'rzp_test_configure_key',
                order: {
                    id: `order_dev_${crypto.randomBytes(8).toString('hex')}`,
                    amount: amount * 100,
                    currency,
                    receipt: `dev_${Date.now()}`
                }
            });
        }

        const response = await axios.post('https://api.razorpay.com/v1/orders', {
            amount: amount * 100,
            currency,
            receipt: `aevum_${Date.now()}`,
            notes: {
                userId: req.user.sub,
                bookingType: req.body.bookingType || 'travel'
            }
        }, {
            auth: {
                username: RAZORPAY_KEY_ID,
                password: RAZORPAY_KEY_SECRET
            },
            timeout: 20000
        });

        res.json({ success: true, mode: 'live', keyId: RAZORPAY_KEY_ID, order: response.data });
    } catch (error) {
        console.error('Create payment order error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Could not create payment order' });
    }
});

app.post('/api/payments/verify', requireAuth, (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, mode } = req.body;

    if (mode === 'mock') {
        return res.json({ success: true, bookingId: `AEV-${Date.now()}` });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !RAZORPAY_KEY_SECRET) {
        return res.status(400).json({ error: 'Payment verification details are missing' });
    }

    const expected = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (expected !== razorpay_signature) {
        return res.status(400).json({ error: 'Payment verification failed' });
    }

    res.json({ success: true, bookingId: `AEV-${Date.now()}` });
});

app.get('/api/search/flights', async (req, res) => {
    try {
        const { from, to, date } = req.query;

        if (!from || !to) {
            return res.status(400).json({ error: 'Origin and destination required' });
        }

        const flightDate = date || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
        const flights = await searchFlights(from, to, flightDate);

        res.json({
            success: true,
            count: flights.length,
            data: flights
        });
    } catch (error) {
        console.error('Flight search error:', error);
        res.status(error.status || 500).json({ error: error.message || 'Search failed' });
    }
});

app.get('/api/search/hotels', async (req, res) => {
    try {
        const { destination, checkIn, checkOut } = req.query;

        if (!destination) {
            return res.status(400).json({ error: 'Destination required' });
        }

        const checkinDate = checkIn || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
        const checkoutDate = checkOut || new Date(Date.now() + 9 * 86400000).toISOString().split('T')[0];

        const hotels = await searchHotels(destination, checkinDate, checkoutDate);

        res.json({
            success: true,
            count: hotels.length,
            data: hotels
        });
    } catch (error) {
        console.error('Hotel search error:', error);
        res.status(500).json({ error: 'Search failed' });
    }
});

app.get('/api/search/budget', async (req, res) => {
    try {
        const { destination, from, budget, passengers, checkIn, checkOut, date } = req.query;

        if (!destination || !from || !budget) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log(`\n💰 BUDGET SEARCH: ${from} → ${destination} (₹${budget})\n`);

        const budgetAmount = parseInt(budget);
        const passengerCount = parseInt(passengers) || 1;

        const [hotels, flights] = await Promise.all([
            searchHotels(destination, checkIn, checkOut),
            searchFlights(from, destination, date)
        ]);

        // Create combinations
        const combinations = [];
        for (const flight of flights) {
            for (const hotel of hotels) {
                const totalCost = (flight.price * passengerCount) + hotel.price;
                if (totalCost <= budgetAmount * 1.15) {
                    combinations.push({
                        flight,
                        hotel,
                        totalCost,
                        savings: budgetAmount - totalCost,
                        aiScore: 90 - Math.abs(budgetAmount - totalCost) / 100,
                        aiReason: flight.isDirect && hotel.rating > 4.5
                            ? 'Excellent: Direct flight + top-rated hotel'
                            : flight.isDirect
                                ? 'Great: Direct flight saves time'
                                : 'Best value within budget'
                    });
                }
            }
        }

        combinations.sort((a, b) => a.totalCost - b.totalCost);

        res.json({
            success: true,
            combinations: combinations.slice(0, 20),
            flights,
            hotels,
            budget: budgetAmount,
            withinBudget: combinations.filter(c => c.totalCost <= budgetAmount).length,
            aiPowered: true
        });

    } catch (error) {
        console.error('Budget search error:', error);
        res.status(error.status || 500).json({ error: error.message || 'Search failed' });
    }
});

app.get('/api/search/packages', async (req, res) => {
    const { destination } = req.query;

    const themes = ['Honeymoon', 'Family', 'Adventure', 'Beach'];
    const packages = themes.map((theme, i) => ({
        id: 1000 + i,
        name: `${theme} ${destination || 'Special'} Package`,
        destination: destination || 'Multiple Cities',
        duration: ['3N/4D', '4N/5D', '5N/6D'][i % 3],
        price: 25000 + (i * 10000) + Math.floor(Math.random() * 5000),
        rating: 4.5 + (Math.random() * 0.5),
        inclusions: ['Flights', 'Hotels', 'Breakfast', 'Transfers', 'Sightseeing'],
        image: `https://source.unsplash.com/800x600/?${theme.toLowerCase()},travel&sig=${i}`
    }));

    res.json({ success: true, data: packages });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'Running',
        scraping: 'Live flight prices require SERPAPI_KEY or a successful browser scrape; fake flight prices are disabled',
        features: [
            '✅ Google Flights via SerpApi when configured',
            '✅ Booking.com scraping',
            '✅ Anti-detection (Stealth mode)',
            '✅ Razorpay order creation and verification',
            '✅ Login-protected booking'
        ]
    });
});

// Cleanup
process.on('SIGTERM', async () => {
    if (browser) await browser.close();
    process.exit(0);
});

// Export for Vercel Serverless
export default app;
