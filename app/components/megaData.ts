export type Sub = { label: string; desc: string; href: string; icon: string };
export type Mega = {
  label: string;
  href: string;
  feature: { title: string; text: string; cta: string; href: string; tone: 'em' | 'bl' };
  subs: Sub[];
};

export const MEGA: Mega[] = [
  {
    label: 'За нас',
    href: '/za-nas',
    feature: {
      title: 'Историята на един дом за развитие',
      text: 'Над две десетилетия подкрепа за деца със специални образователни потребности във Варна.',
      cta: 'Нашата история',
      href: '/za-nas/istoriya',
      tone: 'em',
    },
    subs: [
      { label: 'История', desc: 'Пътят на центъра през годините', href: '/za-nas/istoriya', icon: 'history' },
      { label: 'Проекти', desc: 'Инициативи и програми', href: '/za-nas/proekti', icon: 'bulb' },
      { label: 'Екип', desc: 'Специалистите зад грижата', href: '/za-nas/ekip', icon: 'users' },
      { label: 'Материална база', desc: 'Кабинети, зали и двор', href: '/za-nas/materialna-baza', icon: 'building' },
      { label: 'Вътрешни документи', desc: 'Правилници и политики', href: '/za-nas/vatreshni-dokumenti', icon: 'file' },
      { label: 'Бюджет и финанси', desc: 'Прозрачност в числата', href: '/za-nas/byudzhet-i-finansi', icon: 'chart' },
      { label: 'Кариери', desc: 'Свободни позиции при нас', href: '/za-nas/karieri', icon: 'briefcase' },
    ],
  },
  {
    label: 'Прием',
    href: '/priem',
    feature: {
      title: 'Добре дошли в нашето семейство',
      text: 'Разберете как да запишете детето си и планирайте първо посещение при нас.',
      cta: 'Планирайте посещение',
      href: '/priem/poseshtenie',
      tone: 'bl',
    },
    subs: [
      { label: 'Процедура и документи', desc: 'Стъпки за записване', href: '/priem/proczedura', icon: 'clipboard' },
      { label: 'Планирайте посещение', desc: 'Елате да се запознаем', href: '/priem/poseshtenie', icon: 'calendar' },
    ],
  },
  {
    label: 'За родители',
    href: '/za-roditeli',
    feature: {
      title: 'Всичко за родителите',
      text: 'Разписания, режим, правила и услуги — на едно подредено място.',
      cta: 'Административни услуги',
      href: '/za-roditeli/uslugi',
      tone: 'em',
    },
    subs: [
      { label: 'Училищно настоятелство', desc: 'Заедно за децата', href: '/za-roditeli/nastoyatelstvo', icon: 'heart' },
      { label: 'Дневен режим', desc: 'Ритъмът на деня', href: '/za-roditeli/dneven-rezhim', icon: 'clock' },
      { label: 'Учебни часове', desc: 'Седмично разписание', href: '/za-roditeli/uchebno-razpisanie', icon: 'book' },
      { label: 'Терапевтични часове', desc: 'График на терапиите', href: '/za-roditeli/terapevtichno-razpisanie', icon: 'puzzle' },
      { label: 'Приемно време', desc: 'Кога да ни намерите', href: '/za-roditeli/priemno-vreme', icon: 'clock' },
      { label: 'Правила за посещение', desc: 'Как протича посещението', href: '/za-roditeli/pravila', icon: 'shield' },
      { label: 'Консултации', desc: 'График с родителите', href: '/za-roditeli/konsultacii', icon: 'chat' },
      { label: 'Административни услуги', desc: 'Заявления и удостоверения', href: '/za-roditeli/uslugi', icon: 'file' },
    ],
  },
  {
    label: 'Интересно',
    href: '/novini',
    feature: {
      title: 'Моменти, които разказват',
      text: 'Новини, събития и мигове от ежедневието в центъра.',
      cta: 'Всички публикации',
      href: '/novini',
      tone: 'bl',
    },
    subs: [
      { label: 'Новини и блог', desc: 'Актуално от живота в центъра', href: '/novini', icon: 'news' },
      { label: 'Галерия', desc: 'Снимки от събития и моменти', href: '/galeriya', icon: 'camera' },
      { label: 'Събития и празници', desc: 'Предстоящи и минали инициативи', href: '/novini?cat=Събития', icon: 'calendar' },
      { label: 'Ателиета и терапия', desc: 'Кадри и истории от практиката', href: '/novini?cat=Ателиета', icon: 'camera' },
      { label: 'Документи и съобщения', desc: 'Официални съобщения и протоколи', href: '/za-nas/vatreshni-dokumenti', icon: 'file' },
    ],
  },
];
