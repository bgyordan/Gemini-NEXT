'use client';

import { useMemo, useState } from 'react';
import { DOCS } from './docsData';
import DocIcon from './DocIcon';

export default function DocsBrowser() {
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DOCS.filter(
      (d) => query === '' || d.name.toLowerCase().includes(query) || d.tag.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <>
      <div className="doc-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Търсене на документ по заглавие или категория…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Търсене в документите"
        />
        {q && (
          <button className="clear" onClick={() => setQ('')} aria-label="Изчисти">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="doc-empty">Няма документ, който да отговаря на „{q}“.</div>
      ) : (
        <div className="docs-list">
          {list.map((d) => (
            <a key={d.href} href={d.href} target="_blank" rel="noopener noreferrer" className="doc-row">
              <span className="doc-ic"><DocIcon name={d.icon} /></span>
              <span className="doc-txt">
                <span className="doc-tag">{d.tag.toUpperCase()}</span>
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
    </>
  );
}
