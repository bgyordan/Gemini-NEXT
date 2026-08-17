import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import AdmissionWizard from '../AdmissionWizard';
import AdmissionDocs from './AdmissionDocs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Процедура и документи за прием — ЦСОП Варна',
  description:
    'Пълно ръководство за процедурата по прием и необходимите документи за записване в ЦСОП – Варна.',
};

export default function ProcedurePage() {
  return (
    <>
      <Header />
      <PageHero
        kicker="Прием · Процедура"
        title="Процедура и необходими документи за прием"
        intro="Научете всички детайли за стъпките за кандидатстване, документите от РЦПППО – Варна и индивидуалната оценка."
        tone="bl"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <AdmissionWizard />

          <AdmissionDocs />

          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="/priem/poseshtenie" className="btn btn-warm">
              Планирайте посещение и оглед на кабинетите
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
