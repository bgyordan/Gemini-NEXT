import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import './resursi.css';

export const metadata = {
  title: 'Ресурси за родители — ЦСОП Варна',
  description:
    'Печатни материали за работа у дома (комуникационни карти, табла за дневен режим и тоалетни навици), литература и психологическа подкрепа за семействата на деца със специални образователни потребности.',
};

type Row = {
  n: string;
  title: string;
  desc: string;
  href?: string;
  badge: 'ok' | 'soon';
  badgeText: string;
  action?: string;
  download?: boolean;
};

// Наши печатни материали (PDF за сваляне)
const MATERIALS: Row[] = [
  {
    n: '01',
    title: 'Комуникационни карти',
    desc: 'Основни картинки за общуване (искам, да, не, вода, храна, тоалетна, боли, помощ…) — за изрязване и ползване у дома.',
    href: '/resursi/komunikatsionni-karti.pdf',
    badge: 'ok',
    badgeText: 'PDF',
    action: 'Изтегли →',
    download: true,
  },
  {
    n: '02',
    title: 'Табло за дневен режим',
    desc: 'Картинки за подреждане на деня по ред — за предвидима и спокойна среда у дома.',
    href: '/resursi/tablo-dneven-rezhim.pdf',
    badge: 'ok',
    badgeText: 'PDF',
    action: 'Изтегли →',
    download: true,
  },
  {
    n: '03',
    title: 'Табло за тоалетни навици',
    desc: 'Стъпка по стъпка към самостоятелност — визуална последователност за тоалетните навици.',
    href: '/resursi/tablo-toaletni-navitsi.pdf',
    badge: 'ok',
    badgeText: 'PDF',
    action: 'Изтегли →',
    download: true,
  },
];

// Литература и външни ресурси (партньорски организации)
const LINKS: Row[] = [
  {
    n: '01',
    title: 'Брошури за родители (Карин дом)',
    desc: 'Практични насоки по области на развитието — аутизъм, синдром на Даун, двигателно развитие, слухови и зрителни нарушения.',
    href: 'https://karindom.org/broshuri/',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
  {
    n: '02',
    title: 'Визуална комуникация и PECS',
    desc: 'Как работят таблата за комуникация и системата PECS (общуване чрез картинки).',
    href: 'https://prepodavame.bg/dopalvashta-i-alternativna-komunikatsia-ili-kak-tehnologiite-promenyat-sadbi/',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
  {
    n: '03',
    title: 'Препоръчителна литература',
    desc: 'Подбран списък с книги и наръчници за родители на деца с аутизъм и специални потребности.',
    href: 'https://autismbulgaria.com/knigi',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
];

// Психологическа подкрепа за семейството
const SUPPORT: Row[] = [
  {
    n: '01',
    title: 'Работилница за родители',
    desc: 'Съвместни срещи, в които терапевтите и родителите работят заедно за изграждане на общ език и ниво на комуникация с детето — практически техники, споделен опит и взаимна подкрепа.',
    badge: 'ok',
    badgeText: 'Активна',
  },
  {
    n: '02',
    title: 'Консултации и групи за взаимопомощ',
    desc: 'Консултации за родители и специалисти и обучения по международни стандарти (Фондация „Карин дом“).',
    href: 'https://karindom.org/',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
  {
    n: '03',
    title: 'Родителско прегаряне (бърнаут)',
    desc: 'Как да разпознаем родителския бърнаут и как да си върнем силите (Национална мрежа за децата).',
    href: 'https://nmd.bg/kakvo-e-i-zashto-se-stiga-do-roditelski-barnaut/',
    badge: 'ok',
    badgeText: 'Статия',
    action: 'Отвори →',
  },
  {
    n: '04',
    title: 'Братята и сестрите в семейството',
    desc: 'Роли и правила — как да подкрепим типично развиващото се дете в семейство на дете със СОП.',
    href: 'https://chudesa.bg/1017-otgovornosti-roli-i-pravila-bratya-sestri-na-deca-s-uvrejdaniya/',
    badge: 'ok',
    badgeText: 'Статия',
    action: 'Отвори →',
  },
];

function DocRow({ r }: { r: Row }) {
  const inner = (
    <>
      <span className="dc-doc-num">{r.n}</span>
      <div className="dc-doc-info">
        <h3>{r.title}</h3>
        <p>{r.desc}</p>
      </div>
      <div className="dc-doc-right">
        <span className={`dc-badge ${r.badge}`}>{r.badgeText}</span>
        {r.action && <span className="dc-download">{r.action}</span>}
      </div>
    </>
  );

  if (r.href) {
    const ext = { target: '_blank', rel: 'noopener noreferrer' };
    return (
      <a href={r.href} className="dc-doc" {...(r.download ? { download: true } : ext)}>
        {inner}
      </a>
    );
  }
  return <div className="dc-doc">{inner}</div>;
}

export default function ParentsResourcesPage() {
  return (
    <>
      <Header />

      <div className="dc">
        {/* HERO */}
        <Reveal className="dc-hero">
          <div className="dc-hero-left">
            <span className="dc-hero-bg">ДОМ</span>
            <span className="dc-kicker">За родители · Ресурси</span>
            <h1>
              Ресурси <em>за дома</em>
            </h1>
          </div>
          <div className="dc-hero-right">
            <p>
              Терапията продължава и вкъщи. Готови за принтиране материали за работа с детето и
              подкрепа за самите родители — защото семейството е част от екипа.
            </p>
          </div>
        </Reveal>

        {/* НАШИ МАТЕРИАЛИ */}
        <Reveal className="dc-docs">
          <div className="dc-section-header">
            <span className="dc-section-kicker">Материали за принтиране</span>
            <div className="dc-section-line" />
          </div>
          {MATERIALS.map((r) => (
            <DocRow key={r.n} r={r} />
          ))}
        </Reveal>

        {/* ЛИТЕРАТУРА И ВРЪЗКИ */}
        <Reveal className="dc-docs">
          <div className="dc-section-header">
            <span className="dc-section-kicker">Литература и ресурси</span>
            <div className="dc-section-line" />
          </div>
          {LINKS.map((r) => (
            <DocRow key={r.n} r={r} />
          ))}
        </Reveal>

        {/* ПОДКРЕПА */}
        <Reveal className="dc-docs">
          <div className="dc-section-header">
            <span className="dc-section-kicker">За родителите</span>
            <div className="dc-section-line" />
          </div>
          {SUPPORT.map((r) => (
            <DocRow key={r.n} r={r} />
          ))}
        </Reveal>

        {/* INFO */}
        <Reveal className="dc-info">
          <p>
            Материалите са изготвени от екипа на ЦСОП – Варна и са свободни за ползване у дома. За
            индивидуална консултация се свържете с нас на{' '}
            <a href="mailto:info-400052@edu.mon.bg">info-400052@edu.mon.bg</a> или на телефон{' '}
            <a href="tel:052619456">052 619 456</a>.
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
