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
    blurb: "The mystery lake beneath Trishul, reached over Ali and Bedni bugyals and Junargali ridge.",
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
    blurb: "A UNESCO-listed valley carpeted with 500+ alpine blooms, paired with Hemkund Sahib.",
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
    blurb: "India's favourite winter summit: pine forests, Juda ka Talab and a 360° Himalayan sunrise.",
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
    blurb: "The 'Valley of Gods' cradle trek, past thousand-year-old villages of Osla and Seema.",
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
    blurb: "The highest Shiva temple on Earth, Deoria Tal reflections and a summit above the clouds.",
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
    blurb: "Lord Curzon's trail, with Nanda Devi, Dronagiri and Kamet lined up across the horizon.",
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
    blurb: "Frozen alpine lakes and ridge walks facing Trishul and Nanda Ghunti, best in deep winter.",
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
    blurb: "Rolling high meadows, home to the Butter Holi festival of Andhudi each August.",
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
    blurb: "Asia's largest high-altitude meadows, minus the crowds, with Trishul for company.",
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
    blurb: "Shiva's lake at the foot of Thalay Sagar: steep gorges, boulder fields and raw wilderness.",
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
    blurb: "Walk to the snout of the Gangotri glacier, source of the Ganga, and camp under Shivling.",
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
    blurb: "A high crossing from the Tons valley to Yamunotri over Ruinsara Tal and Bandarpunch.",
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
    blurb: "Green Kullu valleys flip to the stark desert of Lahaul, with a detour to Chandratal.",
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
    blurb: "Dense forests, Dunda meadows and a thrilling snow rappel down the pass.",
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
    blurb: "Seven turquoise alpine lakes, flowering meadows and the most photogenic week in India.",
    months: [7, 8, 9],
  },
];

export const experiences = [
  {
    key: "adventure",
    title: "Adventure",
    hindi: "साहसिक",
    copy: "White-water rafting on the Ganga, skiing at Auli, paragliding over Bhimtal and 150+ high-altitude trails.",
    image: "/images/rishikesh.jpg",
    tags: ["Rafting", "Skiing", "Treks", "Expeditions"],
  },
  {
    key: "spiritual",
    title: "Spiritual",
    hindi: "आध्यात्मिक",
    copy: "Char Dham, Panch Kedar, Hemkund Sahib and the evening Ganga Aarti at Har Ki Pauri.",
    image: "/images/haridwar.jpg",
    tags: ["Char Dham", "Panch Kedar", "Yoga"],
  },
  {
    key: "wildlife",
    title: "Wildlife",
    hindi: "वन्यजीव",
    copy: "Track Bengal tigers in Jim Corbett, India's first national park, and Asian elephants in Rajaji.",
    image: "/images/corbett.jpg",
    tags: ["Corbett", "Rajaji", "Birding"],
  },
  {
    key: "nature",
    title: "Nature",
    hindi: "प्रकृति",
    copy: "Alpine bugyals, glacial lakes and the UNESCO-listed Nanda Devi & Valley of Flowers National Parks.",
    image: "/images/valley-of-flowers.jpg",
    tags: ["Bugyals", "Lakes", "UNESCO"],
  },
  {
    key: "explore",
    title: "Explore",
    hindi: "अन्वेषण",
    copy: "Offbeat Kumaoni villages, heritage homestays and cycle trails through Binsar and Kausani.",
    image: "/images/binsar.jpg",
    tags: ["Homestays", "Villages", "Cycling"],
  },
] as const;

export const dhams = [
  {
    name: "Yamunotri",
    deity: "Goddess Yamuna",
    district: "Uttarkashi",
    altitudeM: 3293,
    access: "6 km trek from Janki Chatti",
    copy: "The first dham, where pilgrims cook rice in the boiling Surya Kund hot spring as prasad.",
    image: "/images/yamunotri.jpg",
  },
  {
    name: "Gangotri",
    deity: "Goddess Ganga",
    district: "Uttarkashi",
    altitudeM: 3100,
    access: "Motorable, 100 km from Uttarkashi",
    copy: "Where the Ganga descended to Earth as the Bhagirathi. The glacier source at Gaumukh lies 19 km beyond.",
    image: "/images/gangotri.jpg",
  },
  {
    name: "Kedarnath",
    deity: "Lord Shiva",
    district: "Rudraprayag",
    altitudeM: 3583,
    access: "16 km trek from Gaurikund, or helicopter",
    copy: "One of the twelve Jyotirlingas, a stone temple standing against the Kedarnath massif.",
    image: "/images/kedarnath.jpg",
  },
  {
    name: "Badrinath",
    deity: "Lord Vishnu",
    district: "Chamoli",
    altitudeM: 3133,
    access: "Motorable via Joshimath",
    copy: "Painted temple on the Alaknanda between the Nar and Narayan ranges, near Mana, the last village.",
    image: "/images/badrinath.jpg",
  },
] as const;

export const destinations = {
  Garhwal: [
    { name: "Rishikesh", note: "Yoga capital of the world", image: "/images/rishikesh.jpg" },
    { name: "Haridwar", note: "Gateway to the Gods", image: "/images/haridwar.jpg" },
    { name: "Mussoorie", note: "Queen of the Hills", image: "/images/mussoorie.jpg" },
    { name: "Auli", note: "Skiing paradise of Garhwal", image: "/images/auli.jpg" },
    { name: "Chopta", note: "Meadows of mini-Switzerland", image: "/images/chopta.jpg" },
    { name: "Tehri Lake", note: "Water sports on a Himalayan reservoir", image: "/images/tehri.jpg" },
  ],
  Kumaon: [
    { name: "Nainital", note: "Legends of the lake district", image: "/images/nainital.jpg" },
    { name: "Jim Corbett", note: "India's first national park, 1936", image: "/images/corbett.jpg" },
    { name: "Kausani", note: "Switzerland of India", image: "/images/kausani.jpg" },
    { name: "Binsar", note: "300 km of Himalayan skyline", image: "/images/binsar.jpg" },
    { name: "Ranikhet", note: "Orchards and the Nanda Devi panorama", image: "/images/hero-2.jpg" },
  ],
} as const;

export const festivals = [
  {
    name: "Nanda Devi Raj Jat",
    when: "Once every ~12 years",
    copy: "A 280 km Himalayan pilgrimage escorting Goddess Nanda from Nauti to Homkund, led by a four-horned ram.",
    image: "/images/hero-2.jpg",
  },
  {
    name: "Kumbh at Haridwar",
    when: "Every 12 years · Ardh Kumbh every 6",
    copy: "Millions gather on the ghats of the Ganga for the holy dip, one of the largest gatherings on Earth.",
    image: "/images/kumbh.jpg",
  },
  {
    name: "Phool Dei",
    when: "Mid-March · Chaitra",
    copy: "Children greet spring by scattering rhododendron and fyonli flowers on every doorstep in the village.",
    image: "/images/valley-of-flowers.jpg",
  },
  {
    name: "Harela",
    when: "July · Monsoon",
    copy: "Kumaon's festival of greenery, when families sow seeds and plant saplings to welcome the rains.",
    image: "/images/mussoorie.jpg",
  },
] as const;

export const advantages = [
  { value: 100, suffix: "+", label: "Certified trek leaders & guides", detail: "Experienced mountain professionals, many from the Garhwali and Kumaoni villages along our routes." },
  { value: 5000, suffix: "+", label: "Trekkers every year", detail: "Small, personally led batches on every departure, from first-timers to seasoned climbers." },
  { value: 150, suffix: "+", label: "Curated treks", detail: "From weekend summits to 12-day Panch Kedar circuits and expeditions." },
  { value: 6, suffix: "+ yrs", label: "On Himalayan trails", detail: "Operating from Dehradun since 2018, across Uttarakhand, Himachal and Kashmir." },
] as const;

export const pillars = [
  { title: "Safety first, always", copy: "Daily health checks, emergency oxygen and first-aid on high-altitude batches, with turn-around calls made by experienced leaders." },
  { title: "Leave no trace", copy: "A carry-back-what-you-carry-in approach on every trail, keeping campsites and meadows clean." },
  { title: "Local by design", copy: "Guides, cooks and mule handlers from the villages you walk through, so tourism stays in the hills." },
  { title: "Transparent pricing", copy: "One clear price covering stays, meals, permits, guides and safety gear, with no surprises at base camp." },
] as const;

// Sample testimonials for layout. Replace with verified reviews before going live.
export const testimonials = [
  { name: "Ananya R.", trek: "Kedarkantha", city: "Bengaluru", quote: "Our trek leader read the weather like a book. We summited at sunrise and the hot ginger tea at the top was pure magic." },
  { name: "Rohit M.", trek: "Roopkund", city: "Pune", quote: "Safety briefings, oxygen checks and the friendliest support staff. Junargali at dawn is a memory I'll keep for life." },
  { name: "Sneha & Karan", trek: "Valley of Flowers", city: "Delhi", quote: "Perfectly organised from Rishikesh pick-up to the last day. The food at the camps was better than most restaurants." },
  { name: "Vikram S.", trek: "Char Dham Yatra", city: "Kolkata", quote: "They managed our helicopter slots for Kedarnath and rerouted us around landslide traffic. Our parents were in safe hands." },
  { name: "Meera J.", trek: "Har Ki Dun", city: "Mumbai", quote: "Walking through Osla and Seema villages with a guide who grew up there made the trek feel like a homecoming." },
  { name: "Arjun T.", trek: "Kuari Pass", city: "Hyderabad", quote: "First Himalayan trek, zero experience. The team paced us beautifully and the Nanda Devi view made every step worth it." },
] as const;

export const journal = [
  { title: "Winter treks in Uttarakhand: a month-by-month guide", tag: "Guide", date: "2026-10-02", read: 8, image: "/images/kedarkantha.jpg" },
  { title: "Five divine places to visit around Badrinath", tag: "Spiritual", date: "2026-09-18", read: 6, image: "/images/badrinath.jpg" },
  { title: "Beginner mistakes to avoid on your first Himalayan trek", tag: "Tips", date: "2026-08-27", read: 7, image: "/images/camp.jpg" },
  { title: "Playing Holi with butter at Dayara Bugyal", tag: "Culture", date: "2026-08-12", read: 5, image: "/images/dayara-bugyal.jpg" },
] as const;

export const faqs = [
  {
    q: "Which is the best trek in Uttarakhand for beginners?",
    a: "Kedarkantha (winter), Chopta–Chandrashila (almost year-round) and Dayara Bugyal are ideal first treks. They have gradual climbs, well-marked trails and summits around 12,000 ft that deliver big Himalayan views without technical sections.",
  },
  {
    q: "When is the Char Dham Yatra open?",
    a: "The four shrines usually open between late April and May, around Akshaya Tritiya, and close for winter between October and November, around Diwali and Bhai Dooj. Exact dates are announced each year by the temple committees. Avoid travelling in the peak monsoon, July to August, when landslides are common.",
  },
  {
    q: "How fit do I need to be for a Himalayan trek?",
    a: "For easy and moderate treks you should be able to jog 5 km in under 35 minutes, four to six weeks before departure. Difficult treks like Kedartal or Bali Pass need prior high-altitude experience. We share a free fitness plan with every booking.",
  },
  {
    q: "What is included in the trek price?",
    a: "Accommodation in guesthouses and tents, all vegetarian meals during the trek, forest permits and entry fees, certified trek leaders and guides, safety equipment (oxygen, first-aid, microspikes) and the services of cooks and porters for common gear. Transport from Dehradun is available as an add-on on most treks.",
  },
  {
    q: "Is it safe for solo women travellers?",
    a: "Yes. A large share of our trekkers are solo women. Batches have female trek leaders where possible, separate tent sharing, and a 24×7 operations desk in Dehradun that tracks every group.",
  },
  {
    q: "What happens if the weather turns bad?",
    a: "Our trek leaders have the final call on summit pushes. Buffer days are built into high-altitude treks, and if a trek is cut short for safety we issue a voucher for the unused days as per our cancellation policy.",
  },
] as const;

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export const seasonNotes: Record<number, string> = {
  1: "Deep snow, crisp skies: classic winter summits.",
  2: "Peak snow treks, frozen lakes on Brahmatal.",
  3: "Rhododendrons bloom as winter softens.",
  4: "Spring meadows, snow lingering above 11,000 ft.",
  5: "High passes open: Roopkund, Bali Pass, Kedartal.",
  6: "Long days and green valleys before the monsoon.",
  7: "Monsoon: flower valleys and rain-shadow treks.",
  8: "Flower season peaks; Kashmir lakes at their best.",
  9: "Post-monsoon clarity, the sharpest views of the year.",
  10: "Golden meadows and stable autumn weather.",
  11: "Cold, clear and quiet trails before the snow.",
  12: "First snowfall: winter trek season begins.",
};
