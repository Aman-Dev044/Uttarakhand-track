# Uttarakhand Treks: four landing page versions

Four independent Next.js 16 landing pages that combine Trekking Compass's trek catalogue with the destination, culture and Char Dham content of Uttarakhand Tourism. Each folder is its own app with its own `package.json`, `.env.example` and port, and each is SEO optimised (metadata, JSON-LD, sitemap, robots, manifest, Open Graph image).

| Folder | Version | Port |
| --- | --- | --- |
| [`1/`](1) | Original: dark pine and saffron, editorial | 2026 |
| [`2/`](2) | Himalayan Field Journal: light paper notebook | 2027 |
| [`3/`](3) | Summit Night: dark starfield, data-driven trek finder | 2028 |
| [`4/`](4) | Devbhoomi Yatra: pilgrimage and culture first | 2029 |

Run any version:

```bash
cd 2                  # or 1, 3, 4
npm install
cp .env.example .env  # then edit the values
npm run dev           # http://localhost:<port from the table>
```

See the README inside each folder for details.
