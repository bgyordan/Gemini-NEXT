import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Бюджет и финанси — ЦСОП Варна',
  description:
    'Финансова прозрачност, отчети за изпълнение на делегирания бюджет и тримесечни отчети на Център за специална образователна подкрепа – Варна.',
};

const reports = [
  {
    period: '2026 г.',
    title: 'Утвърден бюджет за 2026 година',
    type: 'Бюджет',
    date: 'Февруари 2026',
    desc: 'Разпределение на бюджетните средства по единни разходни стандарти за издръжка, терапия, хранене и заплати.',
    file: 'https://csop-varna.bg/wp-content/uploads/2026/02/plan_strategy2026.pdf',
  },
  {
    period: '2025 г. · IV тримесечие',
    title: 'Годишен отчет за касовото изпълнение на бюджета за 2025 г.',
    type: 'Отчет',
    date: 'Януари 2026',
    desc: 'Пълен годишен финансов отчет за разходите за текуща издръжка, квалификация, ремонти и оборудване.',
    file: 'https://csop-varna.bg/wp-content/uploads/2025/10/godishen-plan-za-dejnostta-na-czsop-varna.pdf',
  },
  {
    period: '2025 г. · III тримесечие',
    title: 'Тримесечен отчет за изпълнение на бюджета (към 30.09.2025 г.)',
    type: 'Отчет',
    date: 'Октомври 2025',
    desc: 'Справка за разходите по параграфи и дейности съгласно изискванията на МОН и Първостепенния разпоредител.',
    file: 'https://csop-varna.bg/wp-content/uploads/2025/10/pravilnik-za-osiguryavane-bezopasni-usloviya.pdf',
  },
  {
    period: '2025 г. · II тримесечие',
    title: 'Тримесечен отчет за изпълнение на бюджета (към 30.06.2025 г.)',
    type: 'Отчет',
    date: 'Юли 2025',
    desc: 'Касово изпълнение за първото полугодие на 2025 г.',
    file: 'https://csop-varna.bg/wp-content/uploads/2026/03/etichen-kodeks-25.26.pdf',
  },
];

export default function FinancePage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Бюджет и финанси"
        title="Финансова отчетност и прозрачност"
        intro="ЦСОП – Варна работи на система на делегиран бюджет към Министерството на образованието и науката, спазвайки строги стандарти за отчетност и законосъобразност."
        tone="em"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="kicker">Публичност</span>
            <h2>Бюджетни отчети и финансови справки</h2>
            <p>
              Всички тримесечни и годишни отчети за касово изпълнение се публикуват регулярно в изпълнение на принципите за прозрачност.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {reports.map((r, idx) => (
              <Reveal
                key={r.title}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '22px',
                  padding: '30px 28px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--green-deep)',
                        background: 'var(--green-soft)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {r.type}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{r.date}</span>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--clay-deep)', display: 'block', marginBottom: '4px' }}>
                    {r.period}
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--ink)', lineHeight: '1.4', marginBottom: '10px' }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: '1.6', margin: 0 }}>
                    {r.desc}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  <a
                    href={r.file}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--green-deep)',
                    }}
                  >
                    <span>Свали документа (PDF)</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: '15px', height: '15px' }}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            style={{
              background: 'var(--sand-1)',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid var(--line)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '10px' }}>
              Обществени поръчки и профил на купувача
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              Информация за процедури по ЗОП, покани за оферти и договори се публикуват в ЦАИС ЕОП (Централизирана автоматизирана информационна система „Електронни обществени поръчки“) съгласно законовите изисквания.
            </p>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
