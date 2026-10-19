# Uttarakhand Treks v4: "Devbhoomi Yatra"

The fourth version of the Trekking Compass × Uttarakhand Tourism landing page. This one leads with pilgrimage and culture: the Char Dham route, Panch Kedar and Panch Prayag, temple towns, the festival calendar and folk culture come first, and the treks follow.

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev            # http://localhost:2029
npm run build && npm start   # production, also on port 2029
```

Brand name, domain, phone numbers, email, address and social links live in `.env` (template: `.env.example`). They are `NEXT_PUBLIC_*` variables, so rebuild after changing them, and never store secrets in them. Without a `.env` file the site falls back to the defaults in `src/data/site.ts`.

The port is set in the `dev` and `start` scripts in `package.json`. Next.js starts its server before it reads `.env`, so `PORT` cannot go there.

## Design

- **Palette:** ivory paper, marigold and saffron, kumkum red, temple maroon, brass gold, with Ganga teal as the second colour (tokens in `src/app/globals.css`).
- **Type:** Cormorant Garamond for display, Mukta for body text (Latin and Devanagari), Marcellus for small inscription-style labels and Yatra One for the Hindi accents.
- **Motifs:** hand-built Aipan-style lattice and mandala SVGs, a Pahari miniature border strip, marigold garlands, diyas and temple bells, and arched "temple window" image frames.
- **Motion:** a sunrise hero (night lifts on load, the sky brightens and the ranges drift as you scroll), a turning mandala halo, rising diya embers, a Ganga line that draws itself down the left margin on wide screens, garlands whose flowers pop in one by one, an accordion timeline for the four dhams, a drawn river map of the Panch Prayag, a rotating festival wheel, stacked pilgrimage-trek cards and diyas that light as you tick the packing list. Everything respects `prefers-reduced-motion`.
- **Dropdowns:** a custom listbox (`src/components/Select.tsx`) so every popup is themed, with full keyboard support.

## Where things live

| Path | What |
| --- | --- |
| `.env` / `src/data/site.ts` | Brand name, domain, contact details, socials (env values with fallbacks), nav |
| `src/data/content.ts` | Treks and prices, Char Dham details, Panch Kedar/Prayag, temple towns, festival calendar, culture, packing list, FAQs, sample reviews |
| `src/components/*` | One file per section (Hero, CharDhamRoute, SacredCircuits, FestivalWheel, TrekLedger, …) |
| `src/lib/jsonld.ts` | Structured data: TravelAgency, WebSite, WebPage, TouristDestination with HinduTemple attractions, Char Dham TouristTrip, trek ItemList with INR offers, FAQPage |
| `src/lib/events.ts` | Events that let the hero finder and "Enquire" buttons filter the trek list and pre-fill the form |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx` | SEO file conventions |
| `public/images` | Photos from Wikimedia Commons. Attribution is in `src/data/image-credits.json`, shown at `/credits` |

## Before going live

- Replace the sample reviews in `content.ts` with verified ones.
- Confirm trek prices, durations and the "why us" copy with the operations team.
- Check the Char Dham opening and closing notes each season against the temple committees' announcements.
- Connect the yatra request form (`Sankalp.tsx`) to a backend. It is frontend-only for now.
- Point the `#` policy links in the footer at real pages.
