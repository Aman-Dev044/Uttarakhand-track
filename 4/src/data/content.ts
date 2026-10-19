// Content for v4 "Devbhoomi Yatra". Trek facts (prices, altitudes, nights, months) match the
// Trekking Compass catalogue; religious and seasonal details follow Uttarakhand Tourism and the
// temple committees. Dates of lunar festivals and temple openings vary each year, so none are fixed here.

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
  blurb: string;
  /** 1–12, months the trail is in good condition */
  months: number[];
};

export const treks: Trek[] = [
  {
    slug: "kedarkantha",
    name: "Kedarkantha",
    state: "Uttarakhand",
    region: "Sankri, Uttarkashi",
    nights: 4,
    grade: "Easy–Moderate",
    altitudeFt: 12500,
    price: 5499,
    image: "/images/kedarkantha.jpg",
    blurb: "A snow summit named for Shiva, climbed through pine and oak to a frozen Juda ka Talab.",
    months: [12, 1, 2, 3, 4],
  },
  {
    slug: "chandrashila",
    name: "Tungnath & Chandrashila",
    state: "Uttarakhand",
    region: "Chopta, Rudraprayag",
    nights: 3,
    grade: "Easy",
    altitudeFt: 12100,
    price: 6500,
    image: "/images/chandrashila.jpg",
    blurb: "Darshan at the highest Shiva temple in the world, then a dawn climb to Chandrashila.",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
  },
  {
    slug: "dayara-bugyal",
    name: "Dayara Bugyal",
    state: "Uttarakhand",
    region: "Raithal, Uttarkashi",
    nights: 4,
    grade: "Easy–Moderate",
    altitudeFt: 12000,
    price: 6500,
    image: "/images/dayara-bugyal.jpg",
    blurb: "The meadow where villagers splash butter and buttermilk at the Andhudi festival.",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
  },
  {
    slug: "brahmatal",
    name: "Brahmatal",
    state: "Uttarakhand",
    region: "Lohajung, Chamoli",
    nights: 5,
    grade: "Easy–Moderate",
    altitudeFt: 12250,
    price: 6999,
    image: "/images/brahmatal.jpg",
    blurb: "Lakes said to be where Brahma meditated, frozen white beneath Trishul in winter.",
    months: [12, 1, 2, 3],
  },
  {
    slug: "kuari-pass",
    name: "Kuari Pass",
    state: "Uttarakhand",
    region: "Joshimath, Chamoli",
    nights: 5,
    grade: "Easy–Moderate",
    altitudeFt: 12516,
    price: 7499,
    image: "/images/kuari-pass.jpg",
    blurb: "The old Curzon trail above Joshimath, with Nanda Devi and Dronagiri across the sky.",
    months: [1, 2, 3, 4, 10, 11, 12],
  },
  {
    slug: "hampta-pass",
    name: "Hampta Pass",
    state: "Himachal",
    region: "Manali, Kullu",
    nights: 4,
    grade: "Easy–Moderate",
    altitudeFt: 14100,
    price: 7500,
    image: "/images/hampta-pass.jpg",
    blurb: "A crossing from the green Kullu valley into the bare, moon-like slopes of Lahaul.",
    months: [6, 7, 8, 9],
  },
  {
    slug: "valley-of-flowers",
    name: "Valley of Flowers & Hemkund Sahib",
    state: "Uttarakhand",
    region: "Ghangaria, Chamoli",
    nights: 5,
    grade: "Easy–Moderate",
    altitudeFt: 14100,
    price: 10499,
    image: "/images/valley-of-flowers.jpg",
    blurb: "A UNESCO valley in monsoon bloom, and the Sikh shrine of Hemkund beside its glacial lake.",
    months: [7, 8, 9],
  },
  {
    slug: "ali-bedni-bugyal",
    name: "Ali Bedni Bugyal",
    state: "Uttarakhand",
    region: "Wan, Chamoli",
    nights: 5,
    grade: "Moderate",
    altitudeFt: 12570,
    price: 10500,
    image: "/images/ali-bedni-bugyal.jpg",
    blurb: "Vast high pastures on the route of the Nanda Devi Raj Jat, with Trishul overhead.",
    months: [5, 6, 9, 10, 11],
  },
  {
    slug: "har-ki-dun",
    name: "Har Ki Dun",
    state: "Uttarakhand",
    region: "Taluka, Uttarkashi",
    nights: 6,
    grade: "Easy–Moderate",
    altitudeFt: 11800,
    price: 12500,
    image: "/images/har-ki-dun.jpg",
    blurb: "The valley below Swargarohini, the peak the Pandavas are said to have climbed to heaven.",
    months: [4, 5, 6, 9, 10, 11, 12],
  },
  {
    slug: "buran-ghati",
    name: "Buran Ghati",
    state: "Himachal",
    region: "Janglik, Shimla",
    nights: 7,
    grade: "Moderate–Difficult",
    altitudeFt: 15000,
    price: 15500,
    image: "/images/buran-ghati.jpg",
    blurb: "Old-growth forest, the Dunda meadows and a snow slide down the far side of the pass.",
    months: [5, 6, 9, 10],
  },
  {
    slug: "kashmir-great-lakes",
    name: "Kashmir Great Lakes",
    state: "Kashmir",
    region: "Sonamarg, Ganderbal",
    nights: 7,
    grade: "Moderate",
    altitudeFt: 13750,
    price: 16999,
    image: "/images/kashmir-great-lakes.jpg",
    blurb: "Seven alpine lakes in a week, ending at Gangabal and its lakeside Shiva shrine.",
    months: [7, 8, 9],
  },
  {
    slug: "roopkund",
    name: "Roopkund",
    state: "Uttarakhand",
    region: "Lohajung, Chamoli",
    nights: 7,
    grade: "Moderate–Difficult",
    altitudeFt: 15800,
    price: 17999,
    image: "/images/roopkund.jpg",
    blurb: "The mystery lake under Trishul, a halt on Goddess Nanda's twelve-yearly procession.",
    months: [5, 6, 9, 10],
  },
  {
    slug: "kedartal",
    name: "Kedartal",
    state: "Uttarakhand",
    region: "Gangotri, Uttarkashi",
    nights: 5,
    grade: "Difficult",
    altitudeFt: 15500,
    price: 18000,
    image: "/images/kedartal.jpg",
    blurb: "Shiva's lake below Thalay Sagar, reached up a steep gorge from Gangotri itself.",
    months: [5, 6, 9, 10],
  },
  {
    slug: "gaumukh-tapovan",
    name: "Gaumukh & Tapovan",
    state: "Uttarakhand",
    region: "Gangotri, Uttarkashi",
    nights: 6,
    grade: "Moderate–Difficult",
    altitudeFt: 14600,
    price: 18999,
    image: "/images/gaumukh-tapovan.jpg",
    blurb: "Walk to the glacier snout where the Bhagirathi is born, then up to Tapovan below Shivling.",
    months: [5, 6, 9, 10],
  },
  {
    slug: "bali-pass",
    name: "Bali Pass",
    state: "Uttarakhand",
    region: "Sankri to Yamunotri",
    nights: 7,
    grade: "Moderate–Difficult",
    altitudeFt: 16200,
    price: 20500,
    image: "/images/har-ki-dun.jpg",
    blurb: "A high traverse from the Tons valley that ends at the temple of Yamunotri.",
    months: [5, 6, 9, 10],
  },
];

/** Treks with a sacred story, shown as stacked cards */
export const sacredTrails = [
  {
    slug: "gaumukh-tapovan",
    legend: "Source of the Ganga",
    story:
      "Gaumukh, the cow's mouth, is the snout of the Gangotri glacier. Pilgrims walk 19 km from the Gangotri temple to see the Bhagirathi leave the ice, and climb on to Tapovan, where sadhus spend the summer below Shivling.",
  },
  {
    slug: "kedartal",
    legend: "Shiva's own lake",
    story:
      "Kedartal is known as the lake of Shiva. It lies at the foot of Thalay Sagar and its meltwater feeds the Kedar Ganga, which joins the Bhagirathi at Gangotri.",
  },
  {
    slug: "valley-of-flowers",
    legend: "Hemkund Sahib",
    story:
      "Above Ghangaria, Gurudwara Hemkund Sahib sits beside a glacial lake ringed by seven peaks. The same base leads into the Valley of Flowers, which blooms through the monsoon.",
  },
  {
    slug: "roopkund",
    legend: "The path of Nanda Devi",
    story:
      "Goddess Nanda is the daughter of these hills. Her Raj Jat procession, held roughly once in twelve years, crosses Bedni Bugyal and the ridge above Roopkund on its way to Homkund.",
  },
  {
    slug: "chandrashila",
    legend: "Third of the Panch Kedar",
    story:
      "Tungnath is where Shiva's arms are worshipped. At about 3,680 m it is the highest Shiva temple in the world, and Chandrashila, the moon rock, is a short climb above it.",
  },
  {
    slug: "har-ki-dun",
    legend: "Stairway to heaven",
    story:
      "Har Ki Dun faces Swargarohini, the peak the Pandavas are said to have climbed on their last journey. The villages on the way still honour Duryodhana and Karna at their wooden temples.",
  },
] as const;

export type Dham = {
  slug: string;
  name: string;
  hindi: string;
  deity: string;
  river: string;
  district: string;
  altitudeM: number;
  base: string;
  reach: string;
  opens: string;
  closes: string;
  winterSeat: string;
  note: string;
  image: string;
};

export const charDham: Dham[] = [
  {
    slug: "yamunotri",
    name: "Yamunotri",
    hindi: "यमुनोत्री",
    deity: "Goddess Yamuna",
    river: "Yamuna",
    district: "Uttarkashi",
    altitudeM: 3293,
    base: "Barkot",
    reach: "Drive to Janki Chatti, then walk about 6 km. Ponies and palkis are available from registered counters.",
    opens: "Akshaya Tritiya (April–May)",
    closes: "Bhai Dooj (October–November)",
    winterSeat: "Kharsali village",
    note: "Pilgrims tie rice and potatoes in cloth and cook them in the Surya Kund hot spring to take home as prasad.",
    image: "/images/yamunotri.jpg",
  },
  {
    slug: "gangotri",
    name: "Gangotri",
    hindi: "गंगोत्री",
    deity: "Goddess Ganga",
    river: "Bhagirathi",
    district: "Uttarkashi",
    altitudeM: 3100,
    base: "Uttarkashi or Harsil",
    reach: "Fully motorable, about 100 km from Uttarkashi along the Bhagirathi valley.",
    opens: "Akshaya Tritiya (April–May)",
    closes: "The day after Diwali (October–November)",
    winterSeat: "Mukhba village",
    note: "This is where King Bhagirath's penance is said to have brought the Ganga to earth. Gaumukh, the glacier source, is 19 km on foot.",
    image: "/images/gangotri.jpg",
  },
  {
    slug: "kedarnath",
    name: "Kedarnath",
    hindi: "केदारनाथ",
    deity: "Lord Shiva",
    river: "Mandakini",
    district: "Rudraprayag",
    altitudeM: 3583,
    base: "Guptkashi or Sonprayag",
    reach: "Walk about 16 km from Gaurikund, or fly from the Phata, Sersi and Guptkashi helipads.",
    opens: "Date announced at Ukhimath on Mahashivratri (usually late April–May)",
    closes: "Bhai Dooj (October–November)",
    winterSeat: "Omkareshwar Temple, Ukhimath",
    note: "The highest of the twelve Jyotirlingas and the first of the Panch Kedar, with the Kedarnath peaks rising behind it.",
    image: "/images/kedarnath.jpg",
  },
  {
    slug: "badrinath",
    name: "Badrinath",
    hindi: "बद्रीनाथ",
    deity: "Lord Vishnu as Badri Narayan",
    river: "Alaknanda",
    district: "Chamoli",
    altitudeM: 3133,
    base: "Joshimath",
    reach: "Motorable via Joshimath. Mana, the last village before Tibet, is 3 km beyond the temple.",
    opens: "Date announced at Narendra Nagar on Basant Panchami (usually late April–May)",
    closes: "Date fixed on Vijayadashami (usually November)",
    winterSeat: "Pandukeshwar and Joshimath",
    note: "Pilgrims bathe in the Tapt Kund hot spring below the painted temple, which stands between the Nar and Narayan ranges.",
    image: "/images/badrinath.jpg",
  },
];

export const yatraSteps = [
  {
    title: "Register for the yatra",
    copy: "Registration is required for every Char Dham pilgrim. It is free on the state's official registration portal and app, and counters run in Haridwar and Rishikesh during the season. We handle it for every traveller in our groups.",
  },
  {
    title: "Book helicopters only on official portals",
    copy: "Kedarnath helicopter tickets are sold only through the official IRCTC HeliYatra website. Ignore social media sellers. We help you plan your dates around the slots.",
  },
  {
    title: "Get a health check",
    copy: "All four shrines are above 3,000 m. If you are over 50, or have heart, lung or blood pressure conditions, see your doctor before you travel. Health screening points run along the route.",
  },
  {
    title: "Give yourself time",
    copy: "The full Char Dham circuit usually takes 10 to 12 days by road from Haridwar or Dehradun. Leave a spare day for landslides or closed roads, and don't drive in the hills after dark.",
  },
] as const;

export const panchKedar = [
  { name: "Kedarnath", part: "The hump", altitude: "3,583 m", copy: "The main shrine and a Jyotirlinga, reached on foot or by helicopter." },
  { name: "Tungnath", part: "The arms", altitude: "~3,680 m", copy: "The highest Shiva temple in the world, a short climb from Chopta." },
  { name: "Rudranath", part: "The face", altitude: "~3,600 m", copy: "A rock temple in high meadows, the hardest of the five to reach." },
  { name: "Madhyamaheshwar", part: "The navel", altitude: "~3,490 m", copy: "A quiet stone temple above Ransi with views of Chaukhamba." },
  { name: "Kalpeshwar", part: "The matted hair", altitude: "~2,200 m", copy: "A cave temple in the Urgam valley, open all year round." },
] as const;

export const panchPrayag = [
  { name: "Vishnuprayag", meets: "Dhauliganga", copy: "Near Joshimath, the first confluence on the Alaknanda." },
  { name: "Nandprayag", meets: "Nandakini", copy: "Linked to King Nanda, whose prayers are remembered here." },
  { name: "Karnaprayag", meets: "Pindar", copy: "Named for Karna, who is said to have prayed to Surya here." },
  { name: "Rudraprayag", meets: "Mandakini", copy: "The river that comes down from Kedarnath joins here." },
  { name: "Devprayag", meets: "Bhagirathi", copy: "The two rivers meet and are called the Ganga from here on." },
] as const;

export const tirthTowns = [
  {
    name: "Haridwar",
    region: "Garhwal plains",
    image: "/images/haridwar.jpg",
    copy: "Where the Ganga leaves the mountains. Thousands gather at Har Ki Pauri at dusk for the Ganga Aarti, and most Char Dham journeys begin here.",
  },
  {
    name: "Rishikesh",
    region: "Garhwal foothills",
    image: "/images/rishikesh.jpg",
    copy: "Ashrams, yoga schools and the evening aarti at Triveni Ghat and Parmarth Niketan, with river rafting on the Ganga upstream.",
  },
  {
    name: "Jageshwar",
    region: "Almora, Kumaon",
    image: null,
    copy: "More than a hundred stone temples to Shiva stand in a deodar forest here, built over several centuries.",
  },
  {
    name: "Baijnath",
    region: "Bageshwar, Kumaon",
    image: null,
    copy: "A cluster of old temples on the banks of the Gomti, in a wide valley ringed by the Kumaon hills.",
  },
  {
    name: "Joshimath & Auli",
    region: "Chamoli, Garhwal",
    image: "/images/auli.jpg",
    copy: "Joshimath is the gateway to Badrinath and home to the Narsingh temple, a winter seat of Badri Vishal. A ropeway climbs from here to the meadows and ski slopes of Auli.",
  },
] as const;

export type Festival = { name: string; hindi?: string; when: string; copy: string };

/** Festivals by Gregorian month (lunar dates shift each year) */
export const festivalCalendar: Record<number, Festival[]> = {
  1: [
    { name: "Uttarayani & Ghughutiya", hindi: "उत्तरायणी", when: "Makar Sankranti", copy: "The big fair at Bageshwar, where the Saryu and Gomti meet. Kumaoni children string ghughut sweets and call the crows to share them." },
  ],
  2: [
    { name: "Basant Panchami", when: "January–February", copy: "Badrinath's opening date is announced at the Narendra Nagar palace on this day." },
    { name: "Mahashivratri", when: "February–March", copy: "Kedarnath's opening date is announced at Omkareshwar Temple, Ukhimath." },
  ],
  3: [
    { name: "Phool Dei", hindi: "फूलदेई", when: "First day of Chaitra", copy: "Children leave rhododendron and fyonli flowers on every doorstep to welcome spring." },
    { name: "Kumaoni Holi", when: "Phalgun", copy: "Weeks of baithki and khadi Holi, sung in the classical style in homes and courtyards." },
  ],
  4: [
    { name: "Akshaya Tritiya", when: "April–May", copy: "The portals of Gangotri and Yamunotri usually open, and the yatra season begins." },
  ],
  5: [
    { name: "Kedarnath & Badrinath open", when: "Late April–May", copy: "Doli processions carry the deities back up from their winter seats to the high shrines." },
  ],
  6: [
    { name: "Ganga Dussehra", when: "Jyeshtha", copy: "The descent of the Ganga is celebrated with baths and aarti along the ghats of Haridwar and Rishikesh." },
  ],
  7: [
    { name: "Harela", hindi: "हरेला", when: "Start of Shravan", copy: "Kumaon's festival of green. Families sow seeds days earlier and plant saplings as the rains arrive." },
    { name: "Kanwar Yatra", when: "Shravan", copy: "Shiva devotees walk to Haridwar to carry Ganga water home in pots slung from a kanwar." },
  ],
  8: [
    { name: "Andhudi, the butter festival", when: "Bhadrapada", copy: "Villagers of Raithal celebrate on Dayara Bugyal by splashing butter and buttermilk." },
    { name: "Nanda Devi Raj Jat", when: "Roughly every 12 years", copy: "A three-week Himalayan procession that escorts Goddess Nanda from Nauti to Homkund." },
  ],
  9: [
    { name: "Nanda Devi Mela", when: "Bhadrapada Ashtami", copy: "Fairs in Almora and Nainital honour Nanda and Sunanda, the protector goddesses of Kumaon." },
  ],
  10: [
    { name: "Vijayadashami", when: "Ashvin", copy: "Badrinath's closing date is fixed. Ramlila stages light up the hill towns." },
    { name: "Diwali", when: "October–November", copy: "Gangotri's portals close the day after Diwali and the goddess travels to Mukhba." },
  ],
  11: [
    { name: "Bhai Dooj", when: "October–November", copy: "Kedarnath and Yamunotri close for winter, and the dolis descend to Ukhimath and Kharsali." },
    { name: "Igas Bagwal", hindi: "इगास", when: "Eleven days after Diwali", copy: "Garhwal's own Diwali, with bhailo fire-torches whirled in the village square." },
  ],
  12: [
    { name: "Winter seat darshan", when: "November–April", copy: "Pray to the four deities at their winter homes: Kharsali, Mukhba, Ukhimath and Pandukeshwar." },
  ],
};

export const culture = [
  {
    key: "aipan",
    title: "Aipan",
    hindi: "ऐपण",
    lede: "Kumaon's sacred floor art",
    copy: "Women in Kumaon paint thresholds, courtyards and pooja corners with white rice paste on a base of red ochre (geru). The patterns of lotuses, dots and running lines are drawn by hand for festivals, weddings and new homes.",
    points: ["Red geru base, white rice paste", "Drawn with the fingertips", "Each ritual has its own pattern"],
  },
  {
    key: "thali",
    title: "Pahari thali",
    hindi: "पहाड़ी थाली",
    lede: "Food of the hills",
    copy: "Hill cooking is simple and warming, built on millets and lentils grown on terraced fields. Look for kafuli, bhatt ki churkani, aloo ke gutke, mandua roti and jhangora kheer, and take home bal mithai from Almora.",
    points: ["Kafuli and mandua roti", "Bhatt ki churkani", "Bal mithai and singori"],
  },
  {
    key: "song",
    title: "Song & dance",
    hindi: "लोक नृत्य",
    lede: "Drums of the villages",
    copy: "Dhol and damau drums lead village life. Jagar rituals call local deities through song, Chholiya dancers duel with swords and shields at Kumaoni weddings, and Garhwal performs the Pandav Nritya in winter.",
    points: ["Jagar devotional songs", "Chholiya sword dance", "Pandav Nritya"],
  },
] as const;

export const packingList = [
  "Yatra registration and photo ID",
  "Warm layers, even in May",
  "Rain jacket and pack cover",
  "Broken-in walking shoes",
  "Woollen cap and gloves",
  "Personal medicines",
  "Sunscreen and sunglasses",
  "Some cash for the high route",
  "Refillable water bottle",
  "A small torch",
] as const;

export const prepTips = [
  { title: "Climb slowly", copy: "Spend a night at Guptkashi or Joshimath before the high shrines. Drink water and skip alcohol." },
  { title: "Start early", copy: "Hill roads are best between dawn and early afternoon. Avoid driving after dark." },
  { title: "Respect the shrines", copy: "Dress modestly, follow the queue and temple rules, and don't photograph inside the sanctum." },
  { title: "Avoid peak monsoon", copy: "July and August bring landslides on the yatra roads. May, June, September and October are steadier." },
  { title: "Carry nothing extra", copy: "Bring back every wrapper and bottle. The rivers here are the Ganga and the Yamuna." },
] as const;

export const pillars = [
  { title: "Rooted in the hills", copy: `Our guides, cooks and drivers come from Garhwal and Kumaon, and know the shrines, the roads and the weather.` },
  { title: "Safety on every route", copy: "Oxygen and first-aid on high routes, daily health checks, and leaders with the final say on weather." },
  { title: "One honest price", copy: "Stays, meals, permits, guides and safety gear are in the price. No surprises at the base camp." },
  { title: "Small groups", copy: "Personally led batches, so elders, families and first-timers walk at their own pace." },
] as const;

// Sample testimonials for layout. Replace with verified reviews before going live.
export const testimonials = [
  { name: "Lakshmi & Raghavan", place: "Chennai", trip: "Char Dham Yatra", quote: "We are in our sixties and were nervous about Kedarnath. The team planned the helicopter dates, waited with us in the rain and got us darshan without rushing." },
  { name: "Harpreet K.", place: "Ludhiana", trip: "Hemkund Sahib & Valley of Flowers", quote: "Hemkund at sunrise and the valley full of flowers the next day. Our guide grew up in Govindghat and knew every turn of the path." },
  { name: "Aditya P.", place: "Indore", trip: "Tungnath & Chandrashila", quote: "My first trek. Tungnath at dawn, the bells ringing in the cold, and then the summit. The pace was gentle and the food was home-style." },
  { name: "Sunita D.", place: "Kolkata", trip: "Gaumukh & Tapovan", quote: "Standing at Gaumukh where the Ganga begins was the most moving moment of my life. Everything was arranged, including the permits." },
] as const;

export const faqs = [
  {
    q: "When is the Char Dham Yatra 2026 open?",
    a: "Gangotri and Yamunotri usually open on Akshaya Tritiya in April or May. Kedarnath's date is announced on Mahashivratri and Badrinath's on Basant Panchami, and both normally open in late April or May. The shrines close for winter between October and November. The temple committees confirm the exact dates every year.",
  },
  {
    q: "How many days do I need for the Char Dham Yatra?",
    a: "Most travellers take 10 to 12 days by road from Haridwar or Dehradun to visit all four dhams. A Do Dham yatra to Kedarnath and Badrinath takes about 5 to 6 days. Add a buffer day for weather or road closures.",
  },
  {
    q: "Is registration mandatory for the Char Dham Yatra?",
    a: "Yes. Every pilgrim must register on the Uttarakhand government's official yatra registration portal or app before travelling. It is free. We register everyone in our groups and carry printed copies.",
  },
  {
    q: "How do I book a Kedarnath helicopter safely?",
    a: "Kedarnath helicopter tickets are sold only on the official IRCTC HeliYatra website. Do not pay agents or social media pages that claim to sell tickets. Flights depend on weather, so keep a day free in case they are delayed.",
  },
  {
    q: "Can elderly parents do the yatra?",
    a: "Yes, with planning. Gangotri and Badrinath are reachable by road. For Kedarnath and Yamunotri there are ponies, palkis and, for Kedarnath, helicopters. We recommend a medical check-up before travel and an easy pace with rest days.",
  },
  {
    q: "Which pilgrimage trek is good for beginners?",
    a: "Tungnath and Chandrashila from Chopta is the easiest, at 3 nights. The Valley of Flowers with Hemkund Sahib suits fit beginners in the monsoon. Gaumukh and Tapovan or Kedartal need good fitness and some trekking experience.",
  },
  {
    q: "What is included in your trek price?",
    a: "Stays in guesthouses and tents, vegetarian meals on the trek, forest permits, certified trek leaders and guides, safety gear such as oxygen and first-aid, and cooks and porters for group equipment. Transport from Dehradun is an add-on on most treks.",
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

/** Simple pace buckets used by the filters */
export const paceOf = (g: Grade) => (g === "Easy" || g === "Easy–Moderate" ? "gentle" : g === "Moderate" ? "steady" : "challenging");
export type Pace = ReturnType<typeof paceOf>;
