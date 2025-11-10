# E-commerce Mini App

A small full-stack e-commerce web app.

- Frontend: React (Vite + TS), React Router, Tailwind, Context + useReducer
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose)
- Tests: Jest (client + server), RTL (client), Supertest (server)

## Quick Start

1. Prereqs: Node 18+, npm, MongoDB Atlas URI
2. Clone and install

```bash
# client
cd client
npm i
npm run dev

# server
cd server
npm i
npm run seed
npm run dev
```

### Environment
- client: set `VITE_API_BASE_URL` to your server URL (e.g. http://localhost:4000)
- server: set `MONGODB_URI` and `PORT` in `.env`

### Scripts (client & server)
- dev, build, start, test, lint, seed (server), format

Deployment guides and full docs are in `/docs`.
