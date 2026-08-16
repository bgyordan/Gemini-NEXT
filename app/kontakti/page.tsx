import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Footer from '../components/Footer';
import './kontakti.css';

export const metadata = {
  title: 'Контакти — ЦСОП Варна',
  description:
    'Свържете се с Център за специална образователна подкрепа – Варна: телефони, работно време, имейл и местоположение на ул. „Петко Стайнов" 7.',
};

const phones = [
  { name: 'Светлана Иванова', role: 'Директор', tel: '+359878521823', display: '+359 878 521 823' },
  { name: 'Силвия Кьошкерян', role: 'Зам.-директор УД', tel: '+359882699867', display: '+359 882 699 867' },
  { name: 'Йордан Йорданов', role: 'Зам.-директор АСД', tel: '+359893405737', display: '+359 893 405 737' },
  { name: 'Деловодство', role: 'Администрация', tel: '+359888490771', display: '+359 888 490 771' },
];

const hours = [
  { title: 'Работно време на центъра', time: 'Понеделник – Петък · 08:00 – 17:30', icon: 'clock' },
  { title: 'Приемане на документи', time: 'Деловодство · 08:00 – 16:30', icon: 'doc' },
  { title: 'Приемно време — Директор', time: 'Вторник · 09:00 – 10:00', icon: 'user' },
];

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.18841078835!2d27.897481!3d43.225869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4548a1b90abe7%3A0x74a7a17d27cf65ee!2z0YPQuy4g4oCe0J_QtdGC0LrQviDQodGC0LDQudC90L7QstKAnCA3LCA5MDA5INCh0LXQstC10YDQvdCwINC_0YDQvtC80LjRiNC70LXQvdCwINC30L7QvdCwLCDQktCw0YDQvdCw!5e0!3m2!1sbg!2sbg!4v1674036920647!5m2!1sbg!2sbg';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function HourIcon({ name }: { name: string }) {
  if (name === 'doc')
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" />
      </svg>
    );
  if (name === 'user')
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function ContactsPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="Контакти"
        title="Свържете се с нас"
        intro="Тук сме, за да отговорим на вашите въпроси и да ви съдействаме. Обадете се, пишете ни или заповядайте на място."
        tone="bl"
      />

      <div className="contacts">
        <div className="wrap contacts-grid">
          {/* PHONES */}
          <div className="phones-col">
            <Reveal className="col-head">
              <span className="lead-kicker">ЕКИП И КОНТАКТИ</span>
              <h2>Телефони за връзка</h2>
            </Reveal>
            <div className="phone-cards">
              {phones.map((p, i) => (
                <Reveal as="div" key={p.tel} className="phone-card" delay={((i % 2) + 1) as 1 | 2}>
                  <a href={`tel:${p.tel}`} className="phone-ic" aria-label={`Обаждане на ${p.name}`}>
                    <PhoneIcon />
                  </a>
                  <div className="phone-info">
                    <span className="p-role">{p.role.toUpperCase()}</span>
                    <b className="p-name">{p.name}</b>
                    <a href={`tel:${p.tel}`} className="p-num">{p.display}</a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* HOURS + EMAIL */}
          <div className="side-col">
            <Reveal className="col-head">
              <span className="lead-kicker">ГРАФИК</span>
              <h2>Работно време</h2>
            </Reveal>
            <div className="hours">
              {hours.map((h, i) => (
                <Reveal as="div" key={h.title} className="hour" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <span className="hour-ic"><HourIcon name={h.icon} /></span>
                  <div>
                    <b>{h.title}</b>
                    <span>{h.time}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="email-card">
              <a href="mailto:info-400052@edu.mon.bg">
                <span className="email-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <div>
                  <span className="email-label">ИМЕЙЛ</span>
                  <b>info-400052@edu.mon.bg</b>
                </div>
              </a>
            </Reveal>
          </div>
        </div>

        {/* MAP */}
        <div className="wrap">
          <Reveal className="map-wrap">
            <div className="map-head">
              <span className="lead-kicker">КЪДЕ СЕ НАМИРАМЕ</span>
              <h2>гр. Варна, ул. „Петко Стайнов“ 7</h2>
            </div>
            <div className="map-frame">
              <iframe
                src={MAP_SRC}
                title="Карта — ЦСОП Варна"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  );
}
