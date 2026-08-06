Goal: Build a robust cart with local storage sync and a dedicated cart page.

Tasks:

Create a Zustand store (store/cartStore.ts) with:

Items: { productId, quantity, selectedVariants? }

Methods: addItem, removeItem, updateQuantity, clearCart.

Persist to localStorage (using zustand/middleware/persist).

Build app/cart/page.tsx:

List items with product image, name, price.

Quantity up/down buttons (update store).

Remove button.

Subtotal, shipping (fixed or free), total.

“Proceed to Checkout” button (disabled if empty).

Show a mini‑cart dropdown in the header (hover/click) with a few items and total.

Add cart count badge.

Deliverables:

Cart persists across page reloads.

Cart page shows accurate totals.

“Add to Cart” from any page updates store instantly.