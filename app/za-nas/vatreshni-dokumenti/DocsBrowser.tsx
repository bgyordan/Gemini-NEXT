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

  const available = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        cat: c,
        count: filtered.filter((d) => keyOf(d) === c.key).length,
      })).filter((g) => g.count > 0),
    [filtered]
  );

  const flatDocs = useMemo(
    () => filtered.filter((d) => active === 'all' || keyOf(d) === active),
    [filtered, active]
  );

  return (
    <>
      {/* Search */}
      <div className="doc-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="text"
          placeholder="Търсене на документ по име…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        {q && (
          <button className="clear" onClick={() => setQ('')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters */}
      {available.length > 0 && (
        <div className="chip-row">
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

      {/* Documents */}
      {flatDocs.length === 0 ? (
        <div className="doc-empty">
          {docs.length === 0
            ? 'Все още няма качени документи.'
            : 'Няма документ, който да отговаря на търсенето.'}
        </div>
      ) : (
        <div className="docs-list">
          {flatDocs.map((d) => {
            const cat = CAT_BY_KEY[keyOf(d)] || CATEGORIES[CATEGORIES.length - 1];

            return (
              <a
                key={d.id}
                href={d.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-card"
              >
                <div className="doc-card-icon">
                  <DocIcon name={cat.icon} />
                </div>

                <div className="doc-card-content">
                  <b>{d.name}</b>
                  <span className="doc-card-type">PDF документ</span>
                </div>

                <div className="doc-card-download">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                </div>
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
    <button onClick={onClick} className={`chip ${active ? 'chip-active' : ''}`}>
      {label}
      <span className="chip-count">{count}</span>
    </button>
  );
}
