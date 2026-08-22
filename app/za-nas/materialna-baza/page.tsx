import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import BazaShowcase from './BazaShowcase';
import './baza.css';

export const metadata = {
  title: 'Материална база — ЦСОП Варна',
  description:
    'Специализирана среда на ЦСОП – Варна: учебни кабинети, терапевтични зали, кулинарен кабинет и озеленен училищен двор.',
};

export default function MaterialnaBazaPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Материална база"
        title="Специализирана среда, създадена с грижа"
        intro="На ул. „Петко Стайнов“ №7 всяко кътче е обмислено за развитието, комфорта и безопасността на децата."
      />
      <div className="baza-page">
        <div className="wrap">
          <BazaShowcase />
        </div>
      </div>
      <Footer />
    </>
  );
}
