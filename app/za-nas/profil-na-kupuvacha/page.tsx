import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import './profil.css';

export const metadata = {
  title: 'Профил на купувача — ЦСОП Варна',
  description:
    'Профилът на купувача на Център за специална образователна подкрепа – Варна се поддържа в ЦАИС ЕОП съгласно Закона за обществените поръчки.',
};

const BUYER_URL = 'https://app.eop.bg/buyer/27583';

export default function ProfilNaKupuvachaPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Обществени поръчки"
        title="Профил на купувача"
        intro="Профилът на купувача на ЦСОП Варна се поддържа в Централизираната автоматизирана информационна система „Електронни обществени поръчки“ (ЦАИС ЕОП)."
      />

      <div className="pk-page">
        <div className="wrap narrow">
          <p className="pk-lead">
            Считано от 01.01.2020 г. и съгласно Закона за обществените поръчки (ЗОП), обществените
            поръчки, пазарните консултации и цялата свързана документация на ЦСОП Варна се провеждат и
            публикуват електронно чрез ЦАИС ЕОП. Пълният профил на купувача, заедно с всички процедури,
            обявления, разяснения и протоколи, е публично достъпен на следния адрес:
          </p>

          <a
            href={BUYER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pk-card"
          >
            <div className="pk-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M8 4v5" />
              </svg>
            </div>
            <div className="pk-card-text">
              <span className="pk-card-kicker">ЦАИС ЕОП · Профил на купувача</span>
              <b className="pk-card-title">Профил на ЦСОП Варна</b>
              <span className="pk-card-url">{BUYER_URL}</span>
            </div>
            <svg className="pk-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <p className="pk-note">
            Връзката отваря профила в нов раздел на сайта на ЦАИС ЕОП. За въпроси и разяснения по
            конкретна процедура използвайте модула за комуникация в самата система.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
