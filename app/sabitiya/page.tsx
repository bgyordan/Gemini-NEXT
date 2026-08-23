import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import './sabitiya.css';

export const metadata = { title: 'Събития — ЦСОП Варна', description: 'Предстоящи и минали събития в ЦСОП – Варна.' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MONTHS = ['януари','февруари','март','април','май','юни','юли','август','септември','октомври','ноември','декември'];

type Ev = { id: string; title: string; event_date: string; event_time: string | null; location: string | null; description: string | null };

async function getEvents(): Promise<Ev[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const s = createClient(url, key);
    const { data } = await s.from('site_events').select('*').order('event_date', { ascending: false });
    return data ?? [];
  } catch { return []; }
}

function fmt(iso: string) { const d = new Date(iso); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; }

export default async function EventsPage() {
  const all = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((e) => e.event_date >= today).sort((a, b) => a.event_date < b.event_date ? -1 : 1);
  const past = all.filter((e) => e.event_date < today);

  return (
    <>
      <Header />
      <PageHero kicker="Актуално" title="Събития" intro="Предстоящи събития и архив на отминалите моменти в живота на центъра." />
      <div className="events-page"><div className="wrap narrow">
        <h2 className="ev-section-title">Предстоящи</h2>
        {upcoming.length === 0 ? <p className="ev-none">Очаквайте нови събития скоро.</p> : (
          <div className="ev-list">{upcoming.map((e) => (
            <div key={e.id} className="ev-item up">
              <div className="ev-date"><b>{new Date(e.event_date).getDate()}</b><span>{MONTHS[new Date(e.event_date).getMonth()].slice(0,3)}</span></div>
              <div className="ev-body"><b>{e.title}</b><span>{fmt(e.event_date)}{e.event_time && ` · ${e.event_time} ч.`}{e.location && ` · ${e.location}`}</span>{e.description && <p>{e.description}</p>}</div>
            </div>))}
          </div>)}

        {past.length > 0 && (<>
          <h2 className="ev-section-title muted">Архив</h2>
          <div className="ev-list">{past.map((e) => (
            <div key={e.id} className="ev-item past">
              <div className="ev-date"><b>{new Date(e.event_date).getDate()}</b><span>{MONTHS[new Date(e.event_date).getMonth()].slice(0,3)}</span></div>
              <div className="ev-body"><b>{e.title}</b><span>{fmt(e.event_date)}{e.location && ` · ${e.location}`}</span></div>
            </div>))}
          </div></>)}
      </div></div>
      <Footer />
    </>
  );
}
