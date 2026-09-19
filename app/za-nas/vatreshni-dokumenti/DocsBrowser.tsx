'use client';

import { useMemo, useState } from 'react';
import DocIcon from './DocIcon';
import type { DocRow } from './page';

type Cat = { key: string; title: string; icon: string };

const CATEGORIES: Cat[] = [
  { key: 'strategy', title: 'Стратегия и планове', icon: 'target' },
  { key: 'rules', title: 'Правилници и вътрешни правила', icon: 'scroll' },
  { key: 'programs', title: 'Програми', icon: 'calendar' },
  { key: 'ethics', title: 'Етика и приобщаване', icon: 'handshake' },
  { key: 'safety', title: 'Безопасност', icon: 'shield' },
  { key: 'data', title: 'Защита на данните', icon: 'lock' },
  { key: 'other', title: 'Общи документи', icon: 'scroll' },
];

const CAT_BY_KEY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

const getCategoryKey = (d: DocRow): string => {
  const c = (d as { category?: string }).category;
  return c && CAT_BY_KEY[c] ? c : 'other';
};

export default function DocsBrowser({ docs }: { docs: DocRow[] }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState<string>('all');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return docs.filter((d) => query === '' || d.name.toLowerCase().includes(query));
  }, [docs, q]);

  const available = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        cat: c,
        count: filtered.filter((d) => getCategoryKey(d) === c.key).length,
      })).filter((g) => g.count > 0),
    [filtered]
  );

  const flatDocs = useMemo(
    () => filtered.filter((d) => active === 'all' || getCategoryKey(d) === active),
    [filtered, active]
  );

  const handleSearchChange = (value: string) => {
    setQ(value);
    if (active !== 'all') {
      setActive('all');
    }
  };

  return (
    <>
      <div className="doc-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Търсене на документ по име…"
          value={q}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Търсене в документите"
        />
        {q && (
          <button className="clear" onClick={() => handleSearchChange('')} aria-label="Изчисти">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Хоризонтален филтър по категория */}
      {available.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '4px 0 22px' }}>
          <FilterChip
            label="Всички"
            count={filtered.length}
            active={active === 'all'}
            onClick={() => setActive('all')}
          />
          {available.map(({ cat, count }) => (
            <FilterChip
              key={cat.key}
              label={cat.title}
              count={count}
              active={active === cat.key}
              onClick={() => setActive(cat.key)}
            />
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
            const catKey = getCategoryKey(d);
            const cat = CAT_BY_KEY[catKey] || CATEGORIES[CATEGORIES.length - 1];
            return (
              <a
                key={d.id}
                href={d.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-row"
              >
                <span className="doc-ic">
                  <DocIcon name={cat.icon} />
                </span>
                <span className="doc-txt">
                  <b>{d.name}</b>
                </span>
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

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        cursor: 'pointer',
        padding: '8px 14px',
        borderRadius: '999px',
        fontSize: '13.5px',
        fontWeight: 500,
        transition: 'all .15s',
        whiteSpace: 'nowrap',
        border: `1px solid ${active ? '#0f2240' : '#e2e8f0'}`,
        background: active ? '#0f2240' : '#fff',
        color: active ? '#fff' : '#475569',
      }}
    >
      {label}
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          borderRadius: '999px',
          padding: '1px 7px',
          lineHeight: 1.6,
          background: active ? 'rgba(255,255,255,.2)' : '#f1f5f9',
          color: active ? '#fff' : '#64748b',
        }}
      >
        {count}
      </span>
    </button>
  );
}
