'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import type { NewsCard } from './page';

const CATEGORIES = ['Всички', 'Новини', 'Събития', 'Публикации', 'Моменти'];
const PER_PAGE = 9;

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function NewsClient({ initialPosts }: { initialPosts: NewsCard[] }) {
  const [cat, setCat] = useState('Всички');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return initialPosts.filter((p) => {
      const okCat = cat === 'Всички' || p.category === cat;
      const okQ =
        query === '' ||
        p.title.toLowerCase().includes(query) ||
        (p.excerpt ?? '').toLowerCase().includes(query);
      return okCat && okQ;
    });
  }, [initialPosts, cat, q]);

  // featured = първата новина, само когато няма филтър/търсене
  const featured =
    cat === 'Всички' && q.trim() === '' && filtered.length > 0 ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  const totalPages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const shown = rest.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div className="news-wrap">
      <div className="wrap">
        {/* Контроли */}
        <div className="news-controls">
          <div className="news-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Търсене в новините…"
              value={q}
              onChange={(e) => reset(() => setQ(e.target.value))}
            />
            {q && (
              <button className="ns-clear" onClick={() => reset(() => setQ(''))} aria-label="Изчисти">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <div className="news-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`news-cat ${cat === c ? 'on' : ''}`}
                onClick={() => reset(() => setCat(c))}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {initialPosts.length === 0 ? (
          <div className="news-empty">Все още няма публикувани новини.</div>
        ) : filtered.length === 0 ? (
          <div className="news-empty">Няма новини по този критерий.</div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Reveal>
                <Link href={`/novini/${featured.slug}`} className="news-feat">
                  <div className="news-feat-img">
                    {featured.cover_url ? (
                      <img src={featured.cover_url} alt={featured.title} />
                    ) : (
                      <div className="news-noimg"><span>ЦСОП</span></div>
                    )}
                  </div>
                  <div className="news-feat-body">
                    <span className="news-badge">{featured.category}</span>
                    <h2>{featured.title}</h2>
                    {featured.excerpt && <p>{featured.excerpt}</p>}
                    <div className="news-feat-foot">
                      <span className="news-date">{formatDate(featured.published_at)}</span>
                      <span className="news-more">Прочети повече →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Мрежа 3 колони */}
            <div className="news-grid">
              {shown.map((p, i) => (
                <Reveal as="div" key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <Link href={`/novini/${p.slug}`} className="news-card">
                    <div className="news-card-img">
                      {p.cover_url ? (
                        <img src={p.cover_url} alt={p.title} />
                      ) : (
                        <div className="news-noimg"><span>ЦСОП</span></div>
                      )}
                      <span className="news-badge float">{p.category}</span>
                    </div>
                    <div className="news-card-body">
                      <h3>{p.title}</h3>
                      {p.excerpt && <p>{p.excerpt}</p>}
                      <div className="news-card-foot">
                        <span className="news-date">{formatDate(p.published_at)}</span>
                        <span className="news-more">Прочети →</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Странициране */}
            {totalPages > 1 && (
              <div className="news-pager">
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
        )}
      </div>
    </div>
  );
}
