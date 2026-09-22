import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import './resursi.css';

export const metadata = {
  title: 'Ресурси за родители — ЦСОП Варна',
  description:
    'Дигитална библиотека и психологическа подкрепа за семействата на деца със специални образователни потребности — материали за работа у дома, визуална комуникация, литература, групи за взаимопомощ и статии.',
};

type Row = {
  n: string;
  title: string;
  desc: string;
  href?: string;
  badge: 'ok' | 'active' | 'soon';
  badgeText: string;
  action?: string;
};

const LIBRARY: Row[] = [
  {
    n: '01',
    title: 'Брошури и материали за родители',
    desc: 'Практични насоки по области на развитието — двигателно развитие, аутизъм, синдром на Даун, слухови и зрителни нарушения (Фондация „Карин дом“).',
    href: 'https://karindom.org/broshuri/',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
  {
    n: '02',
    title: 'Визуална комуникация и PECS',
    desc: 'Табла за комуникация, визуални графици и система PECS (общуване чрез картинки) за структуриране на деня и подпомагане на речта.',
    href: 'https://prepodavame.bg/dopalvashta-i-alternativna-komunikatsia-ili-kak-tehnologiite-promenyat-sadbi/',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
  {
    n: '03',
    title: 'Препоръчителна литература',
    desc: 'Подбран списък с книги и наръчници за родители на деца с аутизъм и специални потребности (Фондация „Аутизъм“).',
    href: 'https://autismbulgaria.com/knigi',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
];

const SUPPORT: Row[] = [
  {
    n: '01',
    title: 'Работилница за родители',
    desc: 'Съвместни срещи, в които терапевтите и родителите работят заедно за изграждане на общ език и ниво на комуникация с детето — практически техники, споделен опит и взаимна подкрепа.',
    badge: 'active',
    badgeText: 'Активна',
  },
  {
    n: '02',
    title: 'Консултации и групи за взаимопомощ',
    desc: 'Консултации за родители и специалисти и обучения по международни стандарти в подкрепа на семействата (Фондация „Карин дом“).',
    href: 'https://karindom.org/',
    badge: 'ok',
    badgeText: 'Онлайн',
    action: 'Отвори →',
  },
  {
    n: '03',
    title: 'Родителско прегаряне (бърнаут)',
    desc: 'Какво е родителският бърнаут, как да го разпознаем и как да си върнем силите (Национална мрежа за децата).',
    href: 'https://nmd.bg/kakvo-e-i-zashto-se-stiga-do-roditelski-barnaut/',
    badge: 'ok',
    badgeText: 'Статия',
    action: 'Отвори →',
  },
  {
    n: '04',
    title: 'Братята и сестрите в семейството',
    desc: 'Роли, отговорности и правила — как да подкрепим типично развиващото се дете в семейство на дете със СОП.',
    href: 'https://chudesa.bg/1017-otgovornosti-roli-i-pravila-bratya-sestri-na-deca-s-uvrejdaniya/',
    badge: 'ok',
    badgeText: 'Статия',
    action: 'Отвори →',
  },
  {
    n: '05',
    title: 'Партньорство с училището и поведение',
    desc: 'Как семейството и специалистите работят заедно и как да подхождаме към проблемните поведения (Prepodavame.bg).',
    href: 'https://prepodavame.bg/partnyorstvo-i-vzaimodeystvie-s-roditelite-na-uchenitsi-sas-spetsialni-obrazovatelni-potrebnosti/',
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
        <span className={`dc-badge ${r.badge === 'active' ? 'ok' : r.badge}`}>{r.badgeText}</span>
        {r.action && <span className="dc-download">{r.action}</span>}
      </div>
    </>
  );

  if (r.href) {
    return (
      <a href={r.href} target="_blank" rel="noopener noreferrer" className="dc-doc">
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
              Терапията продължава и вкъщи. Събираме проверени материали за работа с детето у дома и
              подкрепа за самите родители — защото семейството е част от екипа.
            </p>
          </div>
        </Reveal>

        {/* ДИГИТАЛНА БИБЛИОТЕКА */}
        <Reveal className="dc-docs">
          <div className="dc-section-header">
            <span className="dc-section-kicker">Дигитална библиотека</span>
            <div className="dc-section-line" />
          </div>
          {LIBRARY.map((r) => (
            <DocRow key={r.n} r={r} />
          ))}
        </Reveal>

        {/* ПСИХОЛОГИЧЕСКА ПОДКРЕПА */}
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
            Част от ресурсите се поддържат от партньорски организации (Фондация „Карин дом“, Фондация
            „Аутизъм“, Национална мрежа за децата и др.). За индивидуална консултация се свържете с
            нас на <a href="mailto:info-400052@edu.mon.bg">info-400052@edu.mon.bg</a> или на телефон{' '}
            <a href="tel:052619456">052 619 456</a>.
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
