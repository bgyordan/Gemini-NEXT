'use client';

import { useMemo, useState } from 'react';
import DocIcon from './DocIcon';
import type { DocRow } from './page';

const PER_PAGE = 10;

export default function DocsBrowser({ docs }: { docs: DocRow[] }) {
  const [q, setQ] = useState('');
  const [year, setYear] = useState<string>('all');
  const [page, setPage] = useState(1);

  // Уникалните учебни години (за филтъра), най-новата първа
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  // При смяна на филтър/търсене се връщаме на страница 1
  const resetTo = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <>
      <div className="doc-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Търсене на документ по име…"
          value={q}
          onChange={(e) => resetTo(() => setQ(e.target.value))}
          aria-label="Търсене в документите"
        />
        {q && (
          <button className="clear" onClick={() => resetTo(() => setQ(''))} aria-label="Изчисти">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {years.length > 0 && (
        <div className="doc-years">
          <button className={`doc-year ${year === 'all' ? 'on' : ''}`} onClick={() => resetTo(() => setYear('all'))}>
            Всички
          </button>
          {years.map((y) => (
            <button key={y} className={`doc-year ${year === y ? 'on' : ''}`} onClick={() => resetTo(() => setYear(y))}>
              {y}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <div className="doc-empty">
          {docs.length === 0 ? 'Все още няма качени документи.' : `Няма документ, който да отговаря на търсенето.`}
        </div>
      ) : (
        <div className="docs-list">
          {shown.map((d) => (
            <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="doc-row">
              <span className="doc-ic"><DocIcon name="scroll" /></span>
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
      )}

      {totalPages > 1 && (
        <div className="doc-pager">
          <button disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Предишна">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} className={p === current ? 'on' : ''} onClick={() => setPage(p)}>
              {p}
            </button>
          ))}
          <button disabled={current === totalPages} onClick={() => setPage(current + 1)} aria-label="Следваща">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
