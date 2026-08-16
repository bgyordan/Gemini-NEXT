import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import ParallaxImage from '../../components/ParallaxImage';

export const metadata = {
  title: 'История — ЦСОП Варна',
  description:
    'Историята на Център за специална образователна подкрепа – Варна: от създаването през 1949 г. като ПУ „Братя Миладинови“ до днешния модерен терапевтичен център.',
};

const historyTimeline = [
  {
    year: '1949 г.',
    title: 'Основаване на Помощно училище „Братя Миладинови“',
    desc: 'В отговор на необходимостта от специализирана грижа за деца със затруднения в развитието във Варна и региона се полагат основите на училището, носещо името на възрожденците Братя Миладинови.',
  },
  {
    year: '1970 – 1990 г.',
    title: 'Утвърждаване като водещ педагогически център',
    desc: 'Изграждане на традиции в специалната педагогика, развитие на трудово-политехническото обучение, създаване на първите специализирани кабинети по логопедия и лечебна физкултура.',
  },
  {
    year: '1 август 2017 г.',
    title: 'Преобразуване в ЦСОП – Варна по ЗПУО',
    desc: 'Съгласно Закона за предучилищното и училищното образование училището се трансформира в Център за специална образователна подкрепа с разширен обхват: диагностична, рехабилитационна, терапевтична и професионална подготовка.',
  },
  {
    year: '2020 – 2024 г.',
    title: 'Дигитализация и асистивни технологии',
    desc: 'Внедряване на съвременни технологии за контрол с поглед Tobii Dynavox, софтуер Communicator 5, изграждане на мултисензорна Снуузелен зала и модернизиране на 9-те учебни кабинета.',
  },
  {
    year: 'Днес (2025/2026 г.)',
    title: '75+ години традиция и модерен терапевтичен дом',
    desc: 'Под ръководството на директор Светлана Иванова екип от над 40 висококвалифицирани специалисти обучава и подкрепя над 150 деца и техните семейства на ул. „Петко Стайнов“ №7.',
  },
];

export default function HistoryPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · История"
        title="75+ години традиции, отдаденост и обич към децата"
        intro="От 1949 година до днес, ЦСОП – Варна е сигурен пристан и дом за развитие за поколения деца със специални образователни потребности."
        tone="em"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          {/* SPLIT INTRO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
              marginBottom: '70px',
            }}
          >
            <Reveal>
              <span className="lead-kicker">НАСЛЕДСТВО И ПРИЕМСТВЕНОСТ</span>
              <h2 style={{ fontSize: '32px', marginBottom: '20px', fontFamily: 'var(--serif)' }}>
                Пътят от помощното училище до съвременния европейски център
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.7', marginBottom: '16px' }}>
                През 1949 г. във Варна се поставя началото на институционалната грижа за деца със специални образователни потребности с откриването на Помощно училище „Братя Миладинови“.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.7' }}>
                Днес ЦСОП – Варна обединява богатия опит на няколко поколения специални педагози с най-модерните терапевтични методи — от сензорна интеграция до овладяване на професии в ресторантьорството и озеленяването.
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                <ParallaxImage
                  src="/images/classroom.jpg"
                  alt="История и традиции в ЦСОП Варна"
                  speed={8}
                  scale={1.1}
                />
              </div>
            </Reveal>
          </div>

          {/* TIMELINE */}
          <Reveal className="sec-head">
            <span className="kicker">Хронология</span>
            <h2>Ключови етапи в нашето развитие</h2>
          </Reveal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '840px',
              margin: '0 auto',
            }}
          >
            {historyTimeline.map((item, idx) => (
              <Reveal
                key={item.year}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '22px',
                  padding: '30px 36px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: '24px',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--green-deep)',
                  }}
                >
                  {item.year}
                </span>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.6', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* VALUES BANNER */}
          <Reveal
            style={{
              background: 'linear-gradient(145deg, var(--green-soft), var(--sand-2))',
              borderRadius: '24px',
              padding: '40px',
              marginTop: '70px',
              textAlign: 'center',
              border: '1px solid var(--line)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', marginBottom: '12px' }}>
              „Всяко дете има право на криле и пространство, в което да полети.“
            </h3>
            <p style={{ fontSize: '15.5px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto 24px' }}>
              Продължаваме да надграждаме материалната база, дигиталните ресурси и квалификацията на екипа в името на всяко дете.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <a href="/za-nas/ekip" className="btn btn-primary">
                Запознайте се с екипа
              </a>
              <a href="/novini" className="btn btn-ghost">
                Актуални новини
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
