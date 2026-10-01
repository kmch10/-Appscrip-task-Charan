# Appscrip task — product listing page

Responsive product listing page for the Appscrip frontend assignment. The page is server-rendered with Next.js, styled with CSS, and filled from the [Fake Store API](https://fakestoreapi.com/products).

## Published Site

<https://sage-pavlova-b8d333.netlify.app/>

## Run locally

```bash
npm install
npm run dev
```

## What the page does

- Shows the collection with the filter sidebar open on desktop, hidden on request, and as a full-screen panel on a phone.
- Filters by ideal fit, occasion, work, fabric, segment, season, raw material, pattern, and customizable.
- Sorts by recommended, newest, popular.
- Searches by product name and description.
- Saves items to a wishlist for the current visit.

## Server rendering

`src/app/page.tsx` is a Server Component. It fetches the catalog with `cache: "no-store"` and `export const dynamic = "force-dynamic"`, so the product HTML is built on the server for each request.

## SEO

- Title and meta description
- One `h1` (`Discover our products`) and `h2` headings for the result count and footer sections
- Product names as `h3`
- JSON-LD `CollectionPage`, `ItemList`, and `Product` offers
- Image file names such as `mens-cotton-jacket-3.png`, with descriptive alt text

## Screenshot
<img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/18ca00ec-2ce2-4d28-847e-a1f7f0d41594" />

