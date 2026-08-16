import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Училищно настоятелство — ЦСОП Варна',
  description:
    'Училищно настоятелство и Обществен съвет към ЦСОП – Варна: партньорство, съвместни благотворителни инициативи и родителска подкрепа.',
};

export default function ParentsCouncilPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За родители · Настоятелство"
        title="Училищно настоятелство и Обществен съвет"
        intro="Заедно създаваме по-добра и топла среда за децата на ЦСОП – Варна чрез активно участие на родители, общественици и приятели на центъра."
        tone="bl"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              marginBottom: '60px',
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
              <span className="kicker">Нашата мисия</span>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Партньори в развитието</h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.7', marginBottom: '16px' }}>
                Училищното настоятелство към ЦСОП – Варна е независима доброволна организация, която подпомага материалното, културно и социално развитие на центъра.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
                Чрез съвместни благотворителни базари, събития и дарителски кампании осигуряваме допълнителни специализирани материали, сензорни играчки и празнични подаръци за децата.
              </p>
            </Reveal>

            <Reveal
              delay={1}
              style={{
                background: 'linear-gradient(145deg, var(--sand-2), var(--clay-soft))',
                border: '1px solid var(--line)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="kicker" style={{ color: 'var(--clay-deep)' }}>Основни дейности</span>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Как подкрепяме децата</h2>
              <ul style={{ paddingLeft: '20px', fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.8', margin: '0 0 20px' }}>
                <li>Организиране на традиционни коледни и великденски благотворителни изложби</li>
                <li>Съдействие за екскурзии, адаптирани летни лагери и посещения на културни събития</li>
                <li>Участие в Обществения съвет за прозрачно управление на ресурсите</li>
                <li>Оказване на взаимна подкрепа и обмен на опит между родителите</li>
              </ul>
            </Reveal>
          </div>

          <Reveal
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: '24px',
              padding: '36px',
              textAlign: 'center',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '12px' }}>
              Искате ли да се включите в настоятелството?
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6', marginBottom: '24px' }}>
              Всеки родител или приятел на децата е добре дошъл с идеи, умения или доброволчески труд.
            </p>
            <a href="/kontakti" className="btn btn-warm">
              Свържете се с нас
            </a>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
