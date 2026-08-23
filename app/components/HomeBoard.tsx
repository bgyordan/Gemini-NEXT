'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import './homeboard.css'
type EventItem = { id: string; title: string; event_date: string; event_time: string | null; location: string | null };
type Activity = { kind: 'news' | 'doc' | 'gallery'; label: string; title: string; href: string; date: string };

const MONTHS = ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'];

const LINKS = [
  { name: 'МОН', href: 'https://www.mon.bg' },
  { name: 'РУО — Варна', href: 'https://ruo-varna.bg' },
  { name: 'РЦПППО — Варна', href: 'https://rcpppovarna.bg' },
  { name: 'ДАЗД', href: 'https://sacp.government.bg' },
  { name: 'НЕИСПУО', href: 'https://neispuo.mon.bg' },
  { name: 'УНИЦЕФ България', href: 'https://www.unicef.org/bulgaria' },
];

function supa() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key, headers: { apikey: key || '', Authorization: `Bearer ${key || ''}` } };
}

export default function HomeBoard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    (async () => {
      const { url, headers } = supa();
      if (!url) return;
      const today = new Date().toISOString().slice(0, 10);

      // Предстоящи събития (от днес нататък)
      try {
        const r = await fetch(`${url}/rest/v1/site_events?event_date=gte.${today}&order=event_date.asc&limit=4&select=*`, { headers });
        setEvents(await r.json());
      } catch {}

      // Последно добавено — новини + документи
      const acts: Activity[] = [];
      try {
        const rn = await fetch(`${url}/rest/v1/site_news?status=eq.published&order=published_at.desc&limit=3&select=id,title,published_at`, { headers });
        const news = await rn.json();
        (news || []).forEach((n: any) => acts.push({ kind: 'news', label: 'Новина', title: n.title, href: `/novini/${n.id}`, date: n.published_at }));
      } catch {}
      try {
        const rd = await fetch(`${url}/rest/v1/site_documents?order=created_at.desc&limit=2&select=name,section,created_at`, { headers });
        const docs = await rd.json();
        (docs || []).forEach((d: any) => {
          const sec = d.section === 'budget' ? '/za-nas/byudzhet-i-finansi' : d.section === 'admission' ? '/priem/proczedura' : '/za-nas/vatreshni-dokumenti';
          acts.push({ kind: 'doc', label: 'Документ', title: d.name, href: sec, date: d.created_at });
        });
      } catch {}
      acts.sort((a, b) => (a.date < b.date ? 1 : -1));
      setActivity(acts.slice(0, 4));
    })();
  }, []);

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  };

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
            <Link href="/sabitiya" className="hb-link">Всички събития →</Link>
          </motion.div>

          {/* ДЕСЕН ОВАЛ — Последно добавено */}
          <motion.div className="hb-card hb-activity"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}>
            <div className="hb-head">
              <span className="hb-spark">✦</span>
              <h3>Последно добавено</h3>
            </div>
            {activity.length === 0 ? (
              <p className="hb-empty">Съдържанието се обновява редовно.</p>
            ) : (
              <ul className="hb-act-list">
                {activity.map((a, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08 }}>
                    <Link href={a.href}>
                      <span className={`hb-ic hb-ic-${a.kind}`}>
                        {a.kind === 'news' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h5" strokeLinecap="round" /></svg>}
                        {a.kind === 'doc' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2h8l4 4v16H6z M14 2v4h4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        {a.kind === 'gallery' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h18v18H3z M3 15l5-5 4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </span>
                      <div className="hb-act-info">
                        <span className="hb-act-label">{a.label}</span>
                        <b>{a.title}</b>
                      </div>
                      <span className="hb-act-date">{fmtDate(a.date)}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>

        </div>

        {/* Лента с важни връзки */}
        <div className="hb-links">
          {LINKS.map((l, i) => (
            <motion.a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hb-link-pill"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              {l.name}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7 M8 7h9v9" /></svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
