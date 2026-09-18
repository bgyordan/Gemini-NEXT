'use client';

import { useMemo, useState } from 'react';
import DocIcon from './DocIcon';
import type { DocRow } from './page';

type Cat = { key: string; title: string; icon: string; color: string };

const CATEGORIES: Cat[] = [
  { key: 'strategy', title: 'Стратегия и планове', icon: 'target', color: '#7c3aed' },
  { key: 'rules', title: 'Правилници и вътрешни правила', icon: 'scroll', color: '#0d9488' },
  { key: 'programs', title: 'Програми', icon: 'calendar', color: '#2563eb' },
  { key: 'ethics', title: 'Етика и приобщаване', icon: 'handshake', color: '#db2777' },
  { key: 'safety', title: 'Безопасност', icon: 'shield', color: '#ea580c' },
  { key: 'data', title: 'Защита на данните', icon: 'lock', color: '#475569' },
  { key: 'other', title: 'Общи документи', icon: 'scroll', color: '#64748b' },
];
const CAT_BY_KEY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export default function DocsBrowser({ docs }: { docs: DocRow[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return docs.filter((d) => query === '' || d.name.toLowerCase().includes(query));
  }, [docs, q]);

  const keyOf = (d: DocRow) => {
    const c = (d as any).category as string | null;
    return c && CAT_BY_KEY[c] ? c : 'other';
  };
  const groups = useMemo(
    () => CATEGORIES.map((c) => ({ cat: c, items: filtered.filter((d) => keyOf(d) === c.key) })).filter((g) => g.items.length > 0),
    [filtered]
  );

  return (
    <>
      <div className="doc-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input type="text" placeholder="Търсене на документ по име…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Търсене в документите" />
        {q && (
          <button className="clear" onClick={() => setQ('')} aria-label="Изчисти">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <div className="doc-empty">
          {docs.length === 0 ? 'Все още няма качени документи.' : 'Няма документ, който да отговаря на търсенето.'}
        </div>
      ) : (
        groups.map(({ cat, items }) => (
          <section className="doc-group" key={cat.key}>
            <div className="doc-group-head">
              <span className="doc-group-ic" style={{ background: `${cat.color}14`, color: cat.color, border: `1px solid ${cat.color}33` }}>
                <DocIcon name={cat.icon} />
              </span>
              <span className="doc-group-title">{cat.title}</span>
              <span className="doc-group-count">{items.length}</span>
            </div>
            <div className="docs-list">
              {items.map((d) => (
                <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="doc-row" style={{ borderLeft: `3px solid ${cat.color}` }}>
                  <span className="doc-ic" style={{ color: cat.color }}><DocIcon name={cat.icon} /></span>
                  <span className="doc-txt"><b>{d.name}</b></span>
                  <span className="doc-dl">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                    </svg>
                    <span>PDF</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
