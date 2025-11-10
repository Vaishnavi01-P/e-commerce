# Architecture Overview

- Scope: browse, details, cart persisted in localStorage. No auth/checkout.
- Tech: React + Vite + Tailwind; Express + MongoDB (Mongoose).

## Component Diagram
```mermaid
flowchart TD
  subgraph Client
    R[Routes]
    H[Home]
    P[Products]
    D[ProductDetails]
    C[Cart]
    Ctx[Cart Context + Reducer]
  end

  subgraph Server
    API[Express API]
    Ctrl[Products Controller]
    Mdl[Error/CORS/Logger]
    Model[(Product Model)]
  end

  R --> H
  R --> P
  R --> D
  R --> C
  C --> Ctx

  H -->|GET /api/products| API
  P -->|GET /api/products| API
  D -->|GET /api/products/:id| API
  API --> Mdl --> Ctrl --> Model
  Model -->|MongoDB| DB[(MongoDB Atlas)]
```

## Sequence: Request Flow
```mermaid
sequenceDiagram
  participant UI as Client (React)
  participant API as Express API
  participant DB as MongoDB

  UI->>API: GET /api/products?q=&category=&sort=&page=&limit=
  API->>DB: find(filter).sort().skip().limit()
  DB-->>API: items + count
  API-->>UI: { items, page, limit, total, totalPages }
```

## Data Model
- Product: _id, name, description, price, images[], category, rating, stock, createdAt, updatedAt

## Pagination/Filtering
- Query params: q (name regex), category, sort in {price_asc, price_desc, rating_desc}, page, limit
- Defaults: page=1, limit=12; max limit=50

## State Management
- CartContext + useReducer. Persisted to localStorage. Derived subtotal and item count.

## Error Handling
- JSON: { message, code? }. 404 + error handlers.

## Performance
- Cache-Control: /products responses cached 60s. Pagination for scalable lists.
