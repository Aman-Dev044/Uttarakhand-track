# Uttarakhand Treks: landing page

A single-page Next.js 16 landing page that combines Trekking Compass's trek catalogue with the destination, culture and Char Dham content of Uttarakhand Tourism.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap, Open Graph and JSON-LD all point to it (it defaults to `https://trekkingcompass.com`).

## Where things live

| Path | What |
| --- | --- |
| `src/data/site.ts` | Brand name, contact details, socials, nav |
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
