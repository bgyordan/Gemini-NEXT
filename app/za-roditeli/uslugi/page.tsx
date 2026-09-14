import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';

export const metadata = {
  title: 'Административни услуги — ЦСОП Варна',
  description:
    'Административни услуги за родители в ЦСОП – Варна: психолого-педагогическа характеристика и служебна бележка, със заявления за изтегляне и срокове за издаване.',
};

const FORM_BASE = '/dokumenti/uslugi';

interface Service {
  title: string;
  deadline: string;
  form: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    title: 'Психолого-педагогическа характеристика',
    deadline: '5 работни дни',
    form: `${FORM_BASE}/zayavlenie-za-psihologo-pedagogicheska-harakteristika.docx`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Служебна бележка',
    deadline: '3 работни дни',
    form: `${FORM_BASE}/zayavlenie-za-sluzhebna-belezhka.docx`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5m-4 0V5a2 2 0 1 1 4 0v1m-4 0a2 2 0 1 0 4 0M15 11h3m-3 4h2" />
      </svg>
    ),
  },
];

export default function UslugiPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За родители · Услуги"
        title="Административни услуги"
        intro="След подадено заявление от страна на родителя, ЦСОП – Варна издава следните документи в упоменатите срокове."
        tone="em"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap narrow">
          {/* Информационно поле */}
          <Reveal
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              background: 'var(--clay-soft)',
              border: '1px solid var(--clay)',
              borderRadius: '16px',
              padding: '18px 22px',
              marginBottom: '40px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '22px', height: '22px', color: 'var(--clay-deep)', flex: '0 0 auto', marginTop: '2px' }}
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--ink)', lineHeight: '1.6' }}>
              Бланките за заявленията могат да бъдат изтеглени директно оттук или предоставени на място от груповия ръководител на ученика.
            </p>
          </Reveal>

          {/* Услуги */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '26px',
            }}
          >
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.title}
                delay={((i % 2) + 1) as 1 | 2}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '14px',
                    background: 'var(--green-soft)',
                    color: 'var(--green-deep)',
                    display: 'grid',
                    placeItems: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <span style={{ width: '28px', height: '28px', display: 'inline-flex' }}>{s.icon}</span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '20px',
                    color: 'var(--ink)',
                    lineHeight: '1.35',
                    margin: '0 0 18px',
                  }}
                >
                  {s.title}
                </h2>

                <div style={{ flexGrow: 1 }} />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--sand-2)',
                    borderLeft: '3px solid var(--green-deep)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginBottom: '20px',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '18px', height: '18px', color: 'var(--ink-3)', flex: '0 0 auto' }}
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span style={{ fontSize: '13.5px', color: 'var(--ink-2)' }}>
                    Срок: <strong style={{ color: 'var(--ink)' }}>{s.deadline}</strong>
                  </span>
                </div>

                <a
                  href={s.form}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'var(--green-soft)',
                    border: '1px solid var(--green-deep)',
                    color: 'var(--green-deep)',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                  Изтегли заявление
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
