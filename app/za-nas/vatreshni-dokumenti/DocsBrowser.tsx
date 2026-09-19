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
  const [active, setActive] = useState<string>('all');

  const keyOf = (d: DocRow) => {
    const c = (d as any).category as string | null;
    return c && CAT_BY_KEY[c] ? c : 'other';
  };

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return docs.filter((d) => query === '' || d.name.toLowerCase().includes(query));
  }, [docs, q]);

  // Кои категории реално имат документи (за лентата с филтри)
  const available = useMemo(
    () => CATEGORIES.map((c) => ({ cat: c, count: filtered.filter((d) => keyOf(d) === c.key).length })).filter((g) => g.count > 0),
    [filtered]
  );

  // Документите за показване според избрания филтър (без групови заглавия)
  const flatDocs = useMemo(
    () => filtered.filter((d) => active === 'all' || keyOf(d) === active),
    [filtered, active]
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

      {/* Хоризонтален филтър по категория */}
      {available.length > 0 && (
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '4px 0 22px',
          }}
        >
          <FilterChip label="Всички" count={filtered.length} color="#0f2240" active={active === 'all'} onClick={() => setActive('all')} />
          {available.map(({ cat, count }) => (
            <FilterChip key={cat.key} label={cat.title} count={count} color={cat.color} active={active === cat.key} onClick={() => setActive(cat.key)} />
          ))}
        </div>
      )}

      {flatDocs.length === 0 ? (
        <div className="doc-empty">
          {docs.length === 0 ? 'Все още няма качени документи.' : 'Няма документ, който да отговаря на търсенето.'}
        </div>
      ) : (
        <div className="docs-list">
          {flatDocs.map((d) => {
            const cat = CAT_BY_KEY[keyOf(d)] || CATEGORIES[CATEGORIES.length - 1];
            return (
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
            );
          })}
        </div>
      )}
    </>
  );
}

function FilterChip({ label, count, color, active, onClick }: { label: string; count: number; color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px', cursor: 'pointer',
        padding: '8px 14px', borderRadius: '999px', fontSize: '13.5px', fontWeight: 500,
        transition: 'all .15s', whiteSpace: 'nowrap',
        border: `1px solid ${active ? color : '#e2e8f0'}`,
        background: active ? color : '#fff',
        color: active ? '#fff' : '#475569',
      }}
    >
      {label}
      <span
        style={{
          fontSize: '11px', fontWeight: 600, borderRadius: '999px', padding: '1px 7px', lineHeight: 1.6,
          background: active ? 'rgba(255,255,255,.22)' : `${color}14`,
          color: active ? '#fff' : color,
        }}
      >
        {count}
      </span>
    </button>
  );
}
