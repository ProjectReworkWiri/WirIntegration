Zenith
======

Zenith is an educational platform designed to reward users for learning new
skills. Whether you want to master a programming language, art, or music,
Zenith makes education both motivating and accessible.

As a Gamified LMS (Learning Management System), Zenith integrates features like
daily streaks and interactive mini-games. The goal is to make the learning
journey easier, more engaging, and, above all, fun.

Objectives
----------
- Break the status quo: show that traditional education lacks engagement.
- Proof of concept: complex subjects can be learned through gamification.
- Build persistence: reward consistency and discipline, not just completion.
- Accessible mastery: make high-quality knowledge enjoyable and reachable.

Key Features
------------
- Dynamic course management: users create, manage, and enroll in courses.
- Hybrid architecture (MPA + SPA): multi-page navigation with SPA-like UX.
- Engagement-driven gamification:
  - Daily streaks to build learning habits.
  - Interactive mini-games to keep learning fun.

Technologies
------------
- Frontend: HTML5, CSS3, Tailwind (CDN), Bootstrap Icons.
- Backend: Node.js, Express, PostgreSQL (`pg`), Passport (Google OAuth),
  express-session, bcrypt.

Architecture
------------
Frontend Stack:
- HTML5 for semantic structure and navigation.
- CSS3 + custom styles for the Zenith look and feel.
- Tailwind CDN utility classes and Bootstrap Icons for UI components.

Backend Stack:
- Node.js + Express for the REST API.
- PostgreSQL via `pg` for persistence.
- Passport (Google OAuth) and sessions for authentication.
- bcrypt for password hashing.

Project Structure
-----------------
- `frontend/`: static pages, styles, and scripts.
- `backend/`: Express server, routes, controllers, and services.
- `.env.template`: environment variable reference.

Folders
-------
- `.vscode/`: editor settings for VS Code/Cursor.
- `backend/`: API, authentication, database, and server logic.
- `docs/`: documentation assets and reference materials.
- `frontend/`: HTML pages, CSS, JS, and static assets.
- `node_modules/`: installed dependencies (auto-generated).

How to Run the Project
----------------------
1) Install dependencies:
   - `npm install`

2) Create `.env` from the template and fill:
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PWD`, `DB_SCHEMA`
   - `APP_PORT` (default 4000)
   - `SESSION_SECRET`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` (optional)

3) Start the backend:
   - `npm start`

4) Serve the frontend with a static server (Live Server):
   - Open:
     - `http://127.0.0.1:5500/WirIntegration/frontend/templates/auth/index.html`
     - `http://127.0.0.1:5500/WirIntegration/frontend/templates/dashboard/dashboard.html`

API Overview
------------
Base URL: `http://127.0.0.1:4000`

- Auth:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/logout`
- User:
  - `GET /api/user/profile`
  - `PUT /api/user/profileput`
- Courses:
  - `GET /api/courses/categories`
  - `GET /api/courses/games`
  - `GET /api/courses/public`
  - `GET /api/courses/`
  - `POST /api/courses/`
  - `PUT /api/courses/:id`
  - `DELETE /api/courses/:id`
  - `POST /api/courses/games`
  - `POST /api/courses/join`
- Streak:
  - `GET /api/streak/status`
  - `PUT /api/streak/update-manual`
- Google OAuth:
  - `GET /auth/google`
  - `GET /auth/google/callback`

Notes
-----
- Google OAuth is optional. If `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` is
  missing, the server starts without Google auth.
- Frontend routes are static files; make sure your static server uses the
  `WirIntegration` base path when opening pages locally.
