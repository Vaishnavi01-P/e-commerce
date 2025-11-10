# Architecture

## Overview
A minimal e-commerce app: browse products, view details, and manage a cart persisted in localStorage. No auth or checkout.

## Scope & Non-goals
- Browse products, view details, manage cart
- No authentication, checkout, or payments

## Tech Choices & Rationale
- React + Vite + TypeScript for fast DX and type safety
- Tailwind CSS for rapid, consistent styling
- React Router v6 for routing
- Context + useReducer for simple, explicit cart state
- Express + Mongoose for straightforward REST API and MongoDB ODM

## High-level Component Diagram
```mermaid
flowchart TD
  subgraph Client
    A[Navbar]
    B[Routes]
    C[Home]
    D[Products]
    E[Product Details]
    F[Cart]
    G[CartContext + Reducer]
    H[apiClient]
  end
  subgraph Server
    I[Express App]
    J[Products Controller]
    K[Products Routes]
    L[Error/Middleware]
    M[(MongoDB via Mongoose)]
  end
  A --> B
  B --> C
  B --> D
  B --> E
  B --> F
  G --- B
  H --> I
  I --> K --> J --> M
  I --> L
```

## Request Flow (Client → API → DB)
```mermaid
sequenceDiagram
  participant UI as Client (React)
  participant API as Server (Express)
  participant DB as MongoDB
  UI->>API: GET /api/products?q=&category=&sort=&page=&limit=
  API->>DB: Query with filters + sort + pagination
  DB-->>API: Items + total count
  API-->>UI: {items, page, limit, total, totalPages}
```

## Data Model
- Product: name, description, price, images[], category, rating (0–5), stock, timestamps

## Pagination & Filtering
- Query params: q, category, sort(price_asc|price_desc|rating_desc), page, limit
- Defaults: page=1, limit=12; include `Cache-Control` on list responses

## State Management
- CartContext + useReducer with actions: ADD_ITEM, REMOVE_ITEM, CHANGE_QTY, CLEAR_CART
- Persist to localStorage and hydrate on app start
- Derived totals: subtotal and item count

## Error Handling Strategy
- JSON shape: {message, code?}
- 404 handler and centralized error handler

## Performance Notes
- Pagination defaults to limit=12
- Basic HTTP caching headers on /products list
