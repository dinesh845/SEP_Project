# EcoLearn Hub — Quickstart

This repository contains a simple Express + MongoDB backend and a static frontend (HTML/CSS/JS).

This README explains how to run the project locally on Windows (PowerShell). The backend now serves the frontend files at the root URL.

## Prerequisites

- Node.js (v16+ recommended)
- npm (bundled with Node.js)
- MongoDB running locally or a MongoDB connection string (MongoDB Atlas is fine)
- PowerShell (Windows) — the commands below are tailored for PowerShell

## Environment

The backend reads environment variables from `backend/.env`. Important variables:

- `PORT` — port the server listens on (default `5000`).
- `MONGO_URI` — MongoDB connection string (example: `mongodb://localhost:27017/ecolearnhub`).

## Install and run (PowerShell)

Open PowerShell and run the following commands.

1) Install backend dependencies (only required once):

```powershell
cd "C:\Users\aakas\Downloads\EcoLearnHub\EcoLearnHub\backend"
npm.cmd install
```

Note: On some Windows systems PowerShell may block `npm` wrapper scripts. Using `npm.cmd` avoids that issue.

2) Start the server (serves API and frontend):

```powershell
npm.cmd start
```

3) Development mode (auto-restarts on change):

```powershell
npm.cmd run dev
```

4) Open the app in your browser:

- Frontend: `http://localhost:5000/` (the backend serves the `frontend/` folder)
- API: `http://localhost:5000/api/users`

## Serve frontend separately (optional)

If you prefer to serve the static frontend with a simple static server instead of via the backend, you can use `http-server`:

```powershell
# from the repository root
npx http-server .\frontend -p 3000
# then open http://localhost:3000/index.html
```

## Troubleshooting

- "`npm.ps1 cannot be loaded`" (PowerShell execution policy): use `npm.cmd install` and `npm.cmd start` as shown above.
- "Cannot connect to MongoDB": make sure a MongoDB server is running and that `MONGO_URI` in `backend/.env` is correct. For local development, install MongoDB or use Atlas and update `MONGO_URI`.
- "Port 5000 already in use": change `PORT` in `backend/.env` or set the environment variable before starting the server:

```powershell
#$env:PORT = 4000; npm.cmd start
```

## What changed
- The backend (`backend/server.js`) serves the `frontend/` folder as static files and returns `index.html` for non-API routes so the site is available at the backend root.

## Next steps (optional)

- Add a `/health` endpoint for monitoring.
- Dockerize the app with a MongoDB container for an easier local environment.
- Add a small CI job to run tests/linting.

If you'd like, I can add any of the optional items above (README improvements, health endpoint, Docker setup).

---

Happy hacking!
