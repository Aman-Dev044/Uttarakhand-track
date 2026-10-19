# Uttarakhand Treks: landing page

A single-page Next.js 16 landing page that combines Trekking Compass's trek catalogue with the destination, culture and Char Dham content of Uttarakhand Tourism.

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev            # http://localhost:2026
npm run build && npm start   # production, also on port 2026
```

Brand name, domain, phone numbers, email, address and social links live in `.env` (template: `.env.example`). They are `NEXT_PUBLIC_*` variables, so rebuild after changing them, and never store secrets in them. Without a `.env` file the site falls back to the defaults in `src/data/site.ts`.

The port is set in the `dev` and `start` scripts in `package.json`. Next.js starts its server before it reads `.env`, so `PORT` cannot go there.

## Where things live

| Path | What |
| --- | --- |
| `.env` / `src/data/site.ts` | Brand name, domain, contact details, socials (env values with fallbacks), nav |
| `src/data/content.ts` | Treks, prices, Char Dham, destinations, festivals, FAQs, testimonials |
| `src/components/*` | One file per section (Hero, Treks, CharDham, …) |
| `src/lib/jsonld.ts` | Structured data: TravelAgency, TouristTrip offers, FAQPage, TouristDestination |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx` | SEO file conventions |
| `public/images` | Photos from Wikimedia Commons. Attribution is in `src/data/image-credits.json`, shown at `/credits` |

## Before going live

- Replace the sample testimonials in `content.ts` with verified reviews.
- Confirm the trek prices, durations and advantage copy with the operations team.
- Connect the callback form (`Plan.tsx`) and newsletter (`Footer.tsx`) to a backend. Both are frontend-only for now.
- Point the `#` links (blog, policies, careers) at real pages.
