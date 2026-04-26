# 📖 COMPREHENSIVE AGILE USER STORIES
## Automated Travel Booking Platform (10 Sprints)

This formally structured Agile backlog breaks down the work into standard user stories:
**"As a [Role], I want to [Action] so that [Benefit / Value]."** 
Every epic is divided into detailed User Stories along with formal **Acceptance Criteria** for Sprint validations.

---

## 📅 SPRINT 1: Core Foundation & Architecture Setting

### **US-1.1: Frontend Framework Initialization**
**As a** Frontend Lead, **I want to** scaffold the React 19 application via Vite and install Tailwind CSS, **so that** developers have a high-performance, standardized environment to begin building the UI.
* **Acceptance Criteria:**
  - Application compiles without errors (`npm run dev`).
  - Tailwind configurations (`tailwind.config.js`) successfully parse global styles.
  - Code linting (ESLint) and Prettier are configured.

### **US-1.2: Backend Server & Express Setup**
**As a** Backend Engineer, **I want to** initialize the Node.js API server, **so that** the frontend can securely retrieve data endpoints (via port 3001).
* **Acceptance Criteria:**
  - Server successfully boots on port 3001 using `npm start`.
  - CORS configurations are in place allowing requests from `localhost:5173`.
  - Global error handling middleware returns a structured JSON error response.

### **US-1.3: Repository & Git Workflow Setup**
**As a** the Project Manager, **I want to** set up the Git repository with Branch protection, **so that** the team follows professional parallel development processes.
* **Acceptance Criteria:**
  - `master` and `development` branches are created.
  - Pull Request templates are established.

---

## 📅 SPRINT 2: UI/UX Component Library & Main Interfaces

### **US-2.1: Master Layout & Navigation Setup**
**As a** User, **I want to** see a clear, responsive navigation bar and a standard footer everywhere on the site, **so that** I can seamlessly switch between Budget Search, Hotels, and Flight tabs.
* **Acceptance Criteria:**
  - `MainLayout.jsx` wrapper contains the interactive Navbar.
  - Hamburger menu opens seamlessly on mobile screens.

### **US-2.2: Universal Input Components**
**As a** Designer, **I want to** establish a reusable library of Glassmorphism style input fields, date pickers, and primary buttons, **so that** visual consistency is maintained without redundant coding.
* **Acceptance Criteria:**
  - A stylized Date Picker works across all Browsers.
  - Dropdown component for Passenger Count manages state successfully.

---

## 📅 SPRINT 3: Base Search Inputs & Mock Functionality

### **US-3.1: Home Page Dynamic Search Input**
**As a** Traveler, **I want to** be able to immediately search for destinations directly from an attractive Home layout, **so that** I don't waste time looking for where to start.
* **Acceptance Criteria:**
  - Search input updates React component state.
  - Submitting redirects to contextual results matching the input.

### **US-3.2: Mock API Integration for Search Endpoints**
**As a** Frontend Developer, **I want to** connect my UI components to mock JSON backend endpoints for Hotel/Flight fetching, **so that** I can test the loading spinners and card layouts before real scraping is ready.
* **Acceptance Criteria:**
  - Calling `/api/search/hotels` returns hardcoded dummy JSON within 1 second.
  - The frontend maps this data into visually appealing Hotel Cards.

---

## 📅 SPRINT 4: Advanced Budget Search & Combinatorial Logic

### **US-4.1: Single Tab Budget Configuration**
**As a** Budget-conscious User, **I want to** type in my origin, destination, and STRICT budget into one form, **so that** I don't have to manually calculate hotel and flight prices manually.
* **Acceptance Criteria:**
  - Form requires Origin, Destination, Budget (INR), Dates, and Passenger amount.
  - Validates that Origin and Destination are not the same field.

### **US-4.2: Matching Algorithm Execution**
**As a** Backend Processor, **I want to** loop through thousands of mock flight & hotel matches, multiplying flight rates by passenger counts, **so that** I only return combinations whose `<Total Cost>` is less than the user's budget.
* **Acceptance Criteria:**
  - Combinations strictly prove: `(Flight*Pax) + HotelPrice <= User Budget`.
  - Returned array is sorted lowest-price first.

---

## 📅 SPRINT 5: Live Scraping Engine - Hotel Modules 

### **US-5.1: Puppeteer Engine Bootstrap**
**As a** Data Engineer, **I want to** install and bootstrap headless chromium via Puppeteer in the backend, **so that** the server can stealthily navigate commercial websites on the fly.
* **Acceptance Criteria:**
  - Puppeteer launches successfully via API trigger without crashing the Express server.

### **US-5.2: Booking.com DOM Targeting & Extraction**
**As a** Web Scraper, **I want to** target CSS selectors on Booking.com for Hotel Name, Review Rating, and Price, **so that** we convert their raw HTML into our structured JSON response map.
* **Acceptance Criteria:**
  - API call takes >5s to allow for browser spin-up and network delay.
  - Parses real-time pricing corresponding to the live website rate for the given dates.

---

## 📅 SPRINT 6: Live Scraping - Flight Targets & Bot Evasion

### **US-6.1: Active Bot Evasion (Stealth Mode)**
**As a** System Admin, **I want to** implement `puppeteer-extra-plugin-stealth` and viewport randomization, **so that** target sites (e.g., Google/Yatra) do not detect headless chrome and block our platform IP.
* **Acceptance Criteria:**
  - Scraping script passes standard navigator tests (`webdriver: false`).
  - Successfully evades initial Cloudflare or Captcha traps 80% of the time.

### **US-6.2: Flight Layovers & Stops Logic Detection**
**As a** User, **I want to** know if the extracted flight requires layovers or is "Direct", **so that** I know exactly what I am paying for.
* **Acceptance Criteria:**
  - Scraper extracts specific "time duration" and "layover points".
  - Frontend prominently tags the trip "Direct" (green) or "1-Stop" (yellow) with transit cities.

---

## 📅 SPRINT 7: The Smart Fallback System (Zero Failure Mode)

### **US-7.1: Pre-Calculated Route Modeling**
**As a** Platform Administrator, **I want to** store rough algorithmic averages for flights (e.g., Delhi-Mumbai ~ ₹5000) inside the Node server, **so that** the platform still works even if all target scraping sources are actively blocking us.
* **Acceptance Criteria:**
  - Internal hashmap holds base weights for 20 popular origin-destination pairings.

### **US-7.2: Automatic Fallback Trigger**
**As a** User, **I want to** be entirely unaware of any software failures, **so that** if data fetching officially times out (>15 seconds), the engine instantly switches to historical estimated prices and serves them as normal.
* **Acceptance Criteria:**
  - Engine wraps `scrapeGoogleFlights()` in a timed Promise.
  - On catch error/timeout -> calls `generateSmartFlights()` internally and returns the fallback JSON object cleanly.

---

## 📅 SPRINT 8: AI Processing & Recommendation Tuning

### **US-8.1: Gemini AI Recommendations**
**As a** User, **I want to** see an AI explanation of why a package is recommended (e.g., "AI Note: Best balance of luxury and flight timing"), **so that** I feel confidence in the booking suggestion.
* **Acceptance Criteria:**
  - `GEMINI_API_KEY` environment setup.
  - Server hands the top 3 combinations to LLM prompt.
  - Output is merged back into JSON payload and rendered as an AI "Sparkle" card on frontend.

### **US-8.2: Concurrent Performance Execution**
**As a** User, **I want** the search to finish as fast as possible, **so that** I don't abandon the loading page.
* **Acceptance Criteria:**
  - Implement `Promise.all()` to run Hotel scraper and Flight scraper simultaneously instead of waiting sequentially.

---

## 📅 SPRINT 9: Stress Testing, QA & Refinement

### **US-9.1: Edge Case Date Validations**
**As a** QA Tester, **I want to** try booking a return flight *before* my departure flight, **so that** I can verify the frontend forms block invalid time logic properly.
* **Acceptance Criteria:**
  - Check-in date disables all preceding calendar days.
  - Invalid submissions trigger inline UI standard toast warnings instead of breaking API.

### **US-9.2: Mobile Responsiveness Sweep**
**As a** Mobile User, **I want to** easily navigate the hotel combinations list, **so that** I can book trips on my phone.
* **Acceptance Criteria:**
  - Ensure combination cards stack vertically (`flex-col`) on narrow viewports (`md:`, `sm:` breakpoints in Tailwind).

---

## 📅 SPRINT 10: Production Operations (CI/CD & Launch)

### **US-10.1: CI/CD Frontend Deployment (Vercel)**
**As a** Lead Developer, **I want to** deploy the React application via automated Git pushing to Vercel, **so that** users have a public URL to access the tool.
* **Acceptance Criteria:**
  - Environment variables (API paths) are mapped to production endpoints.

### **US-10.2: Backend Hosting & PM2 Setup**
**As a** Systems Engineer, **I want to** host the backend via Render or an AWS Linux container, ensuring Chromium executes properly within Docker or Linux.
* **Acceptance Criteria:**
  - PM2 handles node auto-restarts upon memory crashes.
  - Server maintains 99.9% uptime.
