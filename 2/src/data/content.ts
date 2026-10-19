export type Grade = "Easy" | "Easy–Moderate" | "Moderate" | "Moderate–Difficult" | "Difficult";
export type State = "Uttarakhand" | "Himachal" | "Kashmir";

export type Trek = {
  slug: string;
  name: string;
  state: State;
  region: string;
  nights: number;
  grade: Grade;
  altitudeFt: number;
  price: number;
  image: string;
  /** Journal entry, one or two sentences */
  entry: string;
  /** Short handwritten margin note */
  note: string;
  /** 1–12, months the trail is in good condition */
  months: number[];
  /** Position on the sketch map (viewBox 600 × 480), Uttarakhand treks only */
  pin?: { x: number; y: number };
};

export const treks: Trek[] = [
  {
    slug: "kedarkantha",
    name: "Kedarkantha",
    state: "Uttarakhand",
    region: "Uttarkashi, Garhwal",
    nights: 4,
    grade: "Easy–Moderate",
    altitudeFt: 12500,
    price: 5499,
    image: "/images/kedarkantha.jpg",
    entry: "Snow under the pines by day two, a frozen Juda ka Talab, and a dawn summit with Swargarohini and Bandarpunch lit up in pink.",
    note: "best first snow trek",
    months: [12, 1, 2, 3, 4],
    pin: { x: 123, y: 93 },
  },
  {
    slug: "roopkund",
    name: "Roopkund",
    state: "Uttarakhand",
    region: "Chamoli, Garhwal",
    nights: 7,
    grade: "Moderate–Difficult",
    altitudeFt: 15800,
    price: 17999,
    image: "/images/roopkund.jpg",
    entry: "Oak forests to Ali and Bedni bugyals, then the steep climb to the skeleton lake under Trishul and the Junargali ridge.",
    note: "go fit, go slow",
    months: [5, 6, 9, 10],
    pin: { x: 373, y: 214 },
  },
  {
    slug: "valley-of-flowers",
    name: "Valley of Flowers",
    state: "Uttarakhand",
    region: "Chamoli, Garhwal",
    nights: 5,
    grade: "Easy–Moderate",
    altitudeFt: 14100,
    price: 10499,
    image: "/images/valley-of-flowers.jpg",
    entry: "A UNESCO-listed valley that turns violet, yellow and blue in the rains, with the climb to Hemkund Sahib's glacial lake.",
    note: "July–Aug = peak bloom",
    months: [7, 8, 9],
    pin: { x: 352, y: 139 },
  },
  {
    slug: "har-ki-dun",
    name: "Har Ki Dun",
    state: "Uttarakhand",
    region: "Govind Pashu Vihar",
    nights: 6,
    grade: "Easy–Moderate",
    altitudeFt: 11800,
    price: 12500,
    image: "/images/har-ki-dun.jpg",
    entry: "A cradle-shaped valley reached through Osla and Seema, villages of carved wooden houses older than most maps.",
    note: "stay for the village stories",
    months: [4, 5, 6, 9, 10, 11, 12],
    pin: { x: 163, y: 74 },
  },
  {
    slug: "chandrashila",
    name: "Chopta · Tungnath · Chandrashila",
    state: "Uttarakhand",
    region: "Rudraprayag, Garhwal",
    nights: 3,
    grade: "Easy",
    altitudeFt: 12100,
    price: 6500,
    image: "/images/chandrashila.jpg",
    entry: "Deoria Tal reflections, the world's highest Shiva temple at Tungnath and a short, steep top-out on Chandrashila.",
    note: "almost all-year trail",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
    pin: { x: 291, y: 178 },
  },
  {
    slug: "kuari-pass",
    name: "Kuari Pass",
    state: "Uttarakhand",
    region: "Joshimath, Garhwal",
    nights: 5,
    grade: "Easy–Moderate",
    altitudeFt: 12516,
    price: 7499,
    image: "/images/kuari-pass.jpg",
    entry: "The Curzon trail, where Nanda Devi, Dronagiri, Kamet and Hathi Ghoda Parvat line up along a single ridge.",
    note: "the big-mountain view",
    months: [1, 2, 3, 4, 10, 11, 12],
    pin: { x: 360, y: 181 },
  },
  {
    slug: "brahmatal",
    name: "Brahmatal",
    state: "Uttarakhand",
    region: "Chamoli, Garhwal",
    nights: 5,
    grade: "Easy–Moderate",
    altitudeFt: 12250,
    price: 6999,
    image: "/images/brahmatal-lake.jpg",
    entry: "Two frozen lakes, Bekaltal and Brahmatal, and a ridge walk facing Trishul and Nanda Ghunti in deep winter.",
    note: "frozen lakes in Feb",
    months: [12, 1, 2, 3],
    pin: { x: 345, y: 236 },
  },
  {
    slug: "dayara-bugyal",
    name: "Dayara Bugyal",
    state: "Uttarakhand",
    region: "Uttarkashi, Garhwal",
    nights: 4,
    grade: "Easy–Moderate",
    altitudeFt: 12000,
    price: 6500,
    image: "/images/dayara-bugyal.jpg",
    entry: "Meadows that roll for miles above Raithal, home to the Andhudi butter-Holi each August and soft snow each winter.",
    note: "gentlest high meadow",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
    pin: { x: 192, y: 118 },
  },
  {
    slug: "ali-bedni-bugyal",
    name: "Ali Bedni Bugyal",
    state: "Uttarakhand",
    region: "Chamoli, Garhwal",
    nights: 5,
    grade: "Moderate",
    altitudeFt: 12570,
    price: 10500,
    image: "/images/ali-bedni-bugyal.jpg",
    entry: "Some of Asia's largest high meadows, the Roopkund views without the Roopkund crowds.",
    note: "quiet + huge skies",
    months: [5, 6, 9, 10, 11],
    pin: { x: 384, y: 228 },
  },
  {
    slug: "kedartal",
    name: "Kedartal",
    state: "Uttarakhand",
    region: "Gangotri National Park",
    nights: 5,
    grade: "Difficult",
    altitudeFt: 15500,
    price: 18000,
    image: "/images/kedartal.jpg",
    entry: "A steep gorge out of Gangotri, boulder fields and Shiva's lake mirroring Thalay Sagar. Wild and demanding.",
    note: "experience needed",
    months: [5, 6, 9, 10],
    pin: { x: 252, y: 120 },
  },
  {
    slug: "gaumukh-tapovan",
    name: "Gaumukh Tapovan",
    state: "Uttarakhand",
    region: "Gangotri National Park",
    nights: 6,
    grade: "Moderate–Difficult",
    altitudeFt: 14600,
    price: 18999,
    image: "/images/gaumukh-tapovan.jpg",
    entry: "Walk to the snout of the Gangotri glacier where the Bhagirathi is born, then camp on the Tapovan meadow under Shivling.",
    note: "source of the Ganga",
    months: [5, 6, 9, 10],
    pin: { x: 272, y: 104 },
  },
  {
    slug: "bali-pass",
    name: "Bali Pass",
    state: "Uttarakhand",
    region: "Har Ki Dun to Yamunotri",
    nights: 7,
    grade: "Moderate–Difficult",
    altitudeFt: 16200,
    price: 20500,
    image: "/images/har-ki-dun.jpg",
    entry: "A high crossing from the Tons valley past Ruinsara Tal and over to Yamunotri, with Bandarpunch close enough to touch.",
    note: "for seasoned legs",
    months: [5, 6, 9, 10],
    pin: { x: 180, y: 92 },
  },
  {
    slug: "hampta-pass",
    name: "Hampta Pass",
    state: "Himachal",
    region: "Kullu to Lahaul",
    nights: 4,
    grade: "Easy–Moderate",
    altitudeFt: 14100,
    price: 7500,
    image: "/images/hampta-pass.jpg",
    entry: "Green Kullu valleys on one side of the pass, the bare desert of Lahaul on the other, and a detour to Chandratal.",
    note: "two worlds, one pass",
    months: [6, 7, 8, 9],
  },
  {
    slug: "buran-ghati",
    name: "Buran Ghati",
    state: "Himachal",
    region: "Shimla district",
    nights: 7,
    grade: "Moderate–Difficult",
    altitudeFt: 15000,
    price: 15500,
    image: "/images/buran-ghati.jpg",
    entry: "Dense forest, the Dunda meadows and a snow wall at the pass that you rappel down on a fixed rope.",
    note: "the snow slide!",
    months: [5, 6, 9, 10],
  },
  {
    slug: "kashmir-great-lakes",
    name: "Kashmir Great Lakes",
    state: "Kashmir",
    region: "Sonamarg to Naranag",
    nights: 7,
    grade: "Moderate",
    altitudeFt: 13750,
    price: 16999,
    image: "/images/kashmir-great-lakes.jpg",
    entry: "Seven turquoise lakes in a week, from Vishansar and Kishansar to Gangabal, across passes carpeted in flowers.",
    note: "bring a spare camera battery",
    months: [7, 8, 9],
  },
];

export const grades: Grade[] = ["Easy", "Easy–Moderate", "Moderate", "Moderate–Difficult", "Difficult"];

/** Day-by-day diary for the signature trek */
export const diary = {
  trek: "Kedarkantha",
  slug: "kedarkantha",
  intro:
    "Four nights, five days, one summit. This is the trek we send most first-timers on, so here is how the days actually unfold.",
  days: [
    {
      day: 1,
      title: "Dehradun to Sankri",
      altitudeFt: 6400,
      distance: "200 km drive · 8–9 hrs",
      copy: "Up past Mussoorie, Purola and Mori, following the Tons river until the road ends at Sankri. Evening briefing, gear check and an early dinner.",
      image: "/images/mussoorie.jpg",
    },
    {
      day: 2,
      title: "Sankri to Juda ka Talab",
      altitudeFt: 9100,
      distance: "4 km · 4–5 hrs",
      copy: "The first real climb, through pine and maple forest, to a lake that freezes solid in January. Your first night in tents.",
      image: "/images/camp.jpg",
    },
    {
      day: 3,
      title: "Juda ka Talab to base camp",
      altitudeFt: 11250,
      distance: "4 km · 3 hrs",
      copy: "A short, steady day through oak and snow to an open meadow. The summit is right there above camp. Rest, acclimatise and sleep early.",
      image: "/images/chopta.jpg",
    },
    {
      day: 4,
      title: "Summit and down to Hargaon",
      altitudeFt: 12500,
      distance: "≈ 9 km · 9–10 hrs",
      copy: "A 3 am start with head torches. Sunrise on top, with a 360° ring of Swargarohini, Bandarpunch and Kala Nag, then the long knee-test descent.",
      image: "/images/kedarkantha.jpg",
    },
    {
      day: 5,
      title: "Hargaon to Sankri to Dehradun",
      altitudeFt: 6400,
      distance: "6 km walk + drive",
      copy: "An easy walk out to Sankri, a last cup of chai with the team, and the drive back to Dehradun by late evening.",
      image: "/images/har-ki-dun.jpg",
    },
  ],
} as const;

export const seasons = [
  {
    key: "winter",
    name: "Winter",
    hindi: "शीत",
    span: "Dec – Mar",
    months: [12, 1, 2, 3],
    sees: "Fresh snow on oak and pine, frozen lakes, clear blue skies after each storm.",
    blooms: "Burans (rhododendron) begins to flower on the lower slopes in March.",
    wear: "Thermals, a down jacket, waterproof boots and microspikes.",
    festival: "Phool Dei, mid-March, when children leave flowers on every doorstep.",
    image: "/images/kedarkantha.jpg",
  },
  {
    key: "spring",
    name: "Spring & early summer",
    hindi: "बसंत",
    span: "Apr – Jun",
    months: [4, 5, 6],
    sees: "Long days, melting snow above 11,000 ft and the high passes opening one by one.",
    blooms: "Rhododendron forests in red and pink, primulas and wild strawberries in the meadows.",
    wear: "Layers you can peel off, a sun hat and plenty of sunscreen.",
    festival: "The Char Dham temples open around Akshaya Tritiya, late April to May.",
    image: "/images/ali-bedni-bugyal.jpg",
  },
  {
    key: "monsoon",
    name: "Monsoon",
    hindi: "वर्षा",
    span: "Jul – Aug",
    months: [7, 8],
    sees: "Mist, waterfalls and very green slopes. Roads can close after heavy rain.",
    blooms: "Peak season in the Valley of Flowers: blue poppies, cobra lilies, potentilla.",
    wear: "A real rain jacket, a pack cover and quick-dry trousers.",
    festival: "Harela in July, when Kumaoni families plant saplings to welcome the rains.",
    image: "/images/valley-of-flowers.jpg",
  },
  {
    key: "autumn",
    name: "Autumn",
    hindi: "शरद",
    span: "Sep – Nov",
    months: [9, 10, 11],
    sees: "The clearest air of the year. Golden meadows and sharp, snow-dusted ridgelines.",
    blooms: "Last flowers in early September, then the bugyals turn bronze.",
    wear: "A warm mid-layer for cold nights and a beanie for the summit morning.",
    festival: "The temples close for winter around Diwali and Bhai Dooj.",
    image: "/images/kuari-pass.jpg",
  },
] as const;

export const regions = {
  Garhwal: {
    blurb:
      "The western half: Ganga and Yamuna country. Big glaciers, all four Char Dham shrines and most of the classic high treks, from Kedarkantha to Roopkund.",
    facts: ["Char Dham shrines", "Gangotri & Nanda Devi parks", "Rishikesh rafting", "Auli ski slopes"],
    places: [
      { name: "Rishikesh", note: "yoga by morning, rapids by noon", image: "/images/rishikesh.jpg" },
      { name: "Haridwar", note: "Ganga Aarti at Har Ki Pauri", image: "/images/haridwar.jpg" },
      { name: "Mussoorie", note: "Camel's Back Road walks", image: "/images/mussoorie.jpg" },
      { name: "Auli", note: "skiing, Jan to Mar", image: "/images/auli.jpg" },
      { name: "Chopta", note: "meadows and Tungnath", image: "/images/chopta.jpg" },
      { name: "Tehri Lake", note: "kayaks and jet skis", image: "/images/tehri.jpg" },
    ],
  },
  Kumaon: {
    blurb:
      "The eastern half: softer hills, lake towns and old forest estates. Fewer crowds, long Himalayan panoramas and the tigers of Corbett.",
    facts: ["Lake district", "Jim Corbett National Park", "Kumaoni homestays", "Nanda Devi panoramas"],
    places: [
      { name: "Nainital", note: "boating on Naini Lake", image: "/images/nainital.jpg" },
      { name: "Jim Corbett", note: "India's first national park, 1936", image: "/images/corbett.jpg" },
      { name: "Kausani", note: "sunrise over Trishul", image: "/images/kausani.jpg" },
      { name: "Binsar", note: "300 km of skyline from Zero Point", image: "/images/binsar.jpg" },
      { name: "Ranikhet", note: "orchards and golf greens", image: "/images/hero-2.jpg" },
    ],
  },
} as const;

export type RegionKey = keyof typeof regions;

export const dhams = [
  {
    name: "Yamunotri",
    deity: "Goddess Yamuna",
    district: "Uttarkashi",
    altitudeM: 3293,
    access: "6 km walk from Janki Chatti",
    note: "Rice cooked in the Surya Kund hot spring is taken home as prasad.",
    image: "/images/yamunotri.jpg",
  },
  {
    name: "Gangotri",
    deity: "Goddess Ganga",
    district: "Uttarkashi",
    altitudeM: 3100,
    access: "Road all the way, ≈100 km from Uttarkashi",
    note: "The Bhagirathi's own source, Gaumukh, is a 19 km walk further up.",
    image: "/images/gangotri.jpg",
  },
  {
    name: "Kedarnath",
    deity: "Lord Shiva",
    district: "Rudraprayag",
    altitudeM: 3583,
    access: "16 km walk from Gaurikund, or helicopter",
    note: "A Jyotirlinga in grey stone, set against the Kedarnath massif.",
    image: "/images/kedarnath.jpg",
  },
  {
    name: "Badrinath",
    deity: "Lord Vishnu",
    district: "Chamoli",
    altitudeM: 3133,
    access: "Road via Joshimath",
    note: "The painted temple on the Alaknanda, a short drive from Mana village.",
    image: "/images/badrinath.jpg",
  },
] as const;

export const panchKedar = [
  { name: "Kedarnath", part: "the hump", altitudeM: 3583, note: "Most visited; road head at Gaurikund." },
  { name: "Tungnath", part: "the arms", altitudeM: 3680, note: "The highest Shiva temple in the world, above Chopta." },
  { name: "Rudranath", part: "the face", altitudeM: 2286, note: "A long, beautiful forest walk from Sagar village." },
  { name: "Madhyamaheshwar", part: "the navel", altitudeM: 3497, note: "Remote meadows beyond Ransi, with Chaukhamba views." },
  { name: "Kalpeshwar", part: "the hair", altitudeM: 2200, note: "The only one of the five open all year." },
] as const;

export const yatraSteps = [
  "Register for the yatra on the Uttarakhand government's official portal before you travel.",
  "Plan 10–12 days for all four dhams by road; there are no shortcuts on mountain roads.",
  "Book Kedarnath helicopter seats only through the authorised booking channel.",
  "Keep a buffer day for landslides, especially in late June and the monsoon.",
] as const;

export const packing = [
  {
    group: "Wear",
    items: ["Trekking shoes, broken in", "Two quick-dry T-shirts", "Fleece or woollen mid-layer", "Down or padded jacket", "Trek pants (not jeans)", "Woollen socks × 3"],
  },
  {
    group: "Carry",
    items: ["40–60 L backpack with rain cover", "Two 1 L water bottles", "Head torch and spare batteries", "Sunglasses (UV 400)", "Trekking poles"],
  },
  {
    group: "Pharmacy",
    items: ["Personal medicines", "Sunscreen SPF 50 and lip balm", "ORS sachets", "Blister plasters"],
  },
  {
    group: "Paperwork",
    items: ["Government photo ID", "Medical fitness certificate", "Yatra registration (Char Dham)"],
  },
] as const;

export const fieldRules = [
  {
    title: "Climb high, sleep low",
    copy: "Above 10,000 ft, gain no more than about 1,500 ft of sleeping altitude a day. The itineraries are paced for this, so let them be.",
  },
  {
    title: "Know the early signs",
    copy: "Headache, nausea and poor sleep can be acute mountain sickness. Tell your leader early. Going down is the cure.",
  },
  {
    title: "Drink before you're thirsty",
    copy: "Aim for 3–4 litres a day. Cold air hides how much water you lose on a climb.",
  },
  {
    title: "Pack it in, pack it out",
    copy: "Every wrapper comes back down. Our teams carry eco-bags and clean campsites on every batch.",
  },
] as const;

export const promises = [
  { title: "Daily health checks", copy: "Oxygen levels and pulse checked every morning and evening on high-altitude batches." },
  { title: "Local crews", copy: "Guides, cooks and mule handlers from the valleys you walk through." },
  { title: "One clear price", copy: "Stays, meals, permits, guides and safety gear included. No surprises at base camp." },
  { title: "Small batches", copy: "Personally led groups, from first-timers to seasoned climbers." },
] as const;

// Sample notes for layout only. Replace with verified reviews before going live.
export const notes = [
  { name: "Priya D.", from: "Jaipur", trek: "Kedarkantha", text: "I'd never seen snow fall. Day two it started at lunch and our cook made pakoras. Still smiling about it." },
  { name: "Aditya K.", from: "Chennai", trek: "Valley of Flowers", text: "Rained every day, and somehow that made it better. The guide knew every flower's local name." },
  { name: "Farah & Imran", from: "Lucknow", trek: "Har Ki Dun", text: "Osla village felt like walking into a story. We slept to the sound of the Supin river." },
  { name: "Nikhil P.", from: "Indore", trek: "Roopkund", text: "Turned back at Bhagwabasa because of weather, and the leader was right. Coming back next September." },
  { name: "Tara S.", from: "Goa", trek: "Kuari Pass", text: "Solo, first Himalayan trek, zero regrets. The Nanda Devi view at sunrise made me cry a little." },
] as const;

export const faqs = [
  {
    q: "What is the best month to trek in Uttarakhand?",
    a: "It depends on what you want to see. December to March is snow season (Kedarkantha, Brahmatal, Kuari Pass). May–June and September–October open the high treks like Roopkund, Kedartal and Bali Pass. July–August is flower season in the Valley of Flowers. Autumn has the clearest views of the year.",
  },
  {
    q: "Which Uttarakhand trek is best for a complete beginner?",
    a: "Kedarkantha in winter, Chopta–Tungnath–Chandrashila for most of the year and Dayara Bugyal are all gentle first treks. They climb gradually, stay around 12,000 ft and need no technical skills.",
  },
  {
    q: "How fit do I need to be?",
    a: "For easy and moderate treks, aim to jog 5 km in under 35 minutes about a month before you go, and climb stairs with a loaded backpack. Difficult treks such as Kedartal or Bali Pass need earlier high-altitude experience.",
  },
  {
    q: "How do I avoid altitude sickness?",
    a: "Follow a well-paced itinerary, drink 3–4 litres of water a day, avoid alcohol, and report a headache or nausea to your trek leader early. Leaders check oxygen levels daily on high-altitude batches and descend if symptoms persist.",
  },
  {
    q: "Do I need to register for the Char Dham Yatra?",
    a: "Yes. Pilgrims must register on the Uttarakhand government's official portal before travelling. The temples usually open from late April or May and close for winter around Diwali and Bhai Dooj; exact dates are announced each year.",
  },
  {
    q: "What does the trek price include?",
    a: "Guesthouse and tent stays, vegetarian meals on the trek, forest permits, certified trek leaders and guides, safety kit such as oxygen, first-aid and microspikes, and cooks and porters for common gear. Transport from Dehradun is usually an add-on.",
  },
  {
    q: "Is trekking safe for solo women?",
    a: "Yes, and many of our trekkers are solo women. Tents are shared only with other women, female leaders join where possible, and the Dehradun office tracks every batch.",
  },
] as const;

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const levels = [
  { value: "gentle", label: "Gentle", grades: ["Easy", "Easy–Moderate"] },
  { value: "steady", label: "Steady", grades: ["Moderate"] },
  { value: "tough", label: "Tough", grades: ["Moderate–Difficult", "Difficult"] },
] as const satisfies readonly { value: string; label: string; grades: readonly Grade[] }[];

export type Level = (typeof levels)[number]["value"];
