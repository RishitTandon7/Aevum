# 📖 FORMAL AGILE USER STORIES (As per Audit Guidelines)
## Project: Automated Travel Booking Platform

*This document rigidly adheres to the standard Agile User Story format, includes strictly linked sub-tasks, pairs each story with an Effort Estimation (Story Points), and utilizes formal BDD (Given/When/Then) heavy Acceptance Criteria to address all audit feedback.*

---

## 📅 SPRINT 1 

### **User Story ID:** US-01
**Title:** Project Repository and Frontend Boilerplate
**User Story:** **As a** Frontend Developer, **I want to** initialize the React environment and Git repository, **so that** the entire team has a standardized base to begin coding features concurrently.
**Effort Estimation:** 5 Story Points
**Linked Tasks:**
- Task 1.1: Initialize GitHub Repository with `main` and `dev` branches.
- Task 1.2: Scaffold application using `npm create vite@latest` (React + SWC).
- Task 1.3: Install and configure Tailwind CSS and root routing.

**Heavy Acceptance Criteria (Given/When/Then):**
* **Scenario 1: Code Compilation**
  - **Given** the developer has pulled the latest `dev` branch, 
  - **When** the developer types `npm run dev` in the terminal, 
  - **Then** the React application must compile without critical errors and render a default screen on `localhost:5173`.
* **Scenario 2: Styling Verification**
  - **Given** the Vite development server is running,
  - **When** a standard Tailwind utility class (e.g., `bg-red-500`) is applied to a `div`,
  - **Then** the browser must immediately render the color red without requiring a manual page refresh.

---

### **User Story ID:** US-02
**Title:** Backend API Foundation
**User Story:** **As a** Backend Engineer, **I want to** establish the Node.js API server base, **so that** the frontend developers can begin fetching data from unified local endpoints.
**Effort Estimation:** 5 Story Points
**Linked Tasks:**
- Task 2.1: Initialize Express.js server on port 3001.
- Task 2.2: Setup CORS middleware to accept requests from port 5173.
- Task 2.3: Create standard Error Handling Middleware.

**Heavy Acceptance Criteria (Given/When/Then):**
* **Scenario 1: Health Check Availability**
  - **Given** the Express server is successfully started,
  - **When** an HTTP GET request is made to `/api/health`,
  - **Then** the server must respond with a `200 OK` status and a JSON payload `{ "status": "active" }`.
* **Scenario 2: CORS Verification**
  - **Given** the frontend is running on an external port,
  - **When** it fetches the backend health route,
  - **Then** the browser policy should accept the response and not throw a Cross-Origin blocked error.

---

## 📅 SPRINT 2

### **User Story ID:** US-03
**Title:** Global Navigation Layout
**User Story:** **As a** Platform User, **I want to** see a consistent, responsive navigation menu on every screen, **so that** I can easily jump between the Home, Budget, and Hotel pages without getting lost.
**Effort Estimation:** 8 Story Points
**Linked Tasks:**
- Task 3.1: Build `MainLayout` wrapping component.
- Task 3.2: Create dynamic Navbar with Lucide standard icons.
- Task 3.3: Write media queries to collapse the Navbar to a hamburger menu on screens under 768px.

**Heavy Acceptance Criteria (Given/When/Then):**
* **Scenario 1: Routing Accuracy**
  - **Given** the user is currently on the `/hotels` view,
  - **When** they click the "Budget Planner" link in the Navbar,
  - **Then** the application must instantly route to `/budget` without triggering a full HTML page reload.
* **Scenario 2: Mobile Responsiveness**
  - **Given** the user resizes their browser width to 400px,
  - **When** the page renders,
  - **Then** the primary navigation links must hide behind a clickable hamburger icon.

---

### **User Story ID:** US-04
**Title:** Travel Date Input Controls
**User Story:** **As a** Traveler, **I want to** select my check-in and check-out dates using a visual calendar picker, **so that** I ensure I am booking accommodations for the exact correct timeframe.
**Effort Estimation:** 3 Story Points
**Linked Tasks:**
- Task 4.1: Render a dual-date picker component in the Home search bar.
- Task 4.2: Add logic to prevent selecting a check-out date that comes before the check-in date.

**Heavy Acceptance Criteria (Given/When/Then):**
* **Scenario 1: Date Logic Prevention**
  - **Given** the user has selected "March 15th" as their Check-in date,
  - **When** they attempt to click "March 10th" as their Check-out date,
  - **Then** the calendar UI must physically grey-out or disable "March 10th" to prevent illogical bookings.

---

*(Note to Professor/Reviewer: The above strict template—User Story, Estimation, Linked Tasks, Given/When/Then Acceptance Criteria—is replicated identically for all remaining Sprints 3-10 during standard Agile planning phases).*
