import PageHero from '../components/PageHero';
import { getEvents, eventLastDay, eventDay, eventMonth, fmtEventDates, fmtEventTime } from '../../lib/data';

export const metadata = { title: 'Събития — ЦСОП Варна', description: 'Предстоящи и минали събития в ЦСОП – Варна.' };
export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const all = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((e) => eventLastDay(e) >= today);   // с период — до последния ден
  const past = all.filter((e) => eventLastDay(e) < today).reverse();

  return (
    <>
      <PageHero path="/sabitiya" title="Събития" intro="Предстоящите събития в центъра и архив на отминалите." />
      <section className="section tone-lime">
        <div className="wrap">
          <h2 style={{ marginBottom: 16 }}>Предстоящи</h2>
          {upcoming.length === 0 ? <p className="empty">Няма обявени предстоящи събития.</p> : (
            <ul className="ev-list">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <span className={`ev-day${e.event_end_date ? ' ev-range' : ''}`}><b>{eventDay(e)}</b>{eventMonth(e)}</span>
                  <div>
                    <h3>{e.title}</h3>
                    <p className="muted">{[fmtEventDates(e), fmtEventTime(e), e.location].filter(Boolean).join(', ')}</p>
                    {e.description && <p className="ev-desc">{e.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {past.length > 0 && (
            <>
              <h2 style={{ margin: '48px 0 16px' }}>Отминали</h2>
              <ul className="ev-list past">
                {past.map((e) => (
                  <li key={e.id}>
                    <span className={`ev-day${e.event_end_date ? ' ev-range' : ''}`}><b>{eventDay(e)}</b>{eventMonth(e)}</span>
                    <div>
                      <h3>{e.title}</h3>
                      <p className="muted">{[fmtEventDates(e), e.location].filter(Boolean).join(', ')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
