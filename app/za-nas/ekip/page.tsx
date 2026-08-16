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
          <div
            style={{
              marginBottom: '48px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
              position: 'relative',
              maxHeight: '360px',
            }}
          >
            <img
              src="/images/team_care.jpg"
              alt="Специалисти и преподаватели в ЦСОП Варна"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              referrerPolicy="no-referrer"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(20, 30, 25, 0.75) 0%, rgba(20, 30, 25, 0.1) 60%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '32px 36px',
                color: '#fff',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#D3EBDD',
                    fontWeight: 600,
                  }}
                >
                  ПРОФЕСИОНАЛИЗЪМ И ОТДАДЕНОСТ
                </span>
                <h2
                  style={{
                    color: '#fff',
                    fontFamily: 'var(--serif)',
                    fontSize: '26px',
                    margin: '6px 0 0',
                    fontWeight: 500,
                  }}
                >
                  Екипът, който превръща всяко усилие в споделена победа
                </h2>
              </div>
            </div>
          </div>

          <TeamBrowser />
        </div>
      </div>
      <Footer />
    </>
  );
}
