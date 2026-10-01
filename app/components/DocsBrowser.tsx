'use client';

import { useMemo, useState } from 'react';
import type { DocRow } from '../../lib/data';
import DocRows from './DocRows';

const CATEGORIES = [
  { key: 'strategy', title: 'Стратегия и планове' },
  { key: 'rules', title: 'Правилници' },
  { key: 'programs', title: 'Програми' },
  { key: 'ethics', title: 'Етика и приобщаване' },
  { key: 'safety', title: 'Безопасност' },
  { key: 'data', title: 'Защита на данните' },
  { key: 'other', title: 'Общи документи' },
];
const KEYS = new Set(CATEGORIES.map((c) => c.key));
const catOf = (d: DocRow) => (d.category && KEYS.has(d.category) ? d.category : 'other');

// Търсене + филтър по категория върху списък с документи.
export default function DocsBrowser({ docs, emptyText = 'Все още няма качени документи.' }: { docs: DocRow[]; emptyText?: string }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState('all');

  const found = useMemo(() => {
    const query = q.trim().toLowerCase();
    return docs.filter((d) => !query || d.name.toLowerCase().includes(query));
  }, [docs, q]);
  const cats = CATEGORIES.map((c) => ({ ...c, n: found.filter((d) => catOf(d) === c.key).length })).filter((c) => c.n > 0);
  const shown = found.filter((d) => active === 'all' || catOf(d) === active);

  if (docs.length === 0) return <p className="empty">{emptyText}</p>;

  return (
    <div className="docs-browser">
      {docs.length > 6 && (
        <div className="db-tools">
          <label className="db-search">
            <span className="sr-only">Търсене в документите</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <input type="search" placeholder="Търсене по име" value={q} onChange={(e) => { setQ(e.target.value); setActive('all'); }} />
          </label>
          {cats.length > 1 && (
            <div className="chips" role="group" aria-label="Категория">
              <button type="button" className={active === 'all' ? 'on' : ''} aria-pressed={active === 'all'} onClick={() => setActive('all')}>Всички <span>{found.length}</span></button>
              {cats.map((c) => (
                <button key={c.key} type="button" className={active === c.key ? 'on' : ''} aria-pressed={active === c.key} onClick={() => setActive(c.key)}>
                  {c.title} <span>{c.n}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {shown.length === 0 ? <p className="empty">Няма документ с такова име.</p> : <DocRows docs={shown} />}
    </div>
  );
}
