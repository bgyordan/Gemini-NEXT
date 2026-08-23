'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

type Ev = { id: string; title: string; event_date: string; event_time: string | null; location: string | null; description: string | null };

const MONTHS = ['яну','фев','мар','апр','май','юни','юли','авг','сеп','окт','ное','дек'];

export default function EventsManager() {
  const supabase = createSupabaseBrowser();
  const [events, setEvents] = useState<Ev[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await supabase.from('site_events').select('*').order('event_date', { ascending: false });
    setEvents(data ?? []);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) { setMsg('Попълнете заглавие и дата.'); return; }
    setBusy(true); setMsg('');
    const { error } = await supabase.from('site_events').insert({
      title: title.trim(), event_date: date, event_time: time.trim() || null,
      location: location.trim() || null, description: description.trim() || null,
    });
    setBusy(false);
    if (error) { setMsg('Грешка: ' + error.message); return; }
    setMsg('✓ Събитието е добавено!');
    setTitle(''); setDate(''); setTime(''); setLocation(''); setDescription('');
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Изтриване на това събитие?')) return;
    await supabase.from('site_events').delete().eq('id', id);
    load();
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="news-mgr">
      <section className="admin-panel">
        <h2>Ново събитие</h2>
        <form onSubmit={add} className="admin-form">
          <label><span>Заглавие</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="напр. Родителска среща" />
          </label>
          <label><span>Дата</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label><span>Час (по избор)</span>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="напр. 12:00" />
          </label>
          <label><span>Място (по избор)</span>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="напр. в сградата на ЦСОП – Варна" />
          </label>
          <label><span>Описание (по избор)</span>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Кратко описание…" />
          </label>
          {msg && <div className="admin-msg">{msg}</div>}
          <button type="submit" disabled={busy} className="admin-btn">{busy ? 'Добавяне…' : 'Добави събитие'}</button>
        </form>
      </section>

      <section className="admin-list">
        <h2>Събития ({events.length})</h2>
        {events.length === 0 ? <p className="admin-empty">Все още няма събития.</p> : (
          <div className="admin-docs">
            {events.map((e) => {
              const isPast = e.event_date < today;
              return (
                <div key={e.id} className="admin-doc">
                  <div className="admin-doc-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="evm-date">
                      <b>{new Date(e.event_date).getDate()}</b>
                      <span>{MONTHS[new Date(e.event_date).getMonth()]}</span>
                    </div>
                    <div>
                      <b>{e.title}</b>
                      <span>{e.event_time && `${e.event_time} ч. `}{e.location}{isPast && ' · (минало)'}</span>
                    </div>
                  </div>
                  <div className="admin-doc-actions">
                    <button className="act-del" onClick={() => remove(e.id)}>Изтрий</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
