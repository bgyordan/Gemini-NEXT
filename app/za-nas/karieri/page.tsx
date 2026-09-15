import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Кариери — ЦСОП Варна',
  description:
    'Присъединете се към екипа на ЦСОП – Варна. Приемаме документи от специални педагози, логопеди, психолози и терапевти целогодишно.',
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Кариери"
        title="Станете част от екипа"
        intro="В ЦСОП – Варна работят специални педагози, логопеди, психолози и терапевти, отдадени на грижата за всяко дете. Ако споделяте нашата мисия, ще се радваме да се запознаем."
        tone="bl"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <Reveal
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '760px',
              margin: '0 auto 28px',
            }}
          >
            <span className="kicker">Нашият екип</span>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Хора, които правят разликата</h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              Работата с деца със специални образователни потребности изисква сърце, търпение и отдаденост. Нашият екип обединява специалисти от различни области, които всеки ден създават подкрепяща и топла среда за всяко дете.
            </p>
          </Reveal>

          <Reveal
            style={{
              background: 'linear-gradient(145deg, var(--green-soft), var(--sand-2))',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid var(--line)',
              maxWidth: '760px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="kicker" style={{ color: 'var(--green-deep)' }}>Кандидатстване</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '10px' }}>
                Изпратете ни своите документи
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                Изпратете CV, мотивационно писмо и копия от дипломи на място в канцеларията на ул. „Петко Стайнов“ №7 или на имейл: <b>info-400052@edu.mon.bg</b>.
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
