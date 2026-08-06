Goal: Add promotional tools, optimise for production, and prepare for live campaign.

Tasks:

Promotions & Campaigns:

Add a coupons.json with discount codes (percentage or fixed).

In checkout, add a “Apply Coupon” field that validates against the list.

Add a banner carousel on the home page that can be edited via JSON (campaign banners).

Implement a “Flash Sale” section on home with countdown timer (using countdown).

SEO & Meta:

Use Next.js generateMetadata for each page (title, description, Open Graph).

Add a sitemap.xml and robots.txt dynamically.

Performance:

Use next/image for all product images (with local placeholder images).

Implement next/dynamic for heavy components.

Enable static generation for product pages (generateStaticParams) if data is static.

Set up caching headers in API routes.

Deployment Readiness:

Prepare environment variables (e.g., NEXT_PUBLIC_API_BASE).

Write a Dockerfile (optional) or simply deploy to Vercel.

Add vercel.json for routing.

Run next build and fix any errors.

Analytics & Tracking:

Add a simple page view tracker (mock) – can later integrate with Google Analytics.

Deliverables:

A fully functional, high‑performance e‑commerce site.

All campaign features (coupons, banners, flash sale) active.

Ready to deploy and start marketing campaigns.