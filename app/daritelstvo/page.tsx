import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export const metadata = {
  title: 'Дарителство и подкрепа — ЦСОП Варна',
  description:
    'Подкрепете децата и младежите със специални образователни потребности в ЦСОП – Варна. Всяко дарение обновява учебната и терапевтична среда.',
};

export default function DonationsPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="Подкрепете ни"
        title="Заедно създаваме по-добра среда за децата"
        intro="Вашата подкрепа помага за закупуване на специализирано оборудване, материали за арт терапия, поддръжка на сензорната зала и организиране на образователни събития."
        tone="em"
      />

      <main style={{ padding: '60px 0 100px' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '60px',
            }}
          >
            <Reveal
              style={{
                background: '#fff',
                padding: '36px',
                borderRadius: '24px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--green-deep)',
                  marginBottom: '12px',
                }}
              >
                БАНКОВА СМЕТКА (IBAN)
              </span>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '22px',
                  marginBottom: '16px',
                }}
              >
                Дарения по банков път
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '20px' }}>
                Можете да направите целево дарение към Училищното настоятелство при ЦСОП – Варна за оборудване или терапевтични пособия.
              </p>

              <div
                style={{
                  background: 'var(--sand-2)',
                  padding: '20px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: 'var(--ink)',
                }}
              >
                <div><b>Получател:</b> Училищно настоятелство към ЦСОП – Варна</div>
                <div><b>IBAN:</b> BG12 UNCR 7000 1523 4891 00</div>
                <div><b>BIC / SWIFT:</b> UNCRBGSF</div>
                <div><b>Основание:</b> Дарение за дейността на ЦСОП – Варна</div>
              </div>
            </Reveal>

            <Reveal
              style={{
                background: '#fff',
                padding: '36px',
                borderRadius: '24px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-sm)',
              }}
              delay={1}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--clay-deep)',
                  marginBottom: '12px',
                }}
              >
                МАТЕРИАЛНИ ДАРЕНИЯ
              </span>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '22px',
                  marginBottom: '16px',
                }}
              >
                Материали и пособия
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '20px' }}>
                Центърът с благодарност приема образователни играчки, сензорни материали, пособия за рисуване и керамика, както и спортни уреди.
              </p>

              <ul
                style={{
                  paddingLeft: '20px',
                  color: 'var(--ink-2)',
                  fontSize: '14.5px',
                  lineHeight: '1.7',
                }}
              >
                <li>Материали за арт терапия (глина, четки, бои, картони)</li>
                <li>Сензорни и тактилни играчки за развитие на моториката</li>
                <li>Кухненски консумативи за обучителния кабинет</li>
                <li>Книжки с едри илюстрации и учебни табла</li>
              </ul>
            </Reveal>
          </div>

          <Reveal
            style={{
              background: 'linear-gradient(145deg, var(--green-soft), var(--sand-2))',
              borderRadius: '28px',
              padding: '44px',
              border: '1px solid var(--line)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', marginBottom: '12px' }}>
              Имате идея за съвместен проект или кампания?
            </h3>
            <p style={{ color: 'var(--ink-2)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '15.5px' }}>
              Свържете се с нашия екип, за да обсъдим как заедно можем да създадем най-голяма стойност за децата.
            </p>
            <a href="/kontakti" className="btn btn-primary">
              Свържете се с нас
            </a>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
