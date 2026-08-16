'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NewsPost, CATEGORIES } from './newsData';
import Reveal from '../components/Reveal';

interface NewsClientProps {
  initialPosts: NewsPost[];
}

export default function NewsClient({ initialPosts }: NewsClientProps) {
  const [selectedCat, setSelectedCat] = useState<string>('Всички');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchCat =
        selectedCat === 'Всички' || post.category === selectedCat;
      const matchQuery =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCat && matchQuery;
    });
  }, [initialPosts, selectedCat, searchQuery]);

  const featuredPost = useMemo(() => {
    if (selectedCat === 'Всички' && searchQuery.trim() === '') {
      return initialPosts.find((p) => p.featured) || initialPosts[0];
    }
    return null;
  }, [initialPosts, selectedCat, searchQuery]);

  const remainingPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="novini-page wrap">
      {/* FILTER AND SEARCH BAR */}
      <Reveal className="novini-filters">
        <div className="cat-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Търсене на публикации или теми..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Reveal>

      {/* FEATURED STORY (WHEN ON ALL & NO SEARCH) */}
      {featuredPost && (
        <Reveal>
          <div className="featured-post-card">
            <div className="featured-img-wrap">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
              />
              <span className="featured-badge-float">Препоръчано</span>
            </div>
            <div className="featured-content">
              <div className="post-meta-row">
                <span className="badge-tag highlight">{featuredPost.category}</span>
                <span className="post-date-meta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {featuredPost.date}
                </span>
                <span className="post-date-meta">· {featuredPost.readTime}</span>
              </div>

              <h3>
                <Link href={`/novini/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h3>

              <p>{featuredPost.excerpt}</p>

              <div>
                <Link
                  href={`/novini/${featuredPost.slug}`}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '14px' }}
                >
                  Прочетете пълната статия
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>

              <div className="post-author-row">
                <img
                  src={featuredPost.author.avatar || '/images/team_care.jpg'}
                  alt={featuredPost.author.name}
                  className="author-avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="author-info">
                  <b>{featuredPost.author.name}</b>
                  <span>{featuredPost.author.role}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* POSTS GRID */}
      {remainingPosts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--sand-2)',
            borderRadius: '24px',
            border: '1px solid var(--line)',
            marginTop: '20px',
          }}
        >
          <svg
            style={{ width: '48px', height: '48px', color: 'var(--ink-3)', margin: '0 auto 16px' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
          </svg>
          <h3 style={{ fontFamily: 'var(--serif)', marginBottom: '8px' }}>
            Няма намерени публикации
          </h3>
          <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>
            Опитайте с друга ключова дума или изберете различна категория.
          </p>
          <button
            onClick={() => {
              setSelectedCat('Всички');
              setSearchQuery('');
            }}
            className="btn btn-ghost"
            style={{ marginTop: '18px' }}
          >
            Изчистете филтрите
          </button>
        </div>
      ) : (
        <div className="news-grid-archive">
          {remainingPosts.map((post, idx) => (
            <Reveal
              key={post.id}
              className="post-card-modern"
              delay={((idx % 3) + 1) as 1 | 2 | 3}
            >
              <Link href={`/novini/${post.slug}`} style={{ display: 'contents' }}>
                <div className="post-card-img-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="post-card-body">
                  <div className="post-meta-row">
                    <span className="badge-tag">{post.category}</span>
                    <span className="post-date-meta">{post.date}</span>
                  </div>

                  <h3>{post.title}</h3>

                  <p>{post.excerpt}</p>

                  <div className="post-card-footer">
                    <span style={{ color: 'var(--ink-3)', fontSize: '12.5px' }}>
                      {post.readTime}
                    </span>
                    <span className="read-link">
                      Прочетете
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
