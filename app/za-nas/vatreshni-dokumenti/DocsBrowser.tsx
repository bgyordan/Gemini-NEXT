'use client';

import { useMemo, useState } from 'react';
import DocIcon from './DocIcon';
import type { DocRow } from './page';

type Cat = { key: string; title: string; icon: string; color: string };

const CATEGORIES: Cat[] = [
  { key: 'strategy', title: 'Стратегическо планиране', icon: 'target', color: '#7c3aed' },
  { key: 'annual', title: 'Годишно планиране', icon: 'calendar', color: '#2563eb' },
  { key: 'rules', title: 'Правилници и вътрешни правила', icon: 'scroll', color: '#0d9488' },
  { key: 'edu', title: 'Образователна и терапевтична дейност', icon: 'handshake', color: '#db2777' },
  { key: 'safety', title: 'Безопасност и сигурност', icon: 'shield', color: '#ea580c' },
  { key: 'data', title: 'Защита на данните и информацията', icon: 'lock', color: '#475569' },
  { key: 'other', title: 'Други документи', icon: 'scroll', color: '#64748b' },
];
const CAT_BY_KEY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

function classify(name: string): string {
  const n = name.toLowerCase();
  if (/стратег/.test(n)) return 'strategy';
  if (/годиш(ен|на)\s+(план|програма)|план за дейност|дневен режим|график|седмичн/.test(n)) return 'annual';
  if (/правилник|вътрешни правила|пропуск|вътрешния ред|кодекс|етичен/.test(n)) return 'rules';
  if (/подкрепа|терап|образоват|обучени|учебн|иуп/.test(n)) return 'edu';
  if (/безопас|заплаха|пожар|бедств|терорист|евакуац|извънред|сигурност|кризи/.test(n)) return 'safety';
  if (/лични данни|gdpr|защита на.*данни|зздл|сигнал|достъп до.*информаци|зздлпспоин/.test(n)) return 'data';
  return 'other';
}

export default function DocsBrowser({ docs }: { docs: DocRow[] }) {
  const [q, setQ] = useState('');
  const [year, setYear] = useState<string>('all');

  const years = useMemo(() => {
    const set = new Set<string>();
    docs.forEach((d) => d.academic_year && set.add(d.academic_year));
    return Array.from(set).sort().reverse();
  }, [docs]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return docs.filter((d) => {
      const okYear = year === 'all' || d.academic_year === year;
      const okQuery = query === '' || d.name.toLowerCase().includes(query);
      return okYear && okQuery;
    });
  }, [docs, q, year]);

  const keyOf = (d: DocRow) => ((d as any).category && CAT_BY_KEY[(d as any).category]) ? (d as any).category : classify(d.name);
  const groups = useMemo(() => {
    return CATEGORIES
      .map((c) => ({ cat: c, items: filtered.filter((d) => keyOf(d) === c.key) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

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

      {years.length > 0 && (
        <div className="doc-years">
          <button className={`doc-year ${year === 'all' ? 'on' : ''}`} onClick={() => setYear('all')}>Всички</button>
          {years.map((y) => (
            <button key={y} className={`doc-year ${year === y ? 'on' : ''}`} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
      )}

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
                  <span className="doc-txt">
                    {d.academic_year && <span className="doc-tag">{d.academic_year}</span>}
                    <b>{d.name}</b>
                  </span>
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
