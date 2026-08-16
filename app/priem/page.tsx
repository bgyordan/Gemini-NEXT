import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import AdmissionWizard from './AdmissionWizard';

export const metadata = {
  title: 'Прием — ЦСОП Варна',
  description:
    'Информация за реда, необходимите документи и процедурата по прием на ученици в ЦСОП – Варна.',
};

export default function AdmissionPage() {
  const steps = [
    {
      num: '01',
      title: 'Консултация и оценка (РЦПППО)',
      text: 'Насочване от Регионалния център за подкрепа на процеса на приобщаващото образование (РЦПППО) гр. Варна или оценка от ЕПЛР.',
    },
    {
      num: '02',
      title: 'Подаване на заявление и документи',
      text: 'Родителят (настойникът) подава писмено заявление по образец на ЦСОП, придружено от медицинска експертиза и удостоверение за раждане.',
    },
    {
      num: '03',
      title: 'Диагностична среща и запознаване',
      text: 'Екипът от психолог, логопед и специален педагог провежда опознавателна среща с детето и семейството в спокойна, приятелска среда.',
    },
    {
      num: '04',
      title: 'Изготвяне на индивидуален план',
      text: 'Съставя се индивидуален учебен и терапевтичен план, определя се дневен или почасов режим на обучение и рехабилитация.',
    },
  ];

  return (
    <>
      <Header />
      <PageHero
        kicker="Прием · 2026/2027"
        title="Стъпки за прием и записване в центъра"
        intro="Приемът в ЦСОП – Варна се осъществява целогодишно за деца и младежи със специални образователни потребности на основание становище от ЕПЛР и РЦПППО."
        tone="bl"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="kicker">Процедура</span>
            <h2>Как протича процесът на кандидатстване</h2>
            <p>
              Нашият екип е на разположение на всяка стъпка, за да улесни семейството и да осигури плавен преход за детето.
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '60px',
            }}
          >
            {steps.map((step, idx) => (
              <Reveal
                key={step.num}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  boxShadow: 'var(--shadow-sm)',
                }}
                delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <span
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--clay)',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  {step.num}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{step.text}</p>
              </Reveal>
            ))}
          </div>

          {/* INTERACTIVE ADMISSION WIZARD */}
          <AdmissionWizard />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              marginTop: '60px',
            }}
          >
            <Reveal
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '36px',
                border: '1px solid var(--line)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '16px' }}>
                Контакти за съдействие при прием
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                Деловодството на ЦСОП – Варна приема документи всеки работен ден от <b>08:00 до 16:30 ч.</b> на ул. „Петко Стайнов“ №7.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: 'var(--ink)' }}>
                <div>📞 <b>Централа / Деловодство:</b> <a href="tel:+359888490771" style={{ color: 'var(--green-deep)', fontWeight: 600 }}>+359 888 490 771</a></div>
                <div>📞 <b>Директор (Светлана Иванова):</b> <a href="tel:+359878521823" style={{ color: 'var(--green-deep)', fontWeight: 600 }}>+359 878 521 823</a></div>
                <div>✉️ <b>Имейл:</b> <a href="mailto:office@csop-varna.bg" style={{ color: 'var(--green-deep)' }}>office@csop-varna.bg</a></div>
              </div>
            </Reveal>

            <Reveal
              style={{
                background: 'linear-gradient(145deg, var(--clay-soft), var(--sand-2))',
                borderRadius: '24px',
                padding: '36px',
                border: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              delay={1}
            >
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px' }}>
                Искате ли да разгледате центъра?
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
                Заповядайте на индивидуална опознавателна среща и обиколка на кабинетите, сензорната зала, кулинарната работилница и зеления двор.
              </p>
              <div>
                <a href="/kontakti" className="btn btn-primary">
                  Заявете посещение
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
