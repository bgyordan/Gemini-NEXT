import Link from 'next/link';
import HomeBoard from './components/HomeBoard';
import GalleryStrip from './components/GalleryStrip';
import Header from './components/Header';
import Hero3D from './components/Hero3D';
import Reveal from './components/Reveal';
import CountUp from './components/CountUp';
import Footer from './components/Footer';
import ParallaxImage from './components/ParallaxImage';
import ParallaxElement from './components/ParallaxElement';
import TherapyInteractive from './components/TherapyInteractive';
import VocationalPrograms from './components/VocationalPrograms';
import type { NewsCard } from './novini/page';
import './components/hero.css';
import './components/sections.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLatest(): Promise<NewsCard[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from('site_news')
      .select('id, title, excerpt, cover_url, category, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3);
    return (data ?? []).map((n) => ({ ...n, slug: n.id }));
  } catch {
    return [];
  }
}

function fmtDate(iso: string | null): string {
  if (!iso) return '';
  try { return new Date(iso).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return ''; }
}

export default async function Home() {
  const latestNews = await getLatest();

  return (
    <>
      <Header />
      <Hero3D />

      {/* ТАБЛО — Събития + Последно добавено */}
      <HomeBoard />

      {/* ABOUT */}
      <section id="za-nas">
        <div className="wrap split">
          <Reveal className="split-art">
            <ParallaxImage
              src="/images/art_therapy.jpg"
              alt="Арт терапия и грижа в ЦСОП Варна"
              speed={10}
              scale={1.12}
            />
            <ParallaxElement className="split-badge" speed={-20}>
              <b>150+</b>
              <span>деца и семейства</span>
            </ParallaxElement>
          </Reveal>
          <Reveal delay={1}>
            <span className="kicker">За нас</span>
            <h2>Място, където всяко дете получава своя ритъм.</h2>
            <p className="sec-head" style={{ marginBottom: 0 }}>
              Центърът за специална образователна подкрепа – Варна (преобразуван от ПУ „Братя Миладинови“, основано през 1949 г.) съчетава десетилетни традиции с най-модерните световни асистивни технологии и терапевтични подходи.
            </p>
            <div className="feat">
              <span className="feat-ico" style={{ background: 'var(--clay-soft)', color: 'var(--clay-deep)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
              </span>
              <div>
                <b>Индивидуален план за развитие</b>
                <p>Екип от психолог, логопед, кинезитерапевт и специален педагог изгражда персонална програма за всеки ученик.</p>
              </div>
            </div>
            <div className="feat">
              <span className="feat-ico" style={{ background: 'var(--green-soft)', color: 'var(--green-deep)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div>
                <b>Асистивни технологии и контрол с поглед</b>
                <p>Използваме Tobii Dynavox и Communicator 5 за свободна комуникация и изразяване на невербални деца.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWS / BLOG - 3 CARDS */}
      <section id="novini" className="news-sec">
        <div className="wrap">
          <div className="news-head">
            <Reveal>
              <span className="kicker">Новини и събития</span>
              <h2 style={{ marginBottom: 0 }}>Животът и успехите в ЦСОП – Варна</h2>
            </Reveal>
            <Reveal delay={1}>
              <Link href="/novini" className="btn btn-ghost">
                Всички публикации
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: '16px', height: '16px' }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </Reveal>
          </div>
          {latestNews.length === 0 ? (
            <Reveal className="news-soon">Очаквайте първите новини съвсем скоро.</Reveal>
          ) : (
            <div className="news-grid">
              {latestNews.map((post, idx) => (
                <Reveal as="article" key={post.id} className="post" delay={((idx % 3) + 1) as 1 | 2 | 3}>
                  <Link href={`/novini/${post.slug}`} style={{ display: 'contents' }}>
                    <div className="post-img">
                      {post.cover_url ? (
                        <ParallaxImage src={post.cover_url} alt={post.title} speed={7} scale={1.1} />
                      ) : (
                        <div className="post-noimg"><span>ЦСОП</span></div>
                      )}
                      <span className="post-category-tag">{post.category}</span>
                    </div>
                    <div className="post-body">
                      <div className="post-meta">
                        <span className="post-date">{fmtDate(post.published_at)}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="post-footer">
                        <span className="read">
                          Прочетете{' '}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      </section>

      {/* INTERACTIVE THERAPY SHOWCASE */}
      <TherapyInteractive />


      {/* VOCATIONAL TRAINING SECTION */}
      <VocationalPrograms />


      {/* GALLERY STRIP */}
      <GalleryStrip />


      {/* DONATE */}
      <section id="donate" className="donate-sec">
        <div className="wrap">
          <Reveal className="donate-card">
            <ParallaxElement className="db db1" speed={-35} />
            <ParallaxElement className="db db2" speed={25} />
            <span className="kicker">Подкрепете ни</span>
            <h2>С вашата подкрепа средата става по-добра.</h2>
            <p>
              Всяко дарение подобрява терапевтичната и учебна среда за над 150 деца и младежи със специални образователни потребности във Варна.
            </p>
            <a href="/daritelstvo" className="btn btn-warm">
              Направете дарение{' '}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7-4.35-9.5-8.5C.9 9.7 2.2 6 5.5 6c2 0 3.3 1.2 4 2.3C10.2 7.2 11.5 6 13.5 6c3.3 0 4.6 3.7 3 6.5C19 16.65 12 21 12 21z" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
