.mdGoal: Implement a smooth checkout with address, shipping, payment (Cash on Delivery), and order placement.

Tasks:

Build app/checkout/page.tsx as a multi‑step wizard (using react-hook-form):

Step 1: Address – form with line1, city, state, pincode, country. Option to use saved address from user profile (if logged in).

Step 2: Shipping – choose shipping method (standard, express – mock).

Step 3: Payment – only “Cash on Delivery” option (can later add cards). Show a summary of order.

Step 4: Review & Place Order – show all details, total, and a “Place Order” button.

On submit:

Create order object (items, totals, shipping, address, payment method: COD).

Send POST to /api/orders which saves to orders.json (in memory – will reset on restart, but we can simulate).

Return order ID.

Redirect to /order/[id] (confirmation).

Use toast notifications for success/error.

Deliverables:

Complete checkout flow with validation.

Order is created and stored.