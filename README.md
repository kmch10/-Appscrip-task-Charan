# Appscrip task — product listing page

Responsive product listing page for the Appscrip frontend assignment. The page is server-rendered with Next.js, styled with handwritten CSS, and filled from the [Fake Store API](https://fakestoreapi.com/products).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What the page does

- Shows the collection with the filter sidebar open on desktop, hidden on request, and as a full-screen panel on a phone.
- Filters by ideal fit, occasion, work, fabric, segment, season, raw material, pattern, and customizable.
- Sorts by recommended, newest, popular, and price.
- Searches by product name and description.
- Saves items to a wishlist for the current visit.
- Adapts the grid for desktop (3 columns with filters, 4 without), tablet, and phone (2 columns).

## Server rendering

`src/app/page.tsx` is a Server Component. It fetches the catalog with `cache: "no-store"` and `export const dynamic = "force-dynamic"`, so the product HTML is built on the server for each request.

## SEO

- Title and meta description
- One `h1` (`Discover our products`) and `h2` headings for the result count and footer sections
- Product names as `h3`
- JSON-LD `CollectionPage`, `ItemList`, and `Product` offers
- Image file names such as `mens-cotton-jacket-3.png`, with descriptive alt text
