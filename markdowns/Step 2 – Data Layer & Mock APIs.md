Goal: Create mock data files and API routes to serve them.

Tasks:

Create JSON files: products.json, categories.json, users.json, orders.json.

Build API routes in app/api/:

GET /api/products – return all products (with optional query filters).

GET /api/products/[slug] – return a single product.

GET /api/categories – list categories.

POST /api/auth/login – validate user credentials (mock).

GET /api/orders – get orders for logged‑in user.

POST /api/orders – create a new order.

GET /api/orders/[id] – fetch order details.

Use NextResponse.json() for responses.

Add a utility generateId() for new orders.

Deliverables:

All mock endpoints functional.

Data can be fetched via fetch from components.