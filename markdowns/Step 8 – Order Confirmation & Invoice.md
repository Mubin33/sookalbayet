Goal: Show order details and provide a printable invoice.

Tasks:

Create app/order/[id]/page.tsx:

Fetch order by ID from API.

Display a “Thank you” message, order number, date, items, shipping address, total.

A “Download Invoice” button (generates a printable PDF or uses window.print()).

Build app/invoice/[id]/page.tsx:

Same order data, but designed for printing (no headers/footers, clean layout).

Use @react-print or simple CSS @media print.

Include a “Continue Shopping” button.

Deliverables:

User can view and print their order invoice.

Order history is accessible.