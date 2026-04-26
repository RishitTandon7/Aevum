# 🔄 SPRINT EXECUTION: Step-by-Step Process & Story Points
## Automated Travel Booking Platform

This document outlines the detailed step-by-step execution process for all 10 sprints. Each step is evaluated using **Agile Fibonacci Story Points (1, 2, 3, 5, 8, 13)** to measure complexity, effort, and project velocity.

---

## 📅 SPRINT 1: Core Foundation & Architecture Setting
**Total Velocity:** 16 Points | **Focus:** Infrastructure & Boilerplate

### Step 1: Repository & Branching Setup
*   **Story Points:** 2
*   **Details:** Initialize Git repository. Establish strict `main` and `development` branch paradigms. Define Pull Request review templates.
### Step 2: React Frontend Initialization
*   **Story Points:** 5
*   **Details:** Scaffold the React 19 application utilizing Vite for rapid compilation. Install and correctly configure Tailwind CSS and Lucide React icons.
### Step 3: Node.js Backend Boilerplate
*   **Story Points:** 5
*   **Details:** Initialize Express.js API server. Install essential middleware (CORS, body-parser). Create default health-check endpoint (`GET /api/health`).
### Step 4: ESLint & Code Formatting
*   **Story Points:** 4
*   **Details:** Standardize the codebase by setting up ESLint config rules and Prettier to ensure formatting uniformity across the UI and Backend teams.

---

## 📅 SPRINT 2: UI/UX Component Library
**Total Velocity:** 21 Points | **Focus:** Reusable Visual Elements

### Step 1: Master Layout Construction
*   **Story Points:** 5
*   **Details:** Code the `MainLayout.jsx` wrapper. Build the global Responsive Navigation Bar and universal Footer that will persist across routes.
### Step 2: Global UI Input Components
*   **Story Points:** 8
*   **Details:** Develop a library of reusable "Glassmorphism" components: Date Pickers, stylized Input text fields, Passenger Selectors, and Primary gradient Buttons.
### Step 3: Application Routing Strategy
*   **Story Points:** 5
*   **Details:** Implement `react-router-dom`. Wire up the blank page structures for `/`, `/hotels`, `/flights`, and `/budget` routes securely.
### Step 4: Loading & Feedback States
*   **Story Points:** 3
*   **Details:** Build beautiful CSS-animated loading spinners and UI skeleton-loaders to use when waiting for search data.

---

## 📅 SPRINT 3: Base Search Inputs & Mock Logic
**Total Velocity:** 19 Points | **Focus:** User Input Handling

### Step 1: Hero Search Bar Integration
*   **Story Points:** 5
*   **Details:** Build the primary destination search bar on the Home page. Wire state hooks to capture user inputs for Dates and Locations dynamically.
### Step 2: Backend Mock Endpoints Creation
*   **Story Points:** 5
*   **Details:** Create `/api/search/hotels` and `/api/search/flights` JSON arrays containing highly realistic mock data to serve the frontend temporarily.
### Step 3: Frontend Fetch Implementation
*   **Story Points:** 4
*   **Details:** Write asynchronous `fetch()` handlers in React to pull data from backend mock points and map them accurately locally.
### Step 4: Result Card UI Development
*   **Story Points:** 5
*   **Details:** Design and generate the visually rich Display Cards for Hotels and Flights parsing the backend mock JSON arrays into clean UI grids.

---

## 📅 SPRINT 4: Advanced Budget Combinatorial Logic
**Total Velocity:** 26 Points | **Focus:** The Core Algorithm

### Step 1: Unified Budget Query Form
*   **Story Points:** 5
*   **Details:** Implement the single-tab form demanding strict Budget (INR), Dates, Origin, and Destination.
### Step 2: Nested Sorting Algorithm
*   **Story Points:** 13
*   **Details:** Write the heavy calculation mapping: Iterate through mapped Flights and Hotel lists. Compute: `(Flight Price * Travellers) + Hotel Rate`.
### Step 3: Array Filtration & Validation
*   **Story Points:** 5
*   **Details:** Drop any generated tuples where the combined mathematical sum strictly exceeds the user's maximum numerical budget.
### Step 4: Budget Savings Output UI
*   **Story Points:** 3
*   **Details:** Render a "Savings Calculator" showing the user exactly how far under budget the matched package sits.

---

## 📅 SPRINT 5: Live Scraping Engine (Hotels)
**Total Velocity:** 21 Points | **Focus:** Data Acquisition Phase 1

### Step 1: Puppeteer Headless Integration
*   **Story Points:** 8
*   **Details:** Embed Puppeteer Chromium scripts into the Node backend. Configure to spin up efficiently upon receiving a search context without memory leaks.
### Step 2: Target Booking.com Selectors
*   **Story Points:** 8
*   **Details:** Traverse Booking.com DOM structure. Program specific extractors for `.hotel-title`, `.review-score`, and `.price-display` elements cleanly.
### Step 3: Data Normalization
*   **Story Points:** 5
*   **Details:** Since varied websites return vastly different string formats (e.g., "$300", "₹3,200", "300 per night"), implement global Regex scrubbing to standardize numeric pricing safely.

---

## 📅 SPRINT 6: Live Scraping (Flights & Bypassing)
**Total Velocity:** 24 Points | **Focus:** Anti-bot & Evasion Architecture

### Step 1: Cloudflare & Captcha Evasion
*   **Story Points:** 8
*   **Details:** Install `puppeteer-extra-plugin-stealth` library. Evade bot fingerprints by randomizing the viewport boundaries and spoofing user-agent headers per request.
### Step 2: Target Flight DOM Targets
*   **Story Points:** 8
*   **Details:** Extract tricky, highly nested Google Flight DOM data. specifically targeting layover quantities ("Direct", "1-Stop"), duration, and airlines.
### Step 3: Direct Link Generation
*   **Story Points:** 8
*   **Details:** Program logic to generate the exact direct Deep Link URL parameters needed for the user to instantly book the scraped entity on the parent site.

---

## 📅 SPRINT 7: Smart Fallback Mechanism
**Total Velocity:** 21 Points | **Focus:** 100% Guaranteed Uptime

### Step 1: Error Trap Architecture
*   **Story Points:** 5
*   **Details:** Wrap Puppeteer executions in timed 15-second promises. If unresolved or explicitly blocked by HTTP 403, immediately abort the scraping route cleanly.
### Step 2: Statistical Mock Creation
*   **Story Points:** 8
*   **Details:** Develop `generateSmartFlights()`. Build baseline mathematical mapping defining historical estimates for standard route prices.
### Step 3: Seamless Fallback Switcher
*   **Story Points:** 8
*   **Details:** When an Error Trap is triggered, seamlessly inject the Statistical Mock data back through the exact same JSON pipeline so the UI never realizes a crash occurred.

---

## 📅 SPRINT 8: AI Analytics & Tuning
**Total Velocity:** 16 Points | **Focus:** Speed & Intelligence

### Step 1: LLM Prompt Tuning
*   **Story Points:** 5
*   **Details:** Integrate `GEMINI_API_KEY`. Pipe the top 3 parsed combinations through Gemini asking specifically for a 1-sentence analytical reason why the choice is strong.
### Step 2: Parallel Async Execution
*   **Story Points:** 8
*   **Details:** Refactor backend code natively to execute Hotel Puppeteer Engine and Flight Puppeteer Engine via `Promise.all()` to dramatically halve total loading phase time.
### Step 3: Backend Caching Structure
*   **Story Points:** 3
*   **Details:** Institute an in-memory caching mapping. If someone searches "Mumbai to Delhi" twice within 30 minutes, bypass scraping entirely and serve cache instantly.

---

## 📅 SPRINT 9: QA & End-to-End Stress Protocol
**Total Velocity:** 13 Points | **Focus:** Bug Fixes & UX Polish

### Step 1: Component Stress Testing
*   **Story Points:** 5
*   **Details:** Attempt actively impossible user journeys (e.g., Return date in the past, origin identical to destination). Ensure graceful UI Toast rejections.
### Step 2: Scraping Chaos Testing
*   **Story Points:** 5
*   **Details:** Intentionally disable server outgoing network access to force the application to lean entirely on the Smart Fallback system. Validate output continuity.
### Step 3: Responsive Refinement
*   **Story Points:** 3
*   **Details:** Scrutinize the view on specific viewports (iPhone SE, iPad Air, 4K Monitor). Fix shifting paddings and overlapping text bugs.

---

## 📅 SPRINT 10: Production Launch
**Total Velocity:** 16 Points | **Focus:** CI/CD & Delivery

### Step 1: Environmental Variable Securing
*   **Story Points:** 3
*   **Details:** Verify all `.env` files are ignored in Git commits. Transition local development variables to production environment configurations.
### Step 2: Vercel Frontend Deployment
*   **Story Points:** 5
*   **Details:** Connect Git repository to Vercel/Netlify. Configure CI/CD automated build pipelines. Resolve any strict compilation warnings preventing builds.
### Step 3: Backend Containerization & Deploy
*   **Story Points:** 5
*   **Details:** Host Node API Server. Because Puppeteer requires a massive Chromium binary, ensure the hosting environment installs the necessary Linux `lib` dependencies securely.
### Step 4: Final Analytics & Project Documentation
*   **Story Points:** 3
*   **Details:** Finalize Readmes, inject Google Analytics tracker script, and officially release the software version 1.0.0. 
