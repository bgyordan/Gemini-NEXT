import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Планирайте посещение — ЦСОП Варна',
  description:
    'Заповядайте на индивидуална опознавателна обиколка на ЦСОП – Варна. Вижте кабинетите, сензорната зала и се запознайте с нашите специалисти.',
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
                <li><b>Сензорна Снуузелен зала:</b> светлинни водни кули, фиброоптика и релаксираща зона</li>
                <li><b>Кабинети по логопедия и психология:</b> специализирани тренажори и софтуер Communicator 5</li>
                <li><b>Обучителна кухня и готварски кабинет:</b> ресторантьорство и практически умения</li>
                <li><b>Зала за кинезитерапия:</b> рехабилитационни уреди и релационна психомоторика</li>
                <li><b>Зелен двор и градина:</b> открити пространства за игра и градинарство</li>
              </ul>
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
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6', marginBottom: '24px' }}>
                Обадете се на нашия екип, за да съгласуваме ден и час, в който детето да може спокойно да опознае средата без шум и бързане:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '14px' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Тел. за връзка:</span>
                  <a href="tel:+359878521823" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--green-deep)' }}>
                    +359 878 521 823
                  </a>
                  <span style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-2)' }}>Светлана Иванова (Директор)</span>
                </div>

                <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '14px' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Деловодство:</span>
                  <a href="tel:+359888490771" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--green-deep)' }}>
                    +359 888 490 771
                  </a>
                  <span style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-2)' }}>Понеделник – Петък: 08:00 – 16:30 ч.</span>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <a href="/kontakti" className="btn btn-warm" style={{ width: '100%', justifyContent: 'center' }}>
                  Вижте карта и всички контакти
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
