import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import TeamBrowser from './TeamBrowser';
import { TEAM } from './teamData';
import './ekip.css';

export const metadata = {
  title: 'Екип — ЦСОП Варна',
  description:
    'Висококвалифицирани специалисти, посветени на мисията да подкрепят развитието и потенциала на всяко дете в ЦСОП – Варна.',
};

export default function TeamPage() {
  const total = TEAM.reduce((n, g) => n + g.members.length, 0);

  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Екип"
        title="Хората зад грижата"
        intro={`Висококвалифицирани специалисти, посветени на мисията да подкрепят развитието и потенциала на всяко дете. Заедно сме ${total} души в един екип.`}
        tone="bl"
      />
      <div className="team-page">
        <div className="wrap">
          <TeamBrowser />
        </div>
      </div>
      <Footer />
    </>
  );
}
