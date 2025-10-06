import { NavLink, PortfolioProject, ServiceCategory, DeveloperPortfolioProject, SocialLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: { en: 'About', km: 'អំពីខ្ញុំ' }, href: '#about' },
  { name: { en: 'Portfolio Design', km: 'គម្រោង​រចនា' }, href: '#portfolio' },
  { name: { en: 'Dev Portfolio', km: 'គម្រោង​កូដ' }, href: '#dev-portfolio' },
  { name: { en: 'Services', km: 'សេវាកម្ម' }, href: '#services' },
  { name: { en: 'Contact', km: 'ទំនាក់ទំនង' }, href: '#contact' },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    title: { en: '"Kampuchea Coffee" Branding', km: 'ការរចនាម៉ាកយីហោ "កាហ្វេ​កម្ពុជា"' },
    imageUrl: 'https://picsum.photos/seed/kampuchea/800/600',
    description: { 
      en: "A complete branding design for 'Kampuchea Coffee,' a new coffee shop in Phnom Penh. The project included logo design, color palette, typography selection, and packaging design. The goal was to create a modern, fresh look that represents the local coffee culture.",
      km: "ការរចនាម៉ាកយីហោពេញលេញសម្រាប់ 'កាហ្វេ​កម្ពុជា' ដែលជាហាងកាហ្វេថ្មីមួយនៅភ្នំពេញ។ គម្រោងនេះរួមមានការរចនាស្លាកសញ្ញា ក្ដារលាយពណ៌ ការជ្រើសរើសពុម្ពអក្សរ និងការរចនាសម្រាប់ការវេចខ្ចប់។ គោលបំណងគឺបង្កើតរូបរាងដែលទំនើប ស្រស់ស្រាយ និងតំណាងឱ្យវប្បធម៌កាហ្វេក្នុងស្រុក។"
    },
    tools: ['illustrator', 'photoshop'],
    categories: ['Logo Design'],
  },
  {
    id: 2,
    title: { en: '"Khmer Crafts" Website Design', km: 'ការរចនាគេហទំព័រសម្រាប់ "សិប្បកម្មខ្មែរ"' },
    imageUrl: 'https://picsum.photos/seed/khmercrafts/800/600',
    description: {
      en: "Redesigning the website for 'Khmer Crafts,' a non-profit organization supporting local artisans. The new site focuses on beautifully showcasing products, telling the artisans' stories, and simplifying the online shopping process.",
      km: "រចនាឡើងវិញនូវគេហទំព័រសម្រាប់ 'សិប្បកម្មខ្មែរ' ដែលជាអង្គការមិនរកប្រាក់ចំណេញគាំទ្រសិប្បករក្នុងស្រុក។ គេហទំព័រថ្មីនេះเน้นលើការបង្ហាញផលិតផលយ៉ាងស្រស់ស្អាត រឿងរ៉ាវរបស់សិប្បករ និងធ្វើឱ្យដំណើរការទិញទំនិញតាមអ៊ីនធឺណិតមានភាពងាយស្រួល។"
    },
    tools: ['figma', 'photoshop'],
    categories: ['UI/UX'],
  },
  {
    id: 3,
    title: { en: '"Community Tourism" Campaign', km: 'យុទ្ធនាការផ្សព្វផ្សាយ "ទេសចរណ៍​សហគមន៍"' },
    imageUrl: 'https://picsum.photos/seed/tourism/800/600',
    description: {
      en: "Created a complete promotional campaign for the 'Community Tourism' project. This included designing posters, brochures, and digital promotional materials for social media. The campaign aimed to promote lesser-known tourist areas in Cambodia.",
      km: "បង្កើតយុទ្ធនាការផ្សព្វផ្សាយពេញលេញសម្រាប់គម្រោង 'ទេសចរណ៍​សហគមន៍'។ នេះរួមបញ្ចូលទាំងការរចនាប៉ូស្ទ័រ ខិត្តប័ណ្ណ និងសម្ភារៈផ្សព្វផ្សាយឌីជីថលសម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយសង្គម។ យុទ្ធនាការនេះមានគោលបំណងលើកកម្ពស់តំបន់ទេសចរណ៍ដែលមិនសូវមានគេស្គាល់នៅក្នុងប្រទេសកម្ពជា។"
    },
    tools: ['illustrator', 'photoshop', 'indesign'],
    categories: ['Social Media', 'Banners'],
  },
  {
    id: 4,
    title: { en: '"Learn Khmer" Mobile App Design', km: 'ការរចនា​កម្មវិធី​ទូរស័ព្ទ "រៀនភាសាខ្មែរ"' },
    imageUrl: 'https://picsum.photos/seed/learnkhmer/800/600',
    description: {
      en: "UI/UX design for the 'Learn Khmer' mobile app, which helps users learn the Khmer language through lessons and games. The design focuses on ease of use and making learning enjoyable.",
      km: "ការរចនា UI/UX សម្រាប់កម្មវិធីទូរស័ព្ទ 'រៀនភាសាខ្មែរ' ដែលជួយអ្នកប្រើប្រាស់រៀនភាសាខ្មែរតាមរយៈមេរៀន និងល្បែងកម្សាន្ត។ ការរចនានេះផ្តោតលើភាពងាយស្រួលប្រើប្រាស់ និងធ្វើឱ្យការរៀនសូត្រមានភាពរីករាយ។"
    },
    tools: ['figma', 'illustrator'],
    categories: ['UI/UX'],
  },
];

export const DEVELOPER_PORTFOLIO_PROJECTS: DeveloperPortfolioProject[] = [
  {
    id: 1,
    title: { en: "Interactive Portfolio Website", km: "គេហទំព័រ Portfolio អន្តរកម្ម" },
    imageUrl: "https://picsum.photos/seed/dev-portfolio/800/600",
    description: { 
      en: "A personal portfolio website built with React and Tailwind CSS, featuring dynamic content management, multilingual support, and smooth animations. The admin dashboard allows for easy updates.",
      km: "គេហទំព័រ portfolio ផ្ទាល់ខ្លួនដែលបង្កើតឡើងដោយ React និង Tailwind CSS ដែលមានការគ្រប់គ្រងเนื้อหาថាមវន្ត ការគាំទ្រពហុភាសា និងចលនារលូន។ ផ្ទាំងគ្រប់គ្រងរដ្ឋបាលអនុញ្ញាតឱ្យមានការអាប់ដេតងាយស្រួល។"
    },
    techStack: ["react", "typescript", "tailwindcss", "html5", "css3"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 2,
    title: { en: "E-commerce UI Concept", km: "គំនិត UI សម្រាប់ E-commerce" },
    imageUrl: "https://picsum.photos/seed/ecommerce-ui/800/600",
    description: { 
      en: "A modern and clean user interface concept for an e-commerce platform. Focused on user experience with intuitive navigation, clear product displays, and a streamlined checkout process.",
      km: "គំនិតចំណុចប្រទាក់អ្នកប្រើដ៏ទំនើបនិងស្អាតសម្រាប់វេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិក។ ផ្តោតលើបទពិសោធន៍អ្នកប្រើប្រាស់ជាមួយនឹងការរុករកដោយវិចារណញាណ ការបង្ហាញផលិតផលច្បាស់លាស់ និងដំណើរការទូទាត់ប្រាក់ដែលបានសម្រួល។"
    },
    techStack: ["figma", "illustrator"],
    liveUrl: "#",
    sourceUrl: "#",
  },
];


export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    category: { en: 'Logo Design', km: 'ការរចនាស្លាកសញ្ញា' },
    items: [
      { name: { en: 'Basic Logo', km: 'ស្លាកសញ្ញាមូលដ្ឋាន' }, price: '$30 – $50' },
      { name: { en: 'Professional Logo Package', km: 'កញ្ចប់ស្លាកសញ្ញាអាជីព' }, description: { en: '3 concepts, revisions', km: '3 គំនិត, ការកែសម្រួល' }, price: '$70 – $120' },
      { name: { en: 'Premium Brand Identity', km: 'អត្តសញ្ញាណម៉ាកយីហោពិសេស' }, description: { en: 'Logo + color palette + typography', km: 'ស្លាកសញ្ញា + ក្ដារលាយពណ៌ + ពុម្ពអក្សរ' }, price: '$150 – $300' },
    ],
  },
  {
    category: { en: 'Social Media Design', km: 'ការរចនាសម្រាប់ប្រព័ន្ធផ្សព្វផ្សាយសង្គម' },
    items: [
      { name: { en: 'Single Post/Story', km: 'ការបង្ហោះ/ស្តอรี่តែមួយ' }, price: '$10 – $20' },
      { name: { en: 'Package of 5 Posts', km: 'កញ្ចប់ 5 ការបង្ហោះ' }, price: '$40 – $70' },
      { name: { en: 'Monthly Package', km: 'កញ្ចប់ប្រចាំខែ' }, description: { en: '15–20 posts', km: '15–20 ការបង្ហោះ' }, price: '$120 – $250' },
    ],
  },
  {
    category: { en: 'Banners / Posters / Flyers', km: 'បដា / ប៉ូស្ទ័រ / ខិត្តប័ណ្ណ' },
    items: [
      { name: { en: 'Simple Poster/Flyer', km: 'ប៉ូស្ទ័រ/ខិត្តប័ណ្ណធម្មតា' }, price: '$25 – $50' },
      { name: { en: 'Advanced Design', km: 'ការរចនាកម្រិតខ្ពស់' }, description: { en: 'Illustrations, multiple revisions', km: 'រូបភាព, ការកែសម្រួលច្រើនដង' }, price: '$70 – $120' },
      { name: { en: 'Event Package', km: 'កញ្ចប់កម្មវិធី' }, description: { en: 'Poster + tickets + social media banner', km: 'ប៉ូស្ទ័រ + សំបុត្រ + បដាប្រព័ន្ធផ្សព្វផ្សាយសង្គម' }, price: '$100 – $180' },
    ],
  },
  {
    category: { en: 'Additional Services', km: 'សេវាកម្មបន្ថែម' },
    items: [
      { name: { en: 'Rush Delivery (24 hours)', km: 'ការដឹកជញ្ជូនបន្ទាន់ (24 ម៉ោង)' }, price: '+30% of project cost' },
      { name: { en: 'Source Files (PSD/AI)', km: 'ឯកសារដើម (PSD/AI)' }, price: '+$10 – $30' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Telegram',
    url: 'https://t.me/your-username',
    icon: 'fa-brands fa-telegram',
    isActive: true,
  },
  {
    platform: 'Behance',
    url: 'https://behance.net/your-username',
    icon: 'fa-brands fa-behance',
    isActive: true,
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/your-username',
    icon: 'fa-brands fa-github',
    isActive: true,
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/your-username',
    icon: 'fa-brands fa-instagram',
    isActive: false,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/your-username',
    icon: 'fa-brands fa-linkedin',
    isActive: false,
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/your-username',
    icon: 'fa-brands fa-facebook',
    isActive: false,
  },
];