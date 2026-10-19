# Uttarakhand Treks, version 2: Field Journal

A single-page Next.js 16 landing page that combines Trekking Compass's trek catalogue with the destination, Char Dham and culture content of Uttarakhand Tourism. Version 2 is written as an explorer's notebook: a light paper theme, a hand-drawn map and season-by-season planning content.

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev            # http://localhost:2027
npm run build && npm start   # production, also on port 2027
```

Brand name, domain, phone numbers, email, address and social links live in `.env` (template: `.env.example`). They are `NEXT_PUBLIC_*` variables, so rebuild after changing them, and never store secrets in them. Without a `.env` file the site falls back to the defaults in `src/data/site.ts`.

The port is set in the `dev` and `start` scripts in `package.json`. Next.js starts its server before it reads `.env`, so `PORT` cannot go there.

## Design

- **Theme:** warm paper, ink, forest green and vermilion, with pencil blue for rivers. Paper grain, ruled lines, graph paper and contour textures are CSS classes in `globals.css` (`.paper`, `.ruled`, `.lined`, `.graph`, `.contours`), plus `.perforated` postage stamps, `.tape` and a `.torn` edge.
- **Type:** Instrument Serif (display), Inter Tight (body), Caveat (handwritten notes).
- **Motion:** handwritten notes appear letter by letter, map routes draw on scroll, season cards stack as you scroll, regions and map entries turn like pages, Char Dham cards flip, sticky notes drop in, testimonials can be dragged on desktop, and the packing list draws a tick when you check an item. Everything respects `prefers-reduced-motion`.

## Sections

Hero with trip finder → Contents → 01 Sketch map → 02 Trek log (filters) → 03 Kedarkantha diary → 04 Seasons → 05 Garhwal & Kumaon → 06 Char Dham & Panch Kedar → 07 Packing list → 08 Field rules → 09 Notes → 10 FAQ → 11 Postcard contact form → Footer.

## Where things live

| Path | What |
| --- | --- |
| `.env` / `src/data/site.ts` | Brand name, domain, contact details, socials (env values with fallbacks), nav |
| `src/data/content.ts` | Treks, prices, map pins, the diary, seasons, regions, Char Dham, Panch Kedar, packing list, FAQs, sample notes |
| `src/components/*` | One file per section; `Select.tsx` is the themed dropdown |
| `src/lib/jsonld.ts` | Structured data: TravelAgency, WebSite, WebPage, TouristDestination, ItemList of TouristTrip offers, itinerary TouristTrip, HowTo (packing), FAQPage |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx` | SEO file conventions |
| `public/images` | Photos from Wikimedia Commons. Attribution is in `src/data/image-credits.json`, shown at `/credits` |

## Before going live

- Replace the sample notes (testimonials) in `content.ts` with verified reviews.
- Confirm trek prices, durations, the Kedarkantha day plan and the promises copy with the operations team.
- The map is a hand-drawn sketch; pin positions are approximate.
- Connect the postcard form (`Contact.tsx`) and newsletter (`Footer.tsx`) to a backend. Both are frontend-only for now.
