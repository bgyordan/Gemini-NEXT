import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import ScheduleExplorer from '../ScheduleExplorer';

export const metadata = {
  title: 'Дневен режим — ЦСОП Варна',
  description:
    'Дневен режим на учениците и часове за терапия, обучение, хранене и отдих в ЦСОП – Варна.',
};

export default function DailySchedulePage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="За родители · Дневен режим"
        title="Ритъмът на деня в ЦСОП – Варна"
        intro="Балансиран дневен график, съчетаващ адаптирано обучение, индивидуални терапии, топло хранене и организиран отдих."
        tone="em"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <ScheduleExplorer />
        </div>
      </main>

      <Footer />
    </>
  );
}
