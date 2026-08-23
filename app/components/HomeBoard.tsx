'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import './homeboard.css';

type EventItem = { id: string; title: string; event_date: string; event_time: string | null; location: string | null };

const MONTHS = ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'];

const LINKS = [
  { name: 'МОН', desc: 'Министерство на образованието', href: 'https://www.mon.bg' },
  { name: 'РУО — Варна', desc: 'Регионално управление', href: 'https://ruo-varna.bg' },
  { name: 'РЦПППО — Варна', desc: 'Регионален център', href: 'https://rcpppovarna.bg' },
  { name: 'ДАЗД', desc: 'Държавна агенция за закрила на детето', href: 'https://sacp.government.bg' },
  { name: 'НЕИСПУО', desc: 'Национална информационна система', href: 'https://neispuo.mon.bg' },
  { name: 'УНИЦЕФ България', desc: 'Детски фонд на ООН', href: 'https://www.unicef.org/bulgaria' },
];

export default function HomeBoard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;
      const today = new Date().toISOString().slice(0, 10);
      try {
        const r = await fetch(`${url}/rest/v1/site_events?event_date=gte.${today}&order=event_date.asc&limit=4&select=*`,
          { headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: 'count=exact' } });
        const cr = r.headers.get('content-range'); // формат: 0-3/12
        if (cr && cr.includes('/')) setTotal(parseInt(cr.split('/')[1]) || 0);
        setEvents(await r.json());
      } catch {}
    })();
  }, []);

  return (
    <section className="hboard">
      <div className="wrap">
        <div className="hboard-grid">

          {/* ЛЯВ ОВАЛ — Предстоящи събития */}
          <motion.div className="hb-card hb-events"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="hb-head">
              <span className="hb-pulse" />
              <h3>Предстоящи събития</h3>
            </div>
            {events.length === 0 ? (
              <p className="hb-empty">Очаквайте предстоящи събития скоро.</p>
            ) : (
              <ul className="hb-events-list">
                {events.map((e, i) => (
                  <motion.li key={e.id}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                    <div className="hb-date">
                      <b>{new Date(e.event_date).getDate()}</b>
                      <span>{MONTHS[new Date(e.event_date).getMonth()]}</span>
                    </div>
                    <div className="hb-ev-info">
                      <b>{e.title}</b>
                      <span>
                        {e.event_time && <>{e.event_time} ч.</>}
                        {e.event_time && e.location && ' · '}
                        {e.location}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
            <Link href="/sabitiya" className="hb-link">{total > events.length ? `Виж всички събития (${total}) →` : 'Всички събития →'}</Link>
          </motion.div>

          {/* ДЕСЕН ОВАЛ — Полезни връзки */}
          <motion.div className="hb-card hb-links-card"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}>
            <div className="hb-head">
              <span className="hb-spark">✦</span>
              <h3>Полезни връзки</h3>
            </div>
            <ul className="hb-links-list">
              {LINKS.map((l, i) => (
                <motion.li key={l.href}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    <div className="hb-link-info">
                      <b>{l.name}</b>
                      <span>{l.desc}</span>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7 M8 7h9v9" /></svg>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
