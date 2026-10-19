# Uttarakhand Treks, v3 "Summit Night"

Version 3 of the Trekking Compass × Uttarakhand Tourism landing page. Same trek catalogue and destination facts as v1, rebuilt with a dark, data-led design: compare treks by altitude, grade, days and price, and match one to your fitness with a four-step finder.

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev            # http://localhost:2028
npm run build && npm start   # production, also on port 2028
```

Brand name, domain, phone numbers, email, address and social links live in `.env` (template: `.env.example`). They are `NEXT_PUBLIC_*` variables, so rebuild after changing them, and never store secrets in them. Without a `.env` file the site falls back to the defaults in `src/data/site.ts`.

The port is set in the `dev` and `start` scripts in `package.json`. Next.js starts its server before it reads `.env`, so `PORT` cannot go there.

## Design

- **Palette:** midnight navy (`night`), ice white, glacier cyan, an aurora gradient from teal to violet, and one hot accent (`volt` lime) reserved for calls to action. Tokens are in `src/app/globals.css`.
- **Type:** Unbounded (display), Sora (body), JetBrains Mono (data labels and HUD text).
- **Motion:** canvas starfield with shooting stars (pauses offscreen, still under reduced motion), a hero frame that opens to full bleed on scroll, a fixed altimeter that climbs to 16,200 ft as you scroll, decode-on-view mono labels, number tickers, 3D tilt cards with a cursor spotlight, magnetic buttons, a drag carousel, a constellation chart that redraws per measure, and a Char Dham route line drawn by scroll. Everything respects `prefers-reduced-motion`.

## Sections

Hero and stat strip · Trek finder quiz · Sortable compare table · Trek constellation chart · Signature routes carousel · Adventures (rafting, skiing, Corbett, Tehri, camping, Kumaon) · Char Dham route timeline · Garhwal and Kumaon destinations · Altitude safety · Trail logs (reviews) · FAQs · Callback form · Footer.

## Where things live

| Path | What |
| --- | --- |
| `.env` / `src/data/site.ts` | Brand name, domain, contact details, socials (env values with fallbacks), nav |
| `src/data/content.ts` | Treks, prices, altitudes, months, adventures, Char Dham legs, destinations, safety, reviews, FAQs |
| `src/components/*` | One file per section; shared primitives (Scramble, Ticker, Magnetic, TiltCard) in `ui.tsx`; themed listbox in `Select.tsx` |
| `src/lib/jsonld.ts` | Structured data: TravelAgency, WebSite, WebPage, TouristDestination, ItemList of TouristTrip offers, FAQPage |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx` | SEO file conventions |
| `public/images` | Photos from Wikimedia Commons. Attribution is in `src/data/image-credits.json`, shown at `/credits` |

## Before going live

- Replace the sample reviews in `content.ts` with verified ones.
- Confirm trek prices, durations, Char Dham road distances (marked approximate) and the safety copy with the operations team.
- Connect the callback form (`Plan.tsx`) to a backend. It is frontend-only for now.
- The site links to the official Uttarakhand Tourism website but is not affiliated with it.
