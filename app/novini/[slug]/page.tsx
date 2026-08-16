import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import { getAllNews, getNewsBySlug, getRelatedNews } from '../newsData';
import '../novini.css';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllNews();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getNewsBySlug(params.slug);
  if (!post) {
    return {
      title: 'Статията не е намерена — ЦСОП Варна',
    };
  }

  return {
    title: `${post.title} — Новини ЦСОП Варна`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function SingleNewsPage({ params }: Props) {
  const post = getNewsBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedNews(post.slug, 3);

  return (
    <>
      <Header />

      <main className="article-page">
        <div className="wrap article-container">
          {/* BREADCRUMBS */}
          <Reveal className="article-breadcrumbs">
            <Link href="/">Начало</Link>
            <span>/</span>
            <Link href="/novini">Новини</Link>
            <span>/</span>
            <span>{post.category}</span>
          </Reveal>

          {/* ARTICLE HEADER */}
          <Reveal className="article-header">
            <span className="badge-tag highlight">{post.category}</span>
            <h1>{post.title}</h1>
            {post.subtitle && <p className="article-lead">{post.subtitle}</p>}
          </Reveal>

          {/* META BAR */}
          <Reveal className="article-meta-bar">
            <div className="author-block">
              <img
                src={post.author.avatar || '/images/team_care.jpg'}
                alt={post.author.name}
                referrerPolicy="no-referrer"
              />
              <div>
                <b style={{ fontSize: '15px', color: 'var(--ink)' }}>
                  {post.author.name}
                </b>
                <span
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'var(--ink-3)',
                  }}
                >
                  {post.author.role}
                </span>
              </div>
            </div>

            <div className="meta-stats">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {post.date}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.readTime}
              </span>
            </div>
          </Reveal>

          {/* MAIN HERO IMAGE */}
          <Reveal className="article-hero-media">
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
            />
          </Reveal>

          {/* ARTICLE CONTENT */}
          <article className="article-content-body">
            <p className="article-lead" style={{ fontWeight: 500, color: 'var(--ink)' }}>
              {post.content.intro}
            </p>

            {post.content.sections.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: '32px' }}>
                {sec.heading && <h2>{sec.heading}</h2>}
                <p>{sec.text}</p>

                {sec.quote && (
                  <blockquote className="article-quote">
                    „{sec.quote}“
                    {sec.quoteAuthor && <cite>— {sec.quoteAuthor}</cite>}
                  </blockquote>
                )}

                {sec.image && (
                  <div className="article-img-block">
                    <img
                      src={sec.image}
                      alt={sec.imageCaption || sec.heading || ''}
                      referrerPolicy="no-referrer"
                    />
                    {sec.imageCaption && (
                      <div className="article-img-caption">
                        {sec.imageCaption}
                      </div>
                    )}
                  </div>
                )}

                {sec.list && (
                  <ul className="article-list">
                    {sec.list.map((item, lIdx) => (
                      <li key={lIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {post.content.conclusion && (
              <div
                style={{
                  padding: '24px 28px',
                  background: 'var(--sand-2)',
                  borderRadius: '20px',
                  border: '1px solid var(--line)',
                  marginTop: '40px',
                }}
              >
                <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--ink-2)' }}>
                  {post.content.conclusion}
                </p>
              </div>
            )}
          </article>

          {/* TAGS */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags-wrap">
              <span>Теми:</span>
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* BOTTOM ACTIONS */}
          <div className="article-bottom-actions">
            <Link href="/novini" className="back-to-news-btn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                style={{ width: '18px', height: '18px' }}
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Всички новини и събития
            </Link>

            <Link href="/kontakti" className="btn btn-ghost">
              Свържете се с центъра
            </Link>
          </div>
        </div>

        {/* RELATED POSTS */}
        {related.length > 0 && (
          <section className="related-news-sec">
            <div className="wrap">
              <div className="related-head">
                <span className="kicker">Още от центъра</span>
                <h2>Препоръчани публикации</h2>
              </div>

              <div className="news-grid-archive">
                {related.map((rel, idx) => (
                  <Reveal
                    key={rel.id}
                    className="post-card-modern"
                    delay={((idx % 3) + 1) as 1 | 2 | 3}
                  >
                    <Link href={`/novini/${rel.slug}`} style={{ display: 'contents' }}>
                      <div className="post-card-img-wrap">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="post-card-body">
                        <div className="post-meta-row">
                          <span className="badge-tag">{rel.category}</span>
                          <span className="post-date-meta">{rel.date}</span>
                        </div>

                        <h3>{rel.title}</h3>

                        <p>{rel.excerpt}</p>

                        <div className="post-card-footer">
                          <span style={{ color: 'var(--ink-3)', fontSize: '12.5px' }}>
                            {rel.readTime}
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
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
