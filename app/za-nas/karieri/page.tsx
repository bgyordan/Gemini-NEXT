import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Кариери и свободни позиции — ЦСОП Варна',
  description:
    'Възможности за работа, конкурси и свободни работни места за специални педагози, логопеди, психолози и терапевти в ЦСОП – Варна.',
};

const jobPositions = [
  {
    title: 'Специален педагог / Ресурсен учител',
    department: 'Педагогически екип',
    type: 'Пълен работен ден · Постоянен трудов договор',
    requirements: [
      'Висше образование (ОКС „Бакалавър“ или „Магистър“) по Специална педагогика / Дефектология / ПНУП',
      'Опит в работата с деца със специални образователни потребности е предимство',
      'Емпатия, търпение, умения за екипна работа и адаптивност',
    ],
    status: 'Подаване на документи в деловодството',
  },
  {
    title: 'Логопед / Специалист по алтернативна комуникация (AAC)',
    department: 'Терапевтичен сектор',
    type: 'Пълен работен ден',
    requirements: [
      'Висше образование по Логопедия',
      'Познания или интерес към асистивни технологии (Tobii Eye-Tracker, Communicator 5, PECS)',
      'Умения за провеждане на индивидуални и групови терапевтични сесии',
    ],
    status: 'Подаване на документи в деловодството',
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Кариери"
        title="Станете част от екипа на ЦСОП – Варна"
        intro="Търсим мотивирани и отдадени професионалисти, които споделят нашата мисия да създаваме подкрепяща среда и възможности за развитие на всяко дете."
        tone="bl"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="kicker">Свободни позиции</span>
            <h2>Отворени конкурси и възможности</h2>
            <p>
              Актуална информация за процедурите по подбор на педагогически и непедагогически персонал.
            </p>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '60px' }}>
            {jobPositions.map((job, idx) => (
              <Reveal
                key={job.title}
                delay={((idx % 2) + 1) as 1 | 2}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--clay-deep)' }}>
                      {job.department}
                    </span>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', margin: '4px 0 6px' }}>
                      {job.title}
                    </h3>
                    <span style={{ fontSize: '13.5px', color: 'var(--green-deep)', fontWeight: 600 }}>
                      {job.type}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--green-deep)',
                      background: 'var(--green-soft)',
                      padding: '5px 14px',
                      borderRadius: '999px',
                    }}
                  >
                    {job.status}
                  </span>
                </div>

                <div style={{ background: 'var(--sand-2)', padding: '20px', borderRadius: '16px', marginTop: '16px' }}>
                  <b style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '8px' }}>
                    Изисквания към кандидатите:
                  </b>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7' }}>
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            style={{
              background: 'linear-gradient(145deg, var(--green-soft), var(--sand-2))',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid var(--line)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="kicker" style={{ color: 'var(--green-deep)' }}>Кандидатстване</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '10px' }}>
                Как да подадете своите документи?
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                Кандидатите подават CV, мотивационно писмо и копия от дипломи на място в канцеларията на ул. „Петко Стайнов“ №7 или на имейл: <b>office@csop-varna.bg</b>.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <a href="/kontakti" className="btn btn-warm">
                Свържете се с нас
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
