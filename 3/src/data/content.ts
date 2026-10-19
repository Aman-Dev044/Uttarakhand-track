export type Grade = "Easy" | "Easy–Moderate" | "Moderate" | "Moderate–Difficult" | "Difficult";
export type State = "Uttarakhand" | "Himachal" | "Kashmir";

export const grades: Grade[] = ["Easy", "Easy–Moderate", "Moderate", "Moderate–Difficult", "Difficult"];

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
  /** One-line field note shown on cards and in structured data */
  note: string;
  /** 1–12, months the trail is in good condition */
  months: number[];
  featured?: boolean;
};

export const treks: Trek[] = [
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
    note: "A glacial tarn below Trishul, approached over the Ali and Bedni meadows and the knife-edge of Junargali.",
    months: [5, 6, 9, 10],
    featured: true,
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
    note: "A UNESCO World Heritage valley with 500+ species in bloom, plus the climb to Hemkund Sahib.",
    months: [7, 8, 9],
    featured: true,
  },
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
    note: "The classic first snow summit: pine camps, a frozen Juda ka Talab and a 360° sunrise on top.",
    months: [12, 1, 2, 3, 4],
    featured: true,
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
    note: "A cradle-shaped valley under Swargarohini, reached through the wooden villages of Osla and Seema.",
    months: [4, 5, 6, 9, 10, 11, 12],
    featured: true,
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
    note: "Short and steep: Tungnath, the highest Shiva temple, then Chandrashila's panorama of Chaukhamba.",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
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
    note: "The Curzon Trail, with Nanda Devi, Dronagiri and Kamet lined up across one horizon.",
    months: [1, 2, 3, 4, 10, 11, 12],
    featured: true,
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
    image: "/images/brahmatal.jpg",
    note: "Frozen lakes and ridge walks facing Trishul and Nanda Ghunti; a deep-winter favourite.",
    months: [12, 1, 2, 3],
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
    note: "Wide rolling meadows above Raithal, where villagers play Holi with butter every August.",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
    featured: true,
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
    note: "Some of Asia's largest high meadows, quieter than Roopkund and facing Trishul all day.",
    months: [5, 6, 9, 10, 11],
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
    note: "A steep gorge and boulder climb to the lake beneath Thalay Sagar. For experienced trekkers.",
    months: [5, 6, 9, 10],
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
    note: "To the snout of the Gangotri glacier, where the Ganga begins, and a camp under Shivling.",
    months: [5, 6, 9, 10],
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
    note: "The highest crossing on this list: Tons valley to Yamunotri via Ruinsara Tal and Bandarpunch.",
    months: [5, 6, 9, 10],
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
    note: "A dramatic crossover from green Kullu to the cold desert of Lahaul, with Chandratal on the side.",
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
    note: "Old forests, the Dunda meadows and a snow-wall descent on ropes from the pass.",
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
    note: "Seven turquoise alpine lakes in a week, linked by passes and flowering meadows.",
    months: [7, 8, 9],
  },
];

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export const stats = [
  { value: 150, suffix: "+", label: "Curated trails" },
  { value: 16200, suffix: " ft", label: "Highest pass we lead" },
  { value: 5000, suffix: "+", label: "Trekkers a year" },
  { value: 100, suffix: "+", label: "Certified leaders" },
] as const;

export const adventures = [
  {
    key: "rafting",
    title: "White-water rafting",
    place: "Rishikesh, Ganga",
    image: "/images/rishikesh.jpg",
    alt: "Rafters on the Ganga near Ram Jhula, Rishikesh",
    copy: "Run Grade II–IV rapids like Golf Course and Roller Coaster on the stretches from Shivpuri, Marine Drive and Kaudiyala.",
    spec: "Sep – Jun",
  },
  {
    key: "skiing",
    title: "Skiing & snow sports",
    place: "Auli, Chamoli",
    image: "/images/auli.jpg",
    alt: "View over Auli from the ropeway, with a hilltop temple",
    copy: "Oak-fringed slopes facing Nanda Devi, reached by the Joshimath ropeway, with beginner courses through the winter.",
    spec: "Jan – Mar",
  },
  {
    key: "wildlife",
    title: "Tiger country",
    place: "Jim Corbett National Park",
    image: "/images/corbett.jpg",
    alt: "Morning mist over the Dhikala grasslands in Corbett Tiger Reserve",
    copy: "India's first national park, set up in 1936. Jeep safaris through Bijrani, Jhirna and the Dhikala grasslands.",
    spec: "Nov – Jun",
  },
  {
    key: "water",
    title: "Lake & water sports",
    place: "Tehri Lake",
    image: "/images/tehri.jpg",
    alt: "Tehri Lake reservoir surrounded by hills",
    copy: "Kayaking, jet-skis and floating huts on a vast Himalayan reservoir, an easy drive from Rishikesh.",
    spec: "Oct – Jun",
  },
  {
    key: "camping",
    title: "Camping under stars",
    place: "Chopta & riverside camps",
    image: "/images/camp.jpg",
    alt: "Tents at a campsite in the Himalayan foothills",
    copy: "Meadow camps at Chopta and riverside camps near Rishikesh: bonfires, clear skies and the Milky Way overhead.",
    spec: "Year-round",
  },
  {
    key: "views",
    title: "Hill-station slow days",
    place: "Kausani & Binsar, Kumaon",
    image: "/images/kausani.jpg",
    alt: "Layered hills and Himalayan skyline in Kumaon",
    copy: "A 300 km sweep of peaks from Kausani and Binsar, tea gardens, and village walks between Kumaoni homestays.",
    spec: "Oct – Jun",
  },
] as const;

export const dhams = [
  {
    name: "Yamunotri",
    deity: "Goddess Yamuna",
    district: "Uttarkashi",
    altitudeM: 3293,
    access: "6 km trek from Janki Chatti",
    copy: "The first stop. Pilgrims cook rice in the Surya Kund hot spring and carry it home as prasad.",
    image: "/images/yamunotri.jpg",
    leg: "Haridwar → Janki Chatti · ~220 km",
  },
  {
    name: "Gangotri",
    deity: "Goddess Ganga",
    district: "Uttarkashi",
    altitudeM: 3100,
    access: "Motorable, about 100 km beyond Uttarkashi",
    copy: "Here the Ganga is the Bhagirathi. Its glacier source at Gaumukh is a 19 km walk further up.",
    image: "/images/gangotri.jpg",
    leg: "Janki Chatti → Gangotri · ~230 km",
  },
  {
    name: "Kedarnath",
    deity: "Lord Shiva",
    district: "Rudraprayag",
    altitudeM: 3583,
    access: "16 km trek from Gaurikund, or helicopter",
    copy: "A Jyotirlinga of grey stone set against the Kedarnath massif, the most demanding leg of the yatra.",
    image: "/images/kedarnath.jpg",
    leg: "Gangotri → Sonprayag · ~250 km",
  },
  {
    name: "Badrinath",
    deity: "Lord Vishnu",
    district: "Chamoli",
    altitudeM: 3133,
    access: "Motorable via Joshimath",
    copy: "The painted temple on the Alaknanda between Nar and Narayan, a short drive from Mana village.",
    image: "/images/badrinath.jpg",
    leg: "Sonprayag → Badrinath · ~220 km",
  },
] as const;

export const destinations = {
  Garhwal: [
    { name: "Rishikesh", note: "Yoga, rafting and the Ganga Aarti", coords: "30.09°N 78.27°E", image: "/images/rishikesh.jpg" },
    { name: "Haridwar", note: "Evening aarti at Har Ki Pauri", coords: "29.95°N 78.16°E", image: "/images/haridwar.jpg" },
    { name: "Mussoorie", note: "Mall Road and Doon valley views", coords: "30.46°N 78.07°E", image: "/images/mussoorie.jpg" },
    { name: "Auli", note: "Ski slopes facing Nanda Devi", coords: "30.53°N 79.57°E", image: "/images/auli.jpg" },
    { name: "Chopta", note: "Meadows below Tungnath", coords: "30.48°N 79.20°E", image: "/images/chopta.jpg" },
    { name: "Tehri", note: "Water sports on a mountain lake", coords: "30.38°N 78.48°E", image: "/images/tehri.jpg" },
  ],
  Kumaon: [
    { name: "Nainital", note: "Boating on Naini Lake", coords: "29.38°N 79.46°E", image: "/images/nainital.jpg" },
    { name: "Jim Corbett", note: "Tigers, elephants and sal forest", coords: "29.53°N 78.77°E", image: "/images/corbett.jpg" },
    { name: "Kausani", note: "Sunrise over Trishul and Nanda Devi", coords: "29.84°N 79.60°E", image: "/images/kausani.jpg" },
    { name: "Binsar", note: "Wildlife sanctuary with a long skyline", coords: "29.70°N 79.75°E", image: "/images/binsar.jpg" },
    { name: "Ranikhet", note: "Orchards, golf and a Himalayan panorama", coords: "29.64°N 79.43°E", image: "/images/hero-2.jpg" },
  ],
} as const;

export const safetyRules = [
  {
    code: "01",
    title: "Climb high, sleep low",
    copy: "Above 10,000 ft our itineraries raise the sleeping altitude gradually and use acclimatisation walks to higher ground.",
  },
  {
    code: "02",
    title: "Measured twice a day",
    copy: "Leaders log oxygen saturation and pulse with an oximeter every morning and evening, and act on the trend.",
  },
  {
    code: "03",
    title: "Hydrate like it's work",
    copy: "Four to five litres a day, warm. Dehydration mimics altitude sickness and makes it worse.",
  },
  {
    code: "04",
    title: "The leader makes the call",
    copy: "Summit pushes have turn-around times. Weather or a group member's health always wins over the summit.",
  },
] as const;

export const kit = ["Pulse oximeter", "Emergency oxygen", "First-aid kit", "Microspikes & gaiters"] as const;

// Sample reviews for layout only. Replace with verified reviews before going live.
export const reviews = [
  { name: "Ananya R.", city: "Bengaluru", trek: "Kedarkantha", quote: "The summit push started at 3 a.m. under more stars than I've ever seen. The leader checked every one of us before we moved." },
  { name: "Rohit M.", city: "Pune", trek: "Roopkund", quote: "Oxygen levels logged morning and night, briefings that actually made sense, and Junargali at first light. Worth every step." },
  { name: "Sneha & Karan", city: "Delhi", trek: "Valley of Flowers", quote: "We came for the flowers and stayed for the food at camp. Pickup from Rishikesh to drop-off was flawless." },
  { name: "Vikram S.", city: "Kolkata", trek: "Char Dham Yatra", quote: "They sorted helicopter slots for Kedarnath and worked around a landslide delay. My parents never felt rushed." },
  { name: "Arjun T.", city: "Hyderabad", trek: "Kuari Pass", quote: "My first Himalayan trek. The pacing was patient and the Nanda Devi view on the pass made me want a second one." },
] as const;

export const faqs = [
  {
    q: "Which Uttarakhand trek should I pick for my first time?",
    a: "Kedarkantha in winter, Chopta–Chandrashila for most of the year, and Dayara Bugyal are the easiest good first treks. Climbs are gradual, trails are clear, and each tops out around 12,000 ft with big views and no technical sections. The trek finder on this page narrows it down by your month and fitness.",
  },
  {
    q: "How do altitude and grade compare across these treks?",
    a: "Easy and easy–moderate treks top out between about 11,800 and 14,100 ft. Moderate–difficult routes like Roopkund, Gaumukh Tapovan, Buran Ghati and Bali Pass go from 14,600 to 16,200 ft with longer days. Kedartal is graded difficult for its steep gorge and boulder sections. The compare table sorts all of them by altitude, nights and price.",
  },
  {
    q: "When does the Char Dham Yatra open and close?",
    a: "The shrines usually open in late April or May around Akshaya Tritiya and close for winter in October or November around Diwali and Bhai Dooj. The temple committees announce exact dates every year. Avoid peak monsoon in July and August, when landslides are frequent.",
  },
  {
    q: "What fitness level do I need?",
    a: "For easy and moderate treks, aim to jog 5 km in under 35 minutes about four to six weeks before you leave. Difficult treks like Kedartal or Bali Pass need previous high-altitude experience. Every booking comes with a free training plan.",
  },
  {
    q: "What does the trek price include?",
    a: "Guesthouse and tent stays, vegetarian meals on the trek, forest permits and entry fees, certified leaders and local guides, safety equipment such as oxygen, first-aid and microspikes, and cooks and porters for common gear. Transport from Dehradun is an add-on on most treks.",
  },
  {
    q: "Is it safe to trek solo, including for women?",
    a: "Yes. Many of our trekkers come solo, and a large share are women. Batches have women trek leaders where possible, tents are shared only with same-gender trekkers, and an operations desk in Dehradun keeps track of every group.",
  },
] as const;
