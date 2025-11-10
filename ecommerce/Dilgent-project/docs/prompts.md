# Master Prompt

1.  Act as prompt engineer and generate me a full detailed prompt to generate this web  application that prompt must have all the necessary things in that prompt and the information is: 

Task:

Create an E-Commerce Website that enables users to explore products, view product details, and manage a shopping cart.

The site should have a clean and responsive Ul, a lightweight backend to handle data operations, and basic state management for cart functionality.

Artifacts to Deliver:

1. Technical architecture documentation

2. Code base

3. Prompts used for generating tech documentation and code base

Recommendations on the Tech stack:

Frontend:

React.js

React Router for navigation

Backend:

Node.js with Express.js

Database:

MongoDB Atlas

Role: You are a senior full-stack engineer. Generate a complete, working project that meets the requirements below. Produce clean, documented code and the requested artifacts.

0) Project Summary

Build a small e-commerce web app where users can:

Explore products (grid + filtering/sorting + pagination)

View product details (images, description, price, stock, rating)

Add/remove/update quantities in a shopping cart

Persist cart in browser (localStorage) and keep it in basic app state

No authentication, checkout, or payments (out of scope)

1) Tech Stack (fixed)

Frontend: React.js (Vite or CRA), React Router v6+

State management: React Context + useReducer for cart; also use localStorage persistence

Styling/UI: Responsive, modern; prefer Tailwind CSS (or CSS Modules if you must)

Backend: Node.js + Express.js (lightweight REST API)

Database: MongoDB Atlas (Mongoose ODM)

Tooling: TypeScript preferred (both client & server). If JS is used, keep strict typing via JSDoc.

Testing:

Frontend: Jest + React Testing Library

Backend: Jest + Supertest

Docs: Markdown + OpenAPI (YAML), plus a mermaid diagram

Lint/Format: ESLint + Prettier

Dev scripts: dev, build, start, test, lint, seed, format

2) Repository Layout

Create a single repo with this structure:

/client
  /src
    /components
    /pages
    /routes
    /context
    /hooks
    /utils
    /assets
  index.html
  vite.config.(ts|js)
/server
  /src
    /config
    /models
    /routes
    /controllers
    /middleware
    /utils
    /tests
  /seed
/docs
  architecture.md
  openapi.yaml
  prompts.md
  postman_collection.json
README.md

3) Frontend Requirements

Pages & routes (React Router v6+):

/ → Home (hero, featured products)

/products → Product Catalog with:

Grid/list of products (name, image, price, rating, badge if low stock)

Client-side search (by name), filter (by category), sort (price asc/desc, rating), pagination

/products/:id → Product Details with gallery, description, price, stock, “Add to Cart”, qty selector

/cart → Shopping Cart page: list items, change qty, remove item, totals

* → NotFound

Core components:

Navbar (logo, nav links, cart icon with item count badge), Footer

ProductCard, ProductGrid, FiltersBar, SortControl, Pagination

QuantitySelector, PriceTag, RatingStars, EmptyState, Loader, Toast

State & cart behavior:

CartContext + cartReducer with actions: ADD_ITEM, REMOVE_ITEM, CHANGE_QTY, CLEAR_CART

Persist cart to localStorage; hydrate on app start

Derived totals (subtotal, item count)

API access:

Use a small apiClient.ts wrapper (fetch/axios) with baseURL from env (e.g., VITE_API_BASE_URL)

Graceful loading & error states; basic toasts on add/remove

Styling:

Mobile-first responsive layout

Accessible components (aria labels, keyboard focus states, alt text on images)

4) Backend Requirements

API routes (prefix /api):

GET /api/health → {status:"ok"}

GET /api/products → List products with query params:

q (search by name), category, sort in {price_asc,price_desc,rating_desc}, page, limit

GET /api/products/:id → Single product by id

Controllers:

ProductsController: list with filters/sort/pagination; byId

Middleware:

Error handler (JSON shape: {message, code?}), 404 handler, CORS, request logging (morgan)

Model (Mongoose):

Product:

_id (ObjectId), name (string, required)

description (string)

price (number, required)

images (string[]), at least one URL

category (string, index)

rating (number, 0–5, default 0)

stock (number, default 0)

createdAt, updatedAt (timestamps)

Seed script (npm run seed):

Insert ~20 sample products across 3–5 categories with realistic data & image URLs (royalty-free placeholders)

Idempotent (clears then inserts)

Env & config:

.env for:

MONGODB_URI (Atlas)

PORT (server)

Respect env in production

CORS: allow client origin

5) Documentation & Developer Experience

/docs/architecture.md

Overview, scope, and non-goals (no auth/checkout)

Tech choices & rationale

High-level component diagram (mermaid)

Request flow (client → API → DB) sequence diagram (mermaid)

Data model

Pagination/filtering strategy

State management (Context + Reducer + localStorage)

Error handling strategy

Performance notes (HTTP caching headers on /products, pagination defaults)

/docs/openapi.yaml

OpenAPI 3.1 spec for all routes, parameters, responses, and schemas

/docs/prompts.md

Log this master prompt verbatim

Add any follow-up prompts you (the AI) used while generating code

/docs/postman_collection.json

Ready to import; includes example requests for each endpoint

README.md

Quick start (client & server)

Env setup (client: VITE_API_BASE_URL, server: MONGODB_URI, PORT)

Scripts list

Seeding instructions

Testing instructions

Deployment guide (see below)

6) Acceptance Criteria (must pass)

Can run client & server locally with npm i && npm run dev (each workspace) and see products

Catalog supports search, filter, sort, pagination (reflected via query params)

Product details page loads directly via URL and shows selected product

Cart persists across refresh; add/update/remove works; totals correct

API validates queries; returns proper pagination metadata: {items, page, limit, total, totalPages}

Lighthouse mobile Performance ≥ 85, Accessibility ≥ 90 (typical laptop baseline)

Unit tests:

Frontend: at least tests for cartReducer and rendering ProductCard

Backend: tests for GET /api/products and GET /api/products/:id

Lint passes; type checks pass

7) Deployment Notes

MongoDB Atlas: include instructions for creating cluster and obtaining MONGODB_URI

Backend: provide Render.com deployment steps (or Railway), with PORT binding and MONGODB_URI

Frontend: provide Vercel/Netlify steps; set VITE_API_BASE_URL to deployed API URL

Configure production build scripts and CORS for deployed origins

8) Sample Data & UX Details

Provide 20+ products across e.g., “Electronics”, “Books”, “Home & Kitchen”, “Fashion”

Use realistic prices and ratings; ensure stock variety (including low stock)

Show “Only X left!” badge if stock <= 5

Currency: expose helper to format currency; default to USD but allow env override (VITE_CURRENCY=USD)

9) Quality Bar

Code must be modular, commented, and easy to extend (e.g., future auth/checkout)

Avoid over-engineering; prefer simple, explicit logic

Commit messages meaningful; include a minimal .gitignore

10) What to Output

A brief overview of what you generated.

The complete repository as code blocks or a downloadable tree (client + server).

docs/architecture.md, docs/openapi.yaml, docs/prompts.md, docs/postman_collection.json, and README.md.

Clear local run instructions and seed steps.

Generate now. If any assumption is needed, make the simplest sensible choice and proceed without asking questions.
