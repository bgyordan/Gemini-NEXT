'use client';

import { useState, useMemo } from 'react';

type Doc = { id: string; name: string; file_url: string; academic_year: string | null; category: string | null };

const CAT_LABELS: Record<string, string> = { approved: 'Утвърден бюджет', report: 'Отчети' };
const CAT_ORDER = ['approved', 'report'];

export default function BudgetBrowser({ docs }: { docs: Doc[] }) {
  // Групиране по година
  const groups = useMemo(() => {
    const g: Record<string, Doc[]> = {};
    docs.forEach((d) => {
      const y = d.academic_year || 'Без година';
      (g[y] ||= []).push(d);
    });
    return g;
  }, [docs]);

  const years = useMemo(() => Object.keys(groups).sort().reverse(), [groups]);

  // По подразбиране — текущата година (или най-новата налична)
  const currentYear = String(new Date().getFullYear());
  const initial = years.includes(currentYear) ? currentYear : years[0] ?? 'all';
  const [active, setActive] = useState<string>(initial);

  const shownYears = active === 'all' ? years : years.filter((y) => y === active);

  if (docs.length === 0) {
    return <div className="budget-empty">Все още няма публикувани бюджетни документи.</div>;
  }

  const renderRow = (d: Doc) => (
    <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="report-row">
      <span className="report-ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 13h6M9 17h4" />
        </svg>
      </span>
      <span className="report-name">{d.name}</span>
      <span className="report-dl">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
        </svg>
        Изтегли
      </span>
    </a>
  );

  return (
    <>
      {years.length > 1 && (
        <div className="budget-years">
          <button className={`budget-year ${active === 'all' ? 'on' : ''}`} onClick={() => setActive('all')}>
            Всички
          </button>
          {years.map((y) => (
            <button key={y} className={`budget-year ${active === y ? 'on' : ''}`} onClick={() => setActive(y)}>
              {y}
            </button>
          ))}
        </div>
      )}

      {shownYears.map((year) => {
        const inYear = groups[year];
        // категория: approved / report; нетагнатите отиват в „Отчети"
        const cat = (d: Doc) => (d.category === 'approved' ? 'approved' : 'report');
        return (
          <div key={year} className="year-group">
            <div className="year-header">
              <span className="year-badge">{year}</span>
              <span className="year-label">Бюджет и отчети</span>
            </div>
            <div className="year-body">
              {CAT_ORDER.map((c) => {
                const items = inYear.filter((d) => cat(d) === c);
                if (!items.length) return null;
                return (
                  <div key={c} className="budget-cat">
                    <div className="budget-cat-label">{CAT_LABELS[c]}</div>
                    <div className="report-list">{items.map(renderRow)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
