import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Планирайте посещение — ЦСОП Варна',
  description:
    'Заповядайте на индивидуална опознавателна обиколка на ЦСОП – Варна. Разгледайте кабинетите, залите и се запознайте с екипа.',
};

export default function VisitPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="Прием · Посещение"
        title="Заповядайте да се запознаем на живо"
        intro="Знаем колко важен е изборът на образователна и терапевтична среда. Каним ви да посетите центъра заедно с вашето дете в предварително уговорен спокоен час."
        tone="em"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            <Reveal
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="kicker">Какво ще видите</span>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Индивидуална обиколка на центъра</h2>
              <ul style={{ paddingLeft: '20px', fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.8', margin: '0 0 24px' }}>
                <li>Учебни кабинети</li>
                <li>Терапевтични зали</li>
                <li>Сензорна зала</li>
                <li>Кабинет по готварство</li>
                <li>Училищен двор</li>
              </ul>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: '0 0 20px' }}>
                За пълен преглед на средата вижте{' '}
                <a href="/za-nas/materialna-baza" style={{ color: 'var(--green-deep)', fontWeight: 600 }}>
                  Материална база
                </a>.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--ink-3)', margin: 0 }}>
                Посещението е напълно безплатно и необвързващо.
              </p>
            </Reveal>

            <Reveal
              delay={1}
              style={{
                background: 'linear-gradient(145deg, var(--green-soft), var(--sand-2))',
                border: '1px solid var(--line)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="kicker" style={{ color: 'var(--green-deep)' }}>Свържете се за час</span>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Заявете удобно за вас време</h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6', marginBottom: '28px' }}>
                Свържете се с екипа на центъра, за да съгласуваме ден и час, в който детето да може спокойно да опознае средата без шум и бързане. Телефони и работно време ще намерите в контактите.
              </p>

              <div style={{ textAlign: 'center' }}>
                <a href="/kontakti" className="btn btn-warm" style={{ width: '100%', justifyContent: 'center' }}>
                  Вижте контакти и карта
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
