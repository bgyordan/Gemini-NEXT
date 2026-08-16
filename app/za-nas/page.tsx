import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import './za-nas.css';

export const metadata = {
  title: 'За нас — ЦСОП Варна',
  description:
    'Център за специална образователна подкрепа – Варна: мисия, история и ценностите, които водят ежедневната ни работа с деца и младежи.',
};

const values = [
  {
    icon: 'heart',
    title: 'Приемане',
    text: 'Всяко дете е добре дошло такова, каквото е — със своя ритъм, характер и начин да опознава света.',
  },
  {
    icon: 'puzzle',
    title: 'Индивидуалност',
    text: 'Работим по личен план за всеки ученик, изготвен от екип специалисти според неговите нужди.',
  },
  {
    icon: 'users',
    title: 'Заедно',
    text: 'Родители, учители и терапевти сме един екип. Развитието на детето е обща грижа и обща радост.',
  },
  {
    icon: 'compass',
    title: 'Посока',
    text: 'Не бързаме. Вярваме, че посоката, в която се движим, е по-важна от скоростта, с която го правим.',
  },
];

const timeline = [
  {
    year: 'Началото',
    title: 'Един дом за развитие',
    text: 'Центърът отваря врати, за да отговори на нуждата от специализирана образователна подкрепа за деца във Варна и региона.',
  },
  {
    year: 'Растеж',
    title: 'Разширяваме грижата',
    text: 'Обособяваме девет учебни кабинета и ерготерапевтично пространство — среда, създадена да подкрепя, а не да претоварва.',
  },
  {
    year: 'Днес',
    title: 'Над 150 деца и младежи',
    text: 'Всеки ден повече от 150 деца и младежи се обучават и получават терапия при нас, водени от екип от специалисти.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас"
        title="Място, където всяко дете получава своя ритъм"
        intro="Център за специална образователна подкрепа – Варна предоставя обучение, специализирана подкрепа и рехабилитация в безопасна, стимулираща и приемаща среда."
      />

      {/* MISSION */}
      <section className="mission">
        <div className="wrap mission-grid">
          <Reveal className="mission-art">
            <img
              src="/images/team_care.jpg"
              alt="Екип от специалисти и учители в ЦСОП Варна"
              referrerPolicy="no-referrer"
            />
            <div className="mission-badge">
              <b>150+</b>
              <span>деца и младежи</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <span className="lead-kicker">НАШАТА МИСИЯ</span>
            <h2>Подкрепяме развитието, уважаваме личността</h2>
            <p>
              Съществуваме, за да могат децата и техните семейства да изживеят
              пълноценно своя личен и социален живот. Съчетаваме диагностична,
              терапевтична и образователна подкрепа под един покрив.
            </p>
            <p>
              Всяко дете при нас работи по индивидуален план, а всеки малък успех —
              първата изречена дума, първата самостоятелна крачка, първата глинена
              чаша — е триумф, който празнуваме заедно.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="lead-kicker">ЦЕННОСТИ</span>
            <h2>Това, в което вярваме</h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} className="value-card" delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <span className="value-ic"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="story">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="lead-kicker">НАШИЯТ ПЪТ</span>
            <h2>Историята на един дом за развитие</h2>
          </Reveal>
          <div className="timeline">
            {timeline.map((t, i) => (
              <Reveal key={t.year} className="tl-item" delay={(i + 1) as 1 | 2 | 3}>
                <div className="tl-marker"><span /></div>
                <div className="tl-body">
                  <span className="tl-year">{t.year}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUBPAGES */}
      <section className="explore">
        <div className="wrap">
          <Reveal className="sec-head center">
            <span className="lead-kicker">РАЗГЛЕДАЙТЕ</span>
            <h2>Още за центъра</h2>
          </Reveal>
          <div className="explore-grid">
            {[
              { icon: 'history', label: 'История', href: '/za-nas/istoriya' },
              { icon: 'bulb', label: 'Проекти', href: '/za-nas/proekti' },
              { icon: 'users', label: 'Екип', href: '/za-nas/ekip' },
              { icon: 'file', label: 'Вътрешни документи', href: '/za-nas/vatreshni-dokumenti' },
              { icon: 'chart', label: 'Бюджет и финанси', href: '/za-nas/byudzhet-i-finansi' },
              { icon: 'briefcase', label: 'Кариери', href: '/za-nas/karieri' },
            ].map((s) => (
              <a key={s.href} href={s.href} className="explore-card">
                <span className="explore-ic"><Icon name={s.icon} /></span>
                <span className="explore-label">{s.label.toUpperCase()}</span>
                <svg className="explore-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
