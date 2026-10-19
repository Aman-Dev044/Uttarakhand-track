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
  /** One-line description used in the trek index and in structured data */
  note: string;
  /** 1–12, months the trail is in good condition */
  months: number[];
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
    note: "Pine forest, a frozen Juda ka Talab and a summit sunrise that takes in Swargarohini and Bandarpunch.",
    months: [12, 1, 2, 3, 4],
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
    note: "A UNESCO-listed valley that blooms with hundreds of species each monsoon, paired with the climb to Hemkund Sahib.",
    months: [7, 8, 9],
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
    note: "The mystery lake under Trishul, reached across Ali and Bedni Bugyal and the narrow ridge of Junargali.",
    months: [5, 6, 9, 10],
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
    note: "Lord Curzon's old route, where Nanda Devi, Dronagiri and Kamet stand in a single line across the sky.",
    months: [1, 2, 3, 4, 10, 11, 12],
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
    note: "A hanging valley below Swargarohini, walked through the carved wooden villages of Osla and Seema.",
    months: [4, 5, 6, 9, 10, 11, 12],
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
    note: "The highest Shiva temple in the world, then a short, steep push to a summit facing Chaukhamba.",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
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
    note: "Snowbound lakes and long ridge walks with Trishul and Nanda Ghunti for company, best in deep winter.",
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
    note: "Rolling high pastures above Raithal village, soft underfoot in autumn and deep in snow by January.",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
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
    note: "Two vast meadows joined into one walk, with all of Roopkund's views and a fraction of its crowds.",
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
    note: "A steep gorge and boulder fields lead to a still lake beneath Thalay Sagar. For trekkers with altitude behind them.",
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
    note: "Walk to the snout of the Gangotri glacier, the source of the Ganga, and camp on a meadow under Shivling.",
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
    note: "The highest crossing we run: from the Tons valley past Ruinsara Tal and over to Yamunotri.",
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
    note: "Cross from the green Kullu side to the bare cold desert of Lahaul in a single day, with Chandratal to finish.",
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
    note: "Old-growth forest, the Dunda meadows and a rope-assisted slide down the snow wall below the pass.",
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
    note: "A week of turquoise alpine lakes strung together by high passes and meadows full of flowers.",
    months: [7, 8, 9],
  },
];

export const trekBySlug = (slug: string) => treks.find((t) => t.slug === slug)!;

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

/** The five treks told as chapters in the sticky scrollytelling section */
export const signature = [
  {
    slug: "kedarkantha",
    kicker: "Winter · December to April",
    title: "Your first summit, in snow.",
    copy: "Four nights through oak and pine to a peak you can see from your first camp. The final climb starts by headtorch and ends with Swargarohini turning pink at dawn.",
  },
  {
    slug: "valley-of-flowers",
    kicker: "Monsoon · July to September",
    title: "A valley that blooms on schedule.",
    copy: "When the rest of the Himalaya hides in cloud, this glacial valley in Chamoli turns into a field of blue poppies, cobra lilies and primulas. Hemkund Sahib waits above it.",
  },
  {
    slug: "kuari-pass",
    kicker: "Autumn & winter · October to April",
    title: "The widest view in Garhwal.",
    copy: "Short days, easy gradients and one moment on the pass when Nanda Devi, Dronagiri and Kamet line up in front of you. The best first look at the big peaks.",
  },
  {
    slug: "roopkund",
    kicker: "Summer & autumn · May, June, September, October",
    title: "Seven nights to a legend.",
    copy: "Ali and Bedni Bugyal, the stone shrine at Patar Nachauni and the ridge of Junargali. A real expedition, paced so that your body arrives as ready as your head.",
  },
  {
    slug: "har-ki-dun",
    kicker: "Spring & autumn · April to December",
    title: "Villages older than the trail.",
    copy: "Walk through Osla and Seema, where houses are carved from deodar and the valley ends at the foot of Swargarohini. Gentle, long and deeply quiet.",
  },
] as const;

export const seasons = [
  {
    key: "winter",
    name: "Winter",
    span: "Dec – Feb",
    months: [12, 1, 2],
    image: "/images/kedarkantha.jpg",
    alt: "Snow-covered Kedarkantha peak above a forest of red-leaved trees",
    copy: "Clear, cold skies and snow down to 9,000 ft. Summit treks are short, campsites are white and the light is sharp.",
  },
  {
    key: "spring",
    name: "Spring",
    span: "Mar – May",
    months: [3, 4, 5],
    image: "/images/chopta.jpg",
    alt: "A tent in the meadow at Chopta with pines and Himalayan peaks behind",
    copy: "Rhododendron forests go red, the snow line climbs and the higher meadows open up for the first time in months.",
  },
  {
    key: "monsoon",
    name: "Monsoon",
    span: "Jun – Aug",
    months: [6, 7, 8],
    image: "/images/valley-of-flowers.jpg",
    alt: "Wildflowers covering the floor of the Valley of Flowers between steep green slopes",
    copy: "Rain on the lower roads and flowers up high. This is the season for the Valley of Flowers and the rain-shadow crossings into Lahaul and Kashmir.",
  },
  {
    key: "autumn",
    name: "Autumn",
    span: "Sep – Nov",
    months: [9, 10, 11],
    image: "/images/kuari-pass.jpg",
    alt: "Sheep grazing on golden meadows at Kuari Pass with a range of snow peaks behind",
    copy: "Washed-clean air after the rains, golden grass and the longest views of the year. The best window for high passes.",
  },
] as const;

export const stats = [
  { value: 15, suffix: "", label: "Treks on our signature list" },
  { value: 16200, suffix: " ft", label: "Highest pass on our list" },
  { value: 5000, suffix: "+", label: "Trekkers on the trail each year" },
  { value: 2018, suffix: "", label: "Leading treks from Dehradun since" },
] as const;

export const adventures = [
  {
    key: "rafting",
    title: "Rafting the Ganga",
    place: "Rishikesh",
    image: "/images/rishikesh.jpg",
    alt: "A raft and swimmers on the Ganga near Rishikesh",
    copy: "Grade II to IV rapids between Shivpuri and Rishikesh, with names like Roller Coaster and Golf Course.",
    when: "Sep – Jun",
  },
  {
    key: "skiing",
    title: "Skiing at Auli",
    place: "Chamoli",
    image: "/images/auli.jpg",
    alt: "A small hut on deep snow slopes at Auli",
    copy: "Oak-fringed slopes facing Nanda Devi, a ropeway up from Joshimath and beginner courses all winter.",
    when: "Jan – Mar",
  },
  {
    key: "wildlife",
    title: "Safari in Corbett",
    place: "Jim Corbett National Park",
    image: "/images/corbett.jpg",
    alt: "Morning mist over the grasslands of Corbett Tiger Reserve",
    copy: "India's oldest national park, founded in 1936. Jeep safaris through sal forest and the Dhikala grasslands.",
    when: "Nov – Jun",
  },
  {
    key: "camping",
    title: "Camping in the valleys",
    place: "Chopta & the Ganga",
    image: "/images/camp.jpg",
    alt: "A broad green valley with a river and snow peaks, used for camping",
    copy: "Meadow camps near Chopta and riverside camps above Rishikesh, with clear skies and a fire at night.",
    when: "Year-round",
  },
] as const;

export const dhams = [
  {
    name: "Yamunotri",
    deity: "Goddess Yamuna",
    district: "Uttarkashi",
    altitudeM: 3293,
    access: "6 km walk from Janki Chatti",
    copy: "The yatra begins at the source of the Yamuna, where pilgrims cook rice in the Surya Kund hot spring.",
    image: "/images/yamunotri.jpg",
  },
  {
    name: "Gangotri",
    deity: "Goddess Ganga",
    district: "Uttarkashi",
    altitudeM: 3100,
    access: "Motorable, beyond Uttarkashi",
    copy: "The Ganga flows here as the Bhagirathi. Its glacier source at Gaumukh is a 19 km walk upstream.",
    image: "/images/gangotri.jpg",
  },
  {
    name: "Kedarnath",
    deity: "Lord Shiva",
    district: "Rudraprayag",
    altitudeM: 3583,
    access: "16 km walk from Gaurikund, or helicopter",
    copy: "A stone Jyotirlinga temple against the Kedarnath massif, and the most demanding leg of the journey.",
    image: "/images/kedarnath.jpg",
  },
  {
    name: "Badrinath",
    deity: "Lord Vishnu",
    district: "Chamoli",
    altitudeM: 3133,
    access: "Motorable via Joshimath",
    copy: "The painted temple on the Alaknanda, between the Nar and Narayan ranges, close to Mana village.",
    image: "/images/badrinath.jpg",
  },
] as const;

export const destinations = [
  { name: "Rishikesh", region: "Garhwal", note: "Yoga, rafting and the evening aarti", image: "/images/rishikesh.jpg", alt: "The Ganga at Rishikesh" },
  { name: "Haridwar", region: "Garhwal", note: "Lamps on the river at Har Ki Pauri", image: "/images/haridwar.jpg", alt: "Fire lamps raised during the Ganga aarti at Haridwar" },
  { name: "Mussoorie", region: "Garhwal", note: "Deodar ridges above the Doon valley", image: "/images/mussoorie.jpg", alt: "Tall deodar trees on a ridge at Mussoorie" },
  { name: "Auli", region: "Garhwal", note: "Snow slopes facing Nanda Devi", image: "/images/auli.jpg", alt: "Snow slopes at Auli" },
  { name: "Chopta", region: "Garhwal", note: "Meadows below Tungnath", image: "/images/chopta.jpg", alt: "A tent in the meadow at Chopta" },
  { name: "Tehri", region: "Garhwal", note: "A mountain lake for water sports", image: "/images/tehri.jpg", alt: "Tehri Lake surrounded by green hills" },
  { name: "Nainital", region: "Kumaon", note: "Boats on Naini Lake", image: "/images/nainital.jpg", alt: "Rowing boats moored on Naini Lake" },
  { name: "Kausani", region: "Kumaon", note: "Sunrise over Trishul and Nanda Devi", image: "/images/kausani.jpg", alt: "A sea of cloud below the Himalayan range at Kausani" },
  { name: "Binsar", region: "Kumaon", note: "A forest sanctuary with a 300 km skyline", image: "/images/binsar.jpg", alt: "Snow peaks above a sea of cloud seen from Binsar" },
  { name: "Ranikhet", region: "Kumaon", note: "Orchards, pine and a wide panorama", image: "/images/hero-2.jpg", alt: "Layered green hills below a long line of snow peaks" },
  { name: "Jim Corbett", region: "Kumaon", note: "Tigers, elephants and sal forest", image: "/images/corbett.jpg", alt: "Mist over the Corbett grasslands" },
] as const;

export const pillars = [
  {
    title: "Paced for the altitude",
    copy: "Itineraries gain height gradually above 10,000 ft, with acclimatisation walks built in rather than bolted on.",
  },
  {
    title: "Checked twice a day",
    copy: "Leaders record oxygen saturation and pulse every morning and evening, and act on the trend, not the mood.",
  },
  {
    title: "Small groups, local crews",
    copy: "Guides, cooks and porters from the valleys we walk, so the money and the knowledge stay in the mountains.",
  },
  {
    title: "One desk in Dehradun",
    copy: "An operations team tracks every batch, handles weather changes and answers your call before and after the trek.",
  },
] as const;

// Sample reviews for layout only. Replace with verified reviews before going live.
export const reviews = [
  { name: "Meera K.", city: "Mumbai", trek: "Kedarkantha", quote: "I had never seen snow before this trek. By the summit morning I was the one telling the group to keep going." },
  { name: "Aditya P.", city: "Jaipur", trek: "Roopkund", quote: "Every evening the leader went tent to tent with the oximeter. That quiet attention is why I'd book with them again." },
  { name: "Farah & Imran", city: "Lucknow", trek: "Valley of Flowers", quote: "The rain stopped the moment we walked into the valley. Our guide knew the name of every flower we pointed at." },
  { name: "Sanjay R.", city: "Chennai", trek: "Char Dham Yatra", quote: "A road block near Joshimath cost us a day, and they had a new plan for my parents before we had even asked." },
] as const;

export const faqs = [
  {
    q: "Which Uttarakhand trek is best for beginners?",
    a: "Kedarkantha in winter, Chopta–Tungnath–Chandrashila for most of the year, and Dayara Bugyal are the gentlest good first treks. Each has a gradual climb, a clear trail and a summit or meadow around 12,000 ft with big Himalayan views and no technical sections.",
  },
  {
    q: "What is the best month to trek in Uttarakhand?",
    a: "It depends on what you want to see. December to March is for snow treks such as Kedarkantha and Brahmatal, April and May for rhododendron forests and opening meadows, July and August for the Valley of Flowers, and September to November for the clearest views and the high passes.",
  },
  {
    q: "How fit do I need to be?",
    a: "For easy and moderate treks, aim to jog 5 km in under 35 minutes four to six weeks before you leave. Difficult routes such as Kedartal and Bali Pass need earlier high-altitude experience. Every booking includes a free training plan.",
  },
  {
    q: "What does the trek price include?",
    a: "Stays in guesthouses and tents, vegetarian meals on the trek, forest permits and entry fees, certified trek leaders and local guides, safety gear such as oxygen, a first-aid kit and microspikes, and cooks and porters for common equipment. Transport from Dehradun is an add-on on most treks.",
  },
  {
    q: "When is the Char Dham Yatra open?",
    a: "The four temples usually open in late April or May around Akshaya Tritiya and close in October or November around Diwali and Bhai Dooj. The temple committees announce the exact dates each year, and pilgrims must register with the state government before travelling.",
  },
  {
    q: "Is it safe to trek solo, including for women?",
    a: "Yes. Many of our trekkers travel alone and a large share are women. Tents are shared only with trekkers of the same gender, batches have women leaders where possible, and the Dehradun operations desk tracks every group.",
  },
] as const;
