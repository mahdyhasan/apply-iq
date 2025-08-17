# ApplyIQ Documentation

This docs set covers public APIs, functions, and components across the project.

- Frontend (React + Vite)
  - Components: `docs/frontend/components.md`
  - Hooks: `docs/frontend/hooks.md`
  - Libraries/Utils: `docs/frontend/lib.md`
- Backends
  - Python FastAPI: `docs/backend/python-api.md`
  - Node/Express API: `docs/backend/node-api.md`
- Shared Types: `docs/shared/types.md`

## Environments

- Frontend dev server: `http://localhost:5173`
- Python API (FastAPI): `http://localhost:8000`
- Node API (Express): `http://localhost:5000`

Set `VITE_API_URL` in the frontend environment to point to the backend you want to use.

## Auth overview

- FastAPI:
  - Login at `POST /api/auth/login` to receive `access_token`
  - Pass `Authorization: Bearer <token>` to all protected endpoints
- Express API:
  - Endpoints under `/api/*` typically require `Authorization: Bearer <token>` as documented per route

## Quickstart: FastAPI

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r backend/requirements.txt
python backend/start.py
```

## Quickstart: Express API

```bash
cd backend-api
npm install
node server.js
```

## Quickstart: Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.