# FORME STUDIO — 3D Furniture Storefront

A responsive furniture storefront built with React, Vite, Three.js, React Three Fiber, Drei, Framer Motion, and Lucide React. It includes a procedural 3D furniture viewer, showroom controls, catalog search/filter/sort, product detail customization, persistent cart and wishlist, and a clearly-labelled demo checkout.

## Requirements
- Node.js 20+ recommended
- pnpm
- A modern browser with WebGL for the 3D views

## Run locally
```bash
pnpm install
pnpm dev
```

Build for production:
```bash
pnpm build
pnpm preview
```

## Features
- Editorial home page and responsive navigation
- Product catalog with search, category filters, max-price filter, and sorting
- Eight sample products in `src/data/products.js`
- Interactive procedural 3D furniture (drag to orbit, zoom, and material/color choices)
- Showroom with furniture selection, material finishes, room mood presets, and lighting toggle
- Product details, variant-aware cart items, quantity updates, persistent cart and wishlist via LocalStorage
- Search overlay and mobile menu
- Newsletter form validation (demo only; no server submission)
- Demo checkout validation (does not place an order or collect payment data)
- Reduced-motion preference support and responsive layout

## Notes and limitations
- Product information, prices, and inventory are illustrative demo data in USD, not real inventory.
- Product/room photos are remotely loaded from Unsplash and require an internet connection. Replace them with licensed, optimized local assets before production.
- The 3D furniture is procedural geometry, not scanned or photorealistic manufacturer CAD. The showroom room presets currently adjust lighting/mood rather than replacing a fully furnished architectural room scene.
- The checkout is intentionally a demo. Real orders require a backend, server-side price validation, inventory, shipping/tax logic, and a secure payment provider.
- Google Fonts are loaded remotely with system fallbacks.
