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
  return (
    <>
      <Header />
      <PageHero
        kicker="Прием"
        title="Стъпки за прием и записване в центъра"
        intro="Приемът в ЦСОП – Варна се осъществява за деца и младежи със специални образователни потребности на основание становище от ЕПЛР и РЦПППО – Варна."
        tone="bl"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          {/* РЕАЛНА ПРОЦЕДУРА (3 етапа) */}
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
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                Деловодството на ЦСОП – Варна приема документи в работни дни на адрес
                ул. „Петко Стайнов“ №7, гр. Варна. Телефони и работно време ще намерите в контактите.
              </p>
              <div>
                <a href="/kontakti" className="btn btn-warm">
                  Вижте контакти
                </a>
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
                Заповядайте на индивидуална опознавателна среща и обиколка на кабинетите,
                терапевтичните зали, сензорната зала, кабинета по готварство и училищния двор.
              </p>
              <div>
                <a href="/priem/poseshtenie" className="btn btn-primary">
                  Планирайте посещение
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
