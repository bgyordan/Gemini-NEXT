import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Проекти и национални програми — ЦСОП Варна',
  description:
    'Проекти на ЦСОП – Варна: Изграждане на модерен STEM център по НПВУ (BG-RRP-1.015) и Национални програми на МОН за БДП и достъпна образователна среда.',
};

const projects = [
  {
    tag: 'BG-RRP-1.015 · НПВУ',
    agency: 'Национален план за възстановяване и устойчивост · NextGenerationEU',
    title: 'Изграждане на училищна STEM среда в ЦСОП – гр. Варна',
    status: 'Реализира се / В изпълнение',
    statusTone: 'active',
    featured: true,
    desc: 'Мащабен проект по процедура BG-RRP-1.015 „Изграждане на училищна STEM среда“ за създаване на интегриран, достъпен и иновативен STEM център, специално съобразен с индивидуалните образователни, сензорни и терапевтични потребности на учениците в ЦСОП – Варна.',
    sections: [
      {
        title: 'Изследователска лаборатория по природни науки',
        text: 'Пространство за практически опити, тактилно и визуално изследване на природата, адаптирани микроскопи и интерактивни модели.',
      },
      {
        title: 'Класна стая за креативни и дигитални създатели',
        text: 'Високотехнологични работни станции, сензорни дисплеи, специализиран софтуер за когнитивно развитие и елементи за виртуална реалност (VR).',
      },
      {
        title: 'Учебна практическа работилница / Makerspace',
        text: 'Зона за 3D принтиране, конструиране, приложно майсторене и усвояване на практически умения за самостоятелен живот и бъдеща трудова реализация.',
      },
      {
        title: 'Адаптирана среда за деца от аутистичния спектър',
        text: 'Сензорно балансирано осветление, ергономични мебели и зона за релаксация и социално взаимодействие.',
      },
    ],
  },
  {
    tag: 'НП БДП · МОН',
    agency: 'Министерство на образованието и науката (МОН)',
    title: 'Национална програма „Безопасност на движението по пътищата“',
    status: 'Спечелен проект',
    statusTone: 'active',
    featured: false,
    desc: 'Спечелен проект за създаване на интерактивна и безопасна среда за ранно обучение и изграждане на практическо поведение на пътя при ученици със специални образователни потребности.',
    highlights: [
      'Оборудване на специализирана учебна площадка по БДП с хоризонтална маркировка',
      'Интерактивна светофарна уредба, реални умалени пътни знаци и обучителни помагала',
      'Симулационни и ситуационни игри за уверено ориентиране и безопасно придвижване в градска среда',
    ],
  },
  {
    tag: 'НП Среда · МОН',
    agency: 'Министерство на образованието и науката (МОН)',
    title: 'НП „Осигуряване на съвременна, сигурна и достъпна образователна среда“',
    status: 'Реализиран / Действащ',
    statusTone: 'active',
    featured: false,
    desc: 'Мерки за непрекъснато подобряване на физическата и терапевтична среда, достъпността и рехабилитационния капацитет на центъра.',
    highlights: [
      'Модернизация на кабинетите по кинезитерапия и релационна психомоторика',
      'Обогатяване на ергономичното и рехабилитационно оборудване за двигателно развитие',
      'Осигуряване на сигурна, комфортна и стимулираща материална база за децата',
    ],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Проекти"
        title="Проекти и национални програми"
        intro="Участие на ЦСОП – Варна в Националния план за възстановяване и устойчивост (STEM център) и национални програми на МОН за достъпна и модерна среда."
        tone="bl"
      />

      <main style={{ padding: '60px 0 90px' }}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="kicker">Модернизация и иновации</span>
            <h2>Проектна дейност и програми</h2>
            <p>
              Официална информация за реализираните и текущите проекти на ЦСОП – Варна, насочени към високи технологии, практическо обучение и безопасност на децата.
            </p>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '920px', margin: '0 auto' }}>
            {projects.map((p, idx) => (
              <Reveal
                key={p.title}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
                style={{
                  background: '#ffffff',
                  border: p.featured ? '2px solid rgba(11, 77, 60, 0.25)' : '1px solid var(--line)',
                  borderRadius: '18px',
                  padding: '32px',
                  boxShadow: p.featured
                    ? '0 8px 24px -4px rgba(11, 77, 60, 0.08), 0 2px 8px rgba(0,0,0,0.02)'
                    : '0 2px 10px rgba(0, 0, 0, 0.03)',
                  position: 'relative',
                }}
              >
                {p.featured && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--green-deep)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      marginBottom: '14px',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Ключов проект · Иновативна STEM среда
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--clay-deep)',
                        letterSpacing: '0.04em',
                        marginBottom: '4px',
                      }}
                    >
                      {p.agency}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '21px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--green-deep)',
                      background: 'rgba(11, 77, 60, 0.08)',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--ink-2)',
                    lineHeight: '1.65',
                    marginBottom: p.sections || p.highlights ? '20px' : '0',
                  }}
                >
                  {p.desc}
                </p>

                {/* STEM SPECIAL SECTIONS GRID */}
                {p.sections && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '14px',
                      marginTop: '16px',
                    }}
                  >
                    {p.sections.map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          background: 'var(--sand-2)',
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 0, 0, 0.04)',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '13.5px',
                            fontWeight: 700,
                            color: 'var(--green-deep)',
                            margin: '0 0 6px',
                            lineHeight: 1.3,
                          }}
                        >
                          {sec.title}
                        </h4>
                        <p
                          style={{
                            fontSize: '12.5px',
                            color: 'var(--ink-2)',
                            margin: 0,
                            lineHeight: '1.5',
                          }}
                        >
                          {sec.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* HIGHLIGHTS BULLETS */}
                {p.highlights && (
                  <div
                    style={{
                      background: 'var(--sand-2)',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <b
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--green-deep)',
                        marginBottom: '8px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Основни компоненти и дейности:
                    </b>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: '18px',
                        fontSize: '13.5px',
                        color: 'var(--ink-2)',
                        lineHeight: '1.6',
                      }}
                    >
                      {p.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            ))}

            <div
              style={{
                marginTop: '8px',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px dashed var(--line)',
                fontSize: '13px',
                color: 'var(--ink-3)',
                lineHeight: '1.5',
                textAlign: 'center',
              }}
            >
              Информацията за проектите и програмите на ЦСОП – Варна се актуализира редовно в съответствие с изискванията за публичност и прозрачност по НПВУ и МОН.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
