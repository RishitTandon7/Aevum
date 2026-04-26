# 📊 SPRINT 1 OFFICIAL DOCUMENTS
## Automated Travel Booking Platform

*This file serves as the official project management documentation for Sprint 1, explicitly maintaining three strict Kanban buckets ("To Do", "In Progress", "Done"), tracking completed metrics, and publishing necessary Sprint Review/Retro reports to satisfy Audit requirements.*

---

## 1. SPRINT 1 PLANNING DOCUMENT
**Sprint Dates:** Week 1 
**Scrum Master:** [Your Name]
**Sprint Goal:** Initialize the fundamental frontend and backend repositories and ensure cross-communication is functioning correctly.

### Sprint 1 Kanban Board Status (End of Sprint Snapshot)
**Buckets utilized strictly limited to three standard Agile columns.**

#### 📋 TO DO Bucket
*(Empty at end of Sprint 1)*

#### ⏳ IN PROGRESS Bucket
*(Empty at end of Sprint 1)*

#### ✅ DONE Bucket (Completed Items)
*   [✓] **US-01:** Project Repository and Frontend Boilerplate (5 Points)
*   [✓] **US-02:** Backend API Foundation (5 Points)
*   [✓] **Task 1.1:** Initialize GitHub Repository with `main` and `dev`.
*   [✓] **Task 1.2:** Scaffold React Vite application.
*   [✓] **Task 1.3:** Setup Tailwind CSS framework.
*   [✓] **Task 2.1:** Initialize Express.js Server.
*   [✓] **Task 2.2:** Setup CORS middleware. 
*   [✓] **Task 2.3:** Establish Backend global error handling.

**Total Sprint 1 Velocity Achieved:** 10 / 10 Story Points Planned.

---

## 2. SPRINT 1 REVIEW DOCUMENT
**Date of Review:** End of Week 1
**Attendees:** Development Team, Product Owner

### Demonstration & Review Metrics:
- **Demonstrated Product:** The team successfully shared their screen and ran `npm run dev` and `npm start` simultaneously. 
- **Validation:** 
  - The Tailwind CSS base screen loaded smoothly at `localhost:5173`.
  - The backend successfully responded with a `{ status: "active" }` JSON packet when queried at `localhost:3001/api/health`.
- **Stakeholder Feedback:** The technical foundation works smoothly. No layout or coding standards violations were noticed by the technical lead.
- **Approval:** All 10 Story Points in the "Done" bucket were formally accepted by the Product Owner based on previously defined Acceptance Criteria.

---

## 3. SPRINT 1 RETROSPECTIVE DOCUMENT
**Date of Retrospective:** End of Week 1

### Retrospective Analysis (What went well, What didn't, Action Items)

**1. What went well?**
- Vite scaffolding was extremely fast and prevented any "Webpack compilation" bottlenecks we experienced in past projects.
- Maintaining only three strict Agile buckets (To Do -> In Progress -> Done) kept the board visually clean.

**2. What didn't go well?**
- Minor delay figuring out exactly which origin port to whitelist in the backend CORS setup (Vite defaults to `5173`, some team members expected `3000`).

**3. Action Items for Sprint 2:**
- Action 1: Hardcode all environment variables into a `.env` file instead of manually typing them.
- Action 2: Use Prettier auto-format-on-save extensions in VS Code across the whole team to prevent merge conflicts.
