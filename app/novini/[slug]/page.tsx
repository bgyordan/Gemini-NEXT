import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../novini.css';
import './article.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

type Article = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  gallery_images: string[];
  category: string;
  published_at: string | null;
  author_name: string | null;
};

async function getArticle(id: string): Promise<Article | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('site_news')
      .select('id, title, excerpt, content, cover_url, gallery_images, category, published_at, status, staff_profiles(first_name, last_name)')
      .eq('id', id)
      .single();
    if (error || !data || data.status !== 'published') return null;
    const author = (data as any).staff_profiles;
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      cover_url: data.cover_url,
      gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : [],
      category: data.category,
      published_at: data.published_at,
      author_name: author ? `${author.first_name} ${author.last_name}` : null,
    };
  } catch {
    return null;
  }
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}

export async function generateMetadata({ params }: Props) {
  const post = await getArticle(params.slug);
  if (!post) return { title: 'Статията не е намерена — ЦСОП Варна' };
  return {
    title: `${post.title} — ЦСОП Варна`,
    description: post.excerpt ?? undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getArticle(params.slug);
  if (!post) notFound();

  // Текстът е с нови редове → параграфи
  const paragraphs = (post.content ?? '').split('\n').filter((p) => p.trim() !== '');

  return (
    <>
      <Header />
      <article className="article">
        <div className="article-hero">
          <div className="wrap narrow">
            <Link href="/novini" className="article-back">← Всички новини</Link>
            <span className="news-badge">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="article-meta">
              {post.author_name && <span>{post.author_name}</span>}
              {post.author_name && post.published_at && <span className="dot">·</span>}
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>
        </div>

        {post.cover_url && (
          <div className="wrap narrow">
            <div className="article-cover">
              <img src={post.cover_url} alt={post.title} />
            </div>
          </div>
        )}

        <div className="wrap narrow">
          <div className="article-body">
            {post.excerpt && <p className="article-lead">{post.excerpt}</p>}
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {post.gallery_images.length > 0 && (
            <div className="article-gallery">
              {post.gallery_images.map((src, i) => (
                <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="ag-item">
                  <img src={src} alt={`${post.title} — снимка ${i + 1}`} loading="lazy" />
                </a>
              ))}
            </div>
          )}

          <div className="article-foot">
            <Link href="/novini" className="article-back-btn">← Обратно към новините</Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
