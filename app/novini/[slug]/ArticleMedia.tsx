'use client';

import { useState, type ReactNode } from 'react';
import Lightbox from '../../components/Lightbox';

const SHOW = 5; // колко плочки се виждат в мозайката; останалите са зад „+N“

/**
 * Корица + текст + мозайка от снимки в новината.
 * Всяка снимка (и корицата) отваря общия преглед с всички снимки на новината.
 */
export default function ArticleMedia({
  title,
  cover,
  gallery,
  children,
}: {
  title: string;
  cover: string | null;
  gallery: string[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);

  // всички снимки без повторения: корицата първа
  const all = Array.from(new Set([cover, ...gallery].filter(Boolean) as string[]));
  // в мозайката — без корицата (тя вече е голяма отгоре)
  const grid = all.filter((s) => s !== cover);
  const offset = cover ? 1 : 0;
  const visible = grid.slice(0, SHOW);
  const more = grid.length - visible.length;

  return (
    <>
      {cover && (
        <div className="wrap narrow">
          <button type="button" className="article-cover is-zoom" onClick={() => setOpen(0)} aria-label="Отвори снимките">
            <img src={cover} alt={title} />
            {all.length > 1 && (
              <span className="ac-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-8 8" /></svg>
                {all.length} снимки
              </span>
            )}
          </button>
        </div>
      )}

      <div className="wrap narrow">
        {children}

        {visible.length > 0 && (
          <div className={`ng-grid n${Math.min(visible.length, SHOW)}`}>
            {visible.map((src, i) => {
              const last = i === visible.length - 1 && more > 0;
              return (
                <button
                  type="button"
                  key={src}
                  className="ng-item"
                  onClick={() => setOpen(i + offset)}
                  aria-label={last ? `Още ${more} снимки` : `Снимка ${i + 1}`}
                >
                  <img src={src} alt={`${title} — снимка ${i + 1}`} loading="lazy" />
                  {last ? (
                    <span className="ng-more">+{more}</span>
                  ) : (
                    <span className="ng-zoom" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" /></svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {open !== null && (
        <Lightbox
          photos={all.map((src) => ({ src }))}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
          title={title}
        />
      )}
    </>
  );
}
