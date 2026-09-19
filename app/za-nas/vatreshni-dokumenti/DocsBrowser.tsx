'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import DocIcon from './DocIcon';
import type { DocRow } from './page';

type Cat = {
  key: string;
  title: string;
  icon: string;
  color: string;
};

const CATEGORIES: Cat[] = [
  { key: 'strategy', title: 'Стратегия и планове', icon: 'target', color: '#7c3aed' },
  { key: 'rules', title: 'Правилници и вътрешни правила', icon: 'scroll', color: '#0d9488' },
  { key: 'programs', title: 'Програми', icon: 'calendar', color: '#2563eb' },
  { key: 'ethics', title: 'Етика и приобщаване', icon: 'handshake', color: '#db2777' },
  { key: 'safety', title: 'Безопасност', icon: 'shield', color: '#ea580c' },
  { key: 'data', title: 'Защита на данните', icon: 'lock', color: '#475569' },
  { key: 'other', title: 'Общи документи', icon: 'scroll', color: '#64748b' },
];

const CAT_BY_KEY = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
);

export default function DocsBrowser({ docs }: { docs: DocRow[] }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState('all');

  const keyOf = (d: DocRow) => {
    const category = (d as { category?: string | null }).category;

    return category && CAT_BY_KEY[category] ? category : 'other';
  };

  const filtered = useMemo(() => {
    const query = q.trim().toLocaleLowerCase('bg-BG');

    if (!query) return docs;

    return docs.filter((d) =>
      d.name.toLocaleLowerCase('bg-BG').includes(query)
    );
  }, [docs, q]);

  const available = useMemo(
    () =>
      CATEGORIES
        .map((cat) => ({
          cat,
          count: filtered.filter((d) => keyOf(d) === cat.key).length,
        }))
        .filter((group) => group.count > 0),
    [filtered]
  );

  const flatDocs = useMemo(
    () =>
      filtered.filter(
        (d) => active === 'all' || keyOf(d) === active
      ),
    [filtered, active]
  );

  const clearSearch = () => {
    setQ('');
  };

  return (
    <section className="docs-browser">
      <div className="doc-search">
        <svg
          className="doc-search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="search"
          placeholder="Търсене на документ…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Търсене в документите"
          className="doc-search-input"
        />

        {q && (
          <button
            type="button"
            className="clear"
            onClick={clearSearch}
            aria-label="Изчисти търсенето"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {available.length > 0 && (
        <div className="doc-filters-wrap">
          <div
            className="doc-filters"
            role="tablist"
            aria-label="Филтриране по категория"
          >
            <FilterChip
              label="Всички"
              count={filtered.length}
              color="#0f2240"
              active={active === 'all'}
              onClick={() => setActive('all')}
            />

            {available.map(({ cat, count }) => (
              <FilterChip
                key={cat.key}
                label={cat.title}
                count={count}
                color={cat.color}
                active={active === cat.key}
                onClick={() => setActive(cat.key)}
              />
            ))}
          </div>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="docs-meta" aria-live="polite">
          <span>
            {flatDocs.length}{' '}
            {flatDocs.length === 1 ? 'документ' : 'документа'}
          </span>

          {q && (
            <span className="docs-query">
              за „{q}“
            </span>
          )}
        </div>
      )}

      {flatDocs.length === 0 ? (
        <div className="doc-empty">
          <div className="doc-empty-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <circle cx="11" cy="15" r="2.5" />
              <path d="m13 17 2 2" />
            </svg>
          </div>

          <strong>
            {docs.length === 0
              ? 'Все още няма качени документи.'
              : 'Няма намерени документи.'}
          </strong>

          {docs.length > 0 && (
            <p>
              Опитайте с друга дума или изберете друга категория.
            </p>
          )}

          {q && (
            <button
              type="button"
              className="empty-reset"
              onClick={clearSearch}
            >
              Изчисти търсенето
            </button>
          )}
        </div>
      ) : (
        <div className="docs-list">
          {flatDocs.map((d) => {
            const cat =
              CAT_BY_KEY[keyOf(d)] ||
              CATEGORIES[CATEGORIES.length - 1];

            return (
              <a
                key={d.id}
                href={d.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-row"
                style={
                  {
                    '--doc-color': cat.color,
                  } as CSSProperties
                }
              >
                <span className="doc-ic">
                  <DocIcon name={cat.icon} />
                </span>

                <span className="doc-txt">
                  <b>{d.name}</b>
                  <small>{cat.title}</small>
                </span>

                <span className="doc-dl">
                  <span className="doc-dl-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3v12" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                  </span>

                  <span className="doc-dl-label">PDF</span>
                </span>
              </a>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .docs-browser {
          width: 100%;
        }

        .doc-search {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 52px;
          margin-bottom: 16px;
          border: 1px solid #dbe3ec;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 1px 2px rgba(15, 34, 64, 0.03);
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .doc-search:focus-within {
          border-color: #94a3b8;
          box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.08),
            0 2px 8px rgba(15, 34, 64, 0.04);
        }

        .doc-search-icon {
          flex: 0 0 auto;
          width: 19px;
          height: 19px;
          margin-left: 16px;
          color: #64748b;
        }

        .doc-search-input {
          width: 100%;
          min-width: 0;
          height: 50px;
          padding: 0 46px 0 11px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #0f172a;
          font: inherit;
          font-size: 15px;
        }

        .doc-search-input::placeholder {
          color: #94a3b8;
        }

        .doc-search-input::-webkit-search-cancel-button {
          display: none;
        }

        .clear {
          position: absolute;
          right: 9px;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          padding: 0;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #64748b;
          cursor: pointer;
        }

        .clear:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .clear:focus-visible,
        .empty-reset:focus-visible,
        .doc-row:focus-visible,
        .filter-chip:focus-visible {
          outline: 3px solid rgba(37, 99, 235, 0.2);
          outline-offset: 2px;
        }

        .clear svg {
          width: 17px;
          height: 17px;
        }

        .doc-filters-wrap {
          margin: 0 0 17px;
          overflow: hidden;
        }

        .doc-filters {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 2px 2px 7px;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .doc-filters::-webkit-scrollbar {
          height: 5px;
        }

        .doc-filters::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 99px;
        }

        .filter-chip {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 38px;
          padding: 7px 13px;
          border-radius: 999px;
          font: inherit;
          font-size: 13px;
          font-weight: 550;
          white-space: nowrap;
          cursor: pointer;
          transition:
            background 0.15s ease,
            border-color 0.15s ease,
            color 0.15s ease,
            transform 0.1s ease;
        }

        .filter-chip:hover {
          transform: translateY(-1px);
        }

        .filter-count {
          min-width: 21px;
          padding: 1px 6px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.55;
          text-align: center;
        }

        .docs-meta {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0 2px 10px;
          color: #64748b;
          font-size: 12.5px;
        }

        .docs-query {
          overflow: hidden;
          max-width: 55%;
          color: #94a3b8;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .docs-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .doc-row {
          --doc-color: #64748b;

          position: relative;
          display: flex;
          align-items: center;
          min-height: 70px;
          padding: 11px 14px 11px 15px;
          border: 1px solid #e5eaf0;
          border-left: 4px solid var(--doc-color);
          border-radius: 12px;
          background: #fff;
          color: inherit;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(15, 34, 64, 0.025);
          transition:
            transform 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease,
            background 0.15s ease;
        }

        .doc-row:hover {
          transform: translateY(-1px);
          border-color: #d7dee8;
          box-shadow:
            0 4px 12px rgba(15, 34, 64, 0.06),
            0 1px 2px rgba(15, 34, 64, 0.04);
          background: #fcfdff;
        }

        .doc-ic {
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          margin-right: 12px;
          border-radius: 10px;
          background: color-mix(
            in srgb,
            var(--doc-color) 9%,
            white
          );
          color: var(--doc-color);
        }

        .doc-txt {
          display: flex;
          flex: 1;
          min-width: 0;
          flex-direction: column;
          gap: 4px;
          padding-right: 12px;
        }

        .doc-txt b {
          overflow: hidden;
          color: #172033;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .doc-txt small {
          overflow: hidden;
          color: #94a3b8;
          font-size: 11.5px;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .doc-dl {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
        }

        .doc-dl-icon {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f1f5f9;
          transition:
            background 0.15s ease,
            color 0.15s ease;
        }

        .doc-dl-icon svg {
          width: 16px;
          height: 16px;
        }

        .doc-row:hover .doc-dl-icon {
          background: #e8eef5;
          color: #0f2240;
        }

        .doc-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 190px;
          padding: 30px 20px;
          border: 1px dashed #d7dee8;
          border-radius: 14px;
          background: #fafbfd;
          text-align: center;
        }

        .doc-empty-icon {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          margin-bottom: 12px;
          border-radius: 12px;
          background: #f1f5f9;
          color: #94a3b8;
        }

        .doc-empty-icon svg {
          width: 23px;
          height: 23px;
        }

        .doc-empty strong {
          color: #334155;
          font-size: 14px;
          font-weight: 600;
        }

        .doc-empty p {
          max-width: 360px;
          margin: 6px 0 0;
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.5;
        }

        .empty-reset {
          margin-top: 14px;
          padding: 7px 12px;
          border: 1px solid #dbe3ec;
          border-radius: 8px;
          background: #fff;
          color: #334155;
          font: inherit;
          font-size: 12px;
          cursor: pointer;
        }

        .empty-reset:hover {
          background: #f8fafc;
        }

        @media (max-width: 640px) {
          .doc-search {
            min-height: 50px;
            border-radius: 12px;
            margin-bottom: 12px;
          }

          .doc-search-input {
            height: 48px;
            font-size: 16px;
          }

          .doc-filters-wrap {
            margin-right: -1px;
            margin-bottom: 13px;
          }

          .doc-filters {
            gap: 7px;
            padding-bottom: 5px;
            scrollbar-width: none;
          }

          .doc-filters::-webkit-scrollbar {
            display: none;
          }

          .filter-chip {
            min-height: 40px;
            padding: 7px 12px;
          }

          .docs-list {
            gap: 7px;
          }

          .doc-row {
            min-height: 68px;
            padding: 10px 10px 10px 12px;
            border-left-width: 3px;
            border-radius: 10px;
          }

          .doc-ic {
            width: 38px;
            height: 38px;
            margin-right: 10px;
            border-radius: 9px;
          }

          .doc-txt {
            padding-right: 7px;
          }

          .doc-txt b {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            white-space: normal;
          }

          .doc-txt small {
            display: none;
          }

          .doc-dl-label {
            display: none;
          }

          .doc-dl-icon {
            width: 36px;
            height: 36px;
          }

          .docs-meta {
            margin-bottom: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .doc-row,
          .filter-chip,
          .doc-search,
          .doc-dl-icon {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

function FilterChip({
  label,
  count,
  color,
  active,
  onClick,
}: {
  label: string;
  count: number;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="filter-chip"
      onClick={onClick}
      aria-pressed={active}
      style={{
        border: `1px solid ${active ? color : '#e2e8f0'}`,
        background: active ? color : '#fff',
        color: active ? '#fff' : '#475569',
      }}
    >
      {label}

      <span
        className="filter-count"
        style={{
          background: active ? 'rgba(255,255,255,.22)' : `${color}14`,
          color: active ? '#fff' : color,
        }}
      >
        {count}
      </span>
    </button>
  );
}
