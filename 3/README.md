# Uttarakhand Treks, v3 "Glacier"

Version 3 of the Trekking Compass × Uttarakhand Tourism landing page. Same trek catalogue and destination facts as v1, rebuilt as a light, cinematic alpine page: big photography, a strict grid, lots of white space and one accent colour.

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev            # http://localhost:2028
npm run build && npm start   # production, also on port 2028
```

Brand name, domain, phone numbers, email, address and social links live in `.env` (template: `.env.example`). They are `NEXT_PUBLIC_*` variables, so rebuild after changing them, and never store secrets in them. Without a `.env` file the site falls back to the defaults in `src/data/site.ts`.

The port is set in the `dev` and `start` scripts in `package.json`. Next.js starts its server before it reads `.env`, so `PORT` cannot go there.

## Design

- **Palette:** snow (`#f7f9fb`) and ice (`#e8eef3`) surfaces, graphite slate text (`#0f1720`), glacier blue as the secondary colour, and alpine red (`#e0482f`) used sparingly for numbers, focus rings and the odd call to action. Tokens are in `src/app/globals.css`.
- **Type:** Bricolage Grotesque for display (its condensed `wdth 75` cut for the giant words), Geist for body text.
- **Motion** (transform, opacity and clip-path only; everything respects `prefers-reduced-motion`):
  - Intro curtain: a 0–100 count and a panel that lifts away in under 1.8 s. It is pure CSS, `aria-hidden`, and plays once per browser session.
  - Hero: a giant "HIMALAYA" cut out of a snow layer (`mix-blend-mode: screen`) over a slowly drifting photo; scrolling scales the letters until the photo is full-bleed.
  - Headings reveal line by line from overflow masks.
  - Signature treks: a pinned photo stage that crossfades and zooms between five treks while the text scrolls beside it, with a progress bar.
  - Outline-type marquee whose speed and direction follow scroll velocity.
  - Trek index rows fill from the baseline on hover, and a preview photo follows the cursor (desktop).
  - Destinations: a pinned strip driven sideways by vertical scroll on desktop, swipeable on mobile.
  - Photos open with clip-path reveals; the primary buttons are magnetic; Lenis smooth scroll.

## Sections

Hero · About and numbers · Five signature treks (scrollytelling) · Marquee · Trek index of all 15 treks with a "find my trek" sentence filter and sorting · Seasons · Char Dham route · Garhwal and Kumaon panorama · Adventures (rafting, skiing, Corbett, camping) · Why walk with us · Reviews · FAQ · Callback form · Footer.

## Where things live

| Path | What |
| --- | --- |
| `.env` / `src/data/site.ts` | Brand name, domain, contact details, socials (env values with fallbacks), nav |
| `src/data/content.ts` | Treks, prices, altitudes, months, signature chapters, seasons, adventures, Char Dham, destinations, reviews, FAQs |
| `src/components/*` | One file per section; shared primitives (LineReveal, Counter, Magnetic, Label) in `ui.tsx`; themed listbox in `Select.tsx` |
| `src/lib/jsonld.ts` | Structured data: TravelAgency, WebSite, WebPage, TouristDestination, ItemList of TouristTrip offers, FAQPage |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx` | SEO file conventions |
| `public/images` | Photos from Wikimedia Commons. Attribution is in `src/data/image-credits.json`, shown at `/credits` |

## Before going live

- Replace the sample reviews in `content.ts` with verified ones.
- Confirm trek prices, durations and the "why us" copy with the operations team.
- Connect the callback form (`Plan.tsx`) to a backend. It is frontend-only for now.
- Point the footer Privacy and Terms links at real pages.
- The site links to the official Uttarakhand Tourism website but is not affiliated with it.
