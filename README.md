# Uttarakhand Treks: four landing page versions

Four independent Next.js 16 landing pages that combine Trekking Compass's trek catalogue with the destination, culture and Char Dham content of Uttarakhand Tourism. Each folder is its own app with its own `package.json`, `.env.example` and port, and each is SEO optimised (metadata, JSON-LD, sitemap, robots, manifest, Open Graph image).

| Folder | Version | Port |
| --- | --- | --- |
| [`1/`](1) | Original: dark pine and saffron, editorial | 2026 |
| [`2/`](2) | Himalayan Field Journal: light paper notebook | 2027 |
| [`3/`](3) | Glacier: light, cinematic alpine, masked hero and pinned trek stage | 2028 |
| [`4/`](4) | Devbhoomi Yatra: pilgrimage and culture first | 2029 |

Run any version:

```bash
cd 2                  # or 1, 3, 4
npm install
cp .env.example .env  # then edit the values
npm run dev           # http://localhost:<port from the table>
```

See the README inside each folder for details.

## Run all four with PM2

```bash
for v in 1 2 3 4; do (cd $v && { [ -f .env ] || cp .env.example .env; } && npm install && npm run build); done
npm install -g pm2
pm2 start ecosystem.config.js   # uk-treks-v1-classic … uk-treks-v4-yatra on 2026–2029
pm2 save
```

Rebuild a version after changing its `.env`, then `pm2 restart <name>`.
