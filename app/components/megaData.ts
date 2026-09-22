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
      { label: 'Екип', desc: 'Специалистите зад грижата', href: '/za-nas/ekip', icon: 'users' },
      { label: 'Материална база', desc: 'Кабинети, зали и двор', href: '/za-nas/materialna-baza', icon: 'building' },
      { label: 'Проекти', desc: 'Инициативи и програми', href: '/za-nas/proekti', icon: 'bulb' },
      { label: 'Кариери', desc: 'Свободни позиции при нас', href: '/za-nas/karieri', icon: 'briefcase' },
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
      { label: 'Процедура и документи', desc: 'Стъпки за записване', href: '/priem/proczedura', icon: 'clipboard' },
      { label: 'Планирайте посещение', desc: 'Елате да се запознаем', href: '/priem/poseshtenie', icon: 'calendar' },
      { label: 'Училищно настоятелство', desc: 'Заедно за децата', href: '/za-roditeli/nastoyatelstvo', icon: 'heart' },
      { label: 'Дневен режим', desc: 'Ритъмът на деня', href: '/za-roditeli/dneven-rezhim', icon: 'clock' },
      { label: 'Административни услуги', desc: 'Заявления и удостоверения', href: '/za-roditeli/uslugi', icon: 'file' },
      { label: 'Ресурси за родители', desc: 'Материали и подкрепа за дома', href: '/za-roditeli/resursi', icon: 'heart' },
    ],
  },
  {
    label: 'Прозрачност',
    href: '/prozrachnost',
    feature: {
      title: 'Открито и отчетно',
      text: 'Бюджет, обществени поръчки и документи — публично и на едно място.',
      cta: 'Бюджет и финанси',
      href: '/za-nas/byudzhet-i-finansi',
      tone: 'bl',
    },
    subs: [
      { label: 'Вътрешни документи', desc: 'Правилници и политики', href: '/za-nas/vatreshni-dokumenti', icon: 'file' },
      { label: 'Бюджет и финанси', desc: 'Прозрачност в числата', href: '/za-nas/byudzhet-i-finansi', icon: 'chart' },
      { label: 'Профил на купувача', desc: 'Обществени поръчки в ЦАИС ЕОП', href: '/za-nas/profil-na-kupuvacha', icon: 'clipboard' },
      { label: 'Достъп до информация', desc: 'Заявления и отчети по ЗДОИ', href: '/za-nas/dostap-do-obshtestvena-informatsiya', icon: 'file' },
      { label: 'Защита на личните данни', desc: 'Политика за поверителност (GDPR)', href: '/za-nas/zashtita-na-lichnite-danni', icon: 'shield' },
      { label: 'Подаване на сигнали', desc: 'Поверителен канал по ЗЗЛПСПОИН', href: '/podavane-na-signali', icon: 'chat' },
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
