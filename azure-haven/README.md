# Azure Haven Hotel & Resort

Pixel-accurate recreation of the Azure Haven landing page, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Notes

- Images are placeholder stock photography from Unsplash, loaded through `next/image` (remote patterns configured in `next.config.js`). Swap in the resort's real photography before launch — same aspect ratios are preserved so no layout changes are needed.
- Color tokens (navy, gold, sand) and type scale (Playfair Display + Inter) live in `tailwind.config.ts`.
- Structure follows the requested `components/` (presentational, reusable pieces) and `sections/` (page-level compositions) split; `app/page.tsx` composes the full landing page from the sections in order.
- Fully responsive: 320px mobile up through 1920px+ desktop, with a slide-in hamburger menu below the `lg` breakpoint.
