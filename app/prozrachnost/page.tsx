import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import './prozrachnost.css';

export const metadata = {
  title: 'Прозрачност — ЦСОП Варна',
  description:
    'Бюджет, обществени поръчки, вътрешни документи, достъп до информация и защита на личните данни — публично и на едно място.',
};

const ITEMS = [
  {
    title: 'Вътрешни документи',
    desc: 'Правилници, стратегии, планове и политики на центъра.',
    href: '/za-nas/vatreshni-dokumenti',
    path: 'M6 2h8l4 4v16H6z M14 2v4h4',
  },
  {
    title: 'Бюджет и финанси',
    desc: 'Бюджети, тримесечни и годишни отчети — прозрачно в числата.',
    href: '/za-nas/byudzhet-i-finansi',
    path: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2',
  },
  {
    title: 'Профил на купувача',
    desc: 'Обществени поръчки и процедури в ЦАИС ЕОП.',
    href: '/za-nas/profil-na-kupuvacha',
    path: 'M9 4h6v2h4v15H5V6h4z M9 4v2h6',
  },
  {
    title: 'Достъп до обществена информация',
    desc: 'Заявления, ред за достъп и годишни отчети по ЗДОИ.',
    href: '/za-nas/dostap-do-obshtestvena-informatsiya',
    path: 'M4 4h11l5 5v11H4z M15 4v5h5 M8 13h8 M8 17h5',
  },
  {
    title: 'Защита на личните данни',
    desc: 'Политика за поверителност, ДЛЗД и правата Ви по GDPR.',
    href: '/za-nas/zashtita-na-lichnite-danni',
    path: 'M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z',
  },
];

export default function ProzrachnostPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Отчетност"
        title="Прозрачност"
        intro="Бюджет, обществени поръчки, документи и защита на данните — открито и на едно място, както подобава на публична институция."
        tone="bl"
      />

      <div className="prz-page">
        <div className="wrap narrow">
          <div className="prz-grid">
            {ITEMS.map((it) => (
              <a key={it.href} href={it.href} className="prz-card">
                <div className="prz-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={it.path} />
                  </svg>
                </div>
                <div className="prz-card-body">
                  <b className="prz-card-title">{it.title}</b>
                  <span className="prz-card-desc">{it.desc}</span>
                </div>
                <svg className="prz-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
