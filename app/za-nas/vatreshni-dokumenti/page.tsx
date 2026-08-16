import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import DocsBrowser from './DocsBrowser';
import './docs.css';

export const metadata = {
  title: 'Вътрешни документи — ЦСОП Варна',
  description:
    'Актуална нормативна уредба, правилници, планове и стратегии за развитие на Център за специална образователна подкрепа – Варна.',
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Документи"
        title="Вътрешни документи"
        intro="Актуална нормативна уредба, правилници и планове за развитие на центъра. Всеки документ се отваря като PDF."
      />
      <div className="docs-page">
        <div className="wrap narrow">
          <DocsBrowser />
        </div>
      </div>
      <Footer />
    </>
  );
}
