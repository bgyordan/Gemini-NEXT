export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: 'events' | 'therapy' | 'crafts' | 'facilities';
  categoryLabel: string;
  eventDate?: string;
  description: string;
  tags: string[];
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  photoCount: number;
  category: 'events' | 'therapy' | 'crafts' | 'facilities';
  description: string;
}

// Current uploaded authentic files and prepared placeholders for user's event photos
export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'pink-shirt-day',
    title: 'Ден на розовата фланелка и добротата',
    date: 'Февруари 2026',
    coverImage: '/hero2.jpg',
    photoCount: 6,
    category: 'events',
    description: 'Традиционен празник на съпричастността и добротата, отбелязан с общо табло от ръчно изработени сърца и усмивки.',
  },
  {
    id: 'textile-tree-workshop',
    title: 'Творческо ателие: Дърво на живота и текстил',
    date: 'Януари 2026',
    coverImage: '/hero1.jpg',
    photoCount: 8,
    category: 'crafts',
    description: 'Изработка на голямо пано от текстилни материали и прежда от учениците в часовете по приложно изкуство.',
  },
  {
    id: 'classroom-learning',
    title: 'Обучение и интерактивни уроци в класната стая',
    date: 'Учебна 2025/2026',
    coverImage: '/hero3.jpg',
    photoCount: 10,
    category: 'facilities',
    description: 'Моменти от обучителния процес, индивидуалната работа с ресурсни учители и съвременните нагледни материали.',
  },
  {
    id: 'culinary-mastery',
    title: 'Кулинарна работилница: Сладкарство и готварство',
    date: 'Есен 2025',
    coverImage: '/hero.jpg',
    photoCount: 8,
    category: 'crafts',
    description: 'Учениците от професионалните паралелки приготвят здравословни печива и сладкиши в новия кухненски кабинет.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'p-1',
    src: '/hero2.jpg',
    title: 'Ден на розовата фланелка – Табло на приятелството',
    category: 'events',
    categoryLabel: 'Събития и празници',
    eventDate: 'Февруари 2026',
    description: 'Общо табло с послания за доброта, приятелство и взаимно уважение, създадено от децата и учителите в ЦСОП – Варна.',
    tags: ['Събития', 'Доброта', 'Училищен живот', 'Тържества'],
  },
  {
    id: 'p-2',
    src: '/hero1.jpg',
    title: 'Текстилно пано „Дърво на живота“',
    category: 'crafts',
    categoryLabel: 'Творчество и приложни изкуства',
    eventDate: 'Януари 2026',
    description: 'Ръчно изработено пано с естествени текстилни влакна в ателието по приложно изкуство и арт терапия.',
    tags: ['Ателие', 'Арт терапия', 'Творчество', 'Сръчност'],
  },
  {
    id: 'p-3',
    src: '/hero3.jpg',
    title: 'Интерактивно обучение в класната стая',
    category: 'facilities',
    categoryLabel: 'Обучение и база',
    eventDate: 'Учебна 2025/2026',
    description: 'Обучителен час с адаптирани учебни материали и индивидуално отношение към всяко дете.',
    tags: ['Клас', 'Обучение', 'Учебен процес', 'Педагози'],
  },
  {
    id: 'p-4',
    src: '/hero.jpg',
    title: 'Практически кулинарен урок и сладкарство',
    category: 'crafts',
    categoryLabel: 'Професионално обучение',
    eventDate: 'Ноември 2025',
    description: 'Учениците усвояват техники за месене, оформяне и изпичане в оборудвания кулинарен кабинет.',
    tags: ['Кулинария', 'Професия', 'Практика', 'Готварство'],
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'Всички снимки' },
  { id: 'events', label: 'Събития и празници' },
  { id: 'crafts', label: 'Творчество и ателиета' },
  { id: 'facilities', label: 'База и класни стаи' },
];
