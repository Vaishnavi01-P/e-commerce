# E-commerce Mini App

A small full-stack e-commerce app. Users can browse products, view details, and manage a shopping cart persisted to localStorage.

## Tech Stack
- Client: React (Vite), React Router v6, Context + useReducer, Tailwind CSS (JavaScript + JSX)
- Server: Node.js, Express, MongoDB (Mongoose)
- Testing: Jest + React Testing Library (client), Jest + Supertest (server)
- Lint/Format: ESLint + Prettier
- Docs: OpenAPI (YAML), architecture with Mermaid, Postman collection

## Monorepo Layout
- `/client` — React app (Vite)
- `/server` — Express API with MongoDB
- `/docs` — Architecture, OpenAPI spec, prompts, Postman collection

## Prerequisites
- Node 18+
- MongoDB Atlas connection string (MONGODB_URI)

## Quick Start

### 1) Server
```bash
cd server
npm install
# Set environment variables in .env
# MONGODB_URI=<your_atlas_uri>
# PORT=4000
npm run seed
npm run dev
```
Server runs on http://localhost:4000

### 2) Client
```bash
cd client
npm install
# Set environment variables in .env
# VITE_API_BASE_URL=http://localhost:4000
# VITE_CURRENCY=USD
npm run dev
```
Client runs on http://localhost:5173

## Scripts
- Client: `dev`, `build`, `preview`, `test`, `lint`, `format`
- Server: `dev`, `start`, `seed`, `test`, `lint`, `format`

## Seeding
Runs an idempotent seed inserting ~20 products across categories.
```bash
cd server
npm run seed
```

## Testing
- Client
```bash
cd client
npm test
```
- Server
```bash
cd server
npm test
```

## Deployment
- Backend: Render/Railway. Set `MONGODB_URI` and `PORT`. CORS allow client origin.
- Frontend: Vercel/Netlify. Set `VITE_API_BASE_URL` to deployed API URL.

See `/docs/architecture.md` and `/docs/openapi.yaml` for detailed design and API.
