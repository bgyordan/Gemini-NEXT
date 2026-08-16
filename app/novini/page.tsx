import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsClient from './NewsClient';
import './novini.css';

export const metadata = {
  title: 'Новини и блог — ЦСОП Варна',
  description:
    'Актуални събития, празници, терапевтични практики, съобщения и вдъхновяващи моменти от ежедневието на децата и екипа в ЦСОП – Варна.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export type NewsCard = {
  id: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  category: string;
  published_at: string | null;
  slug: string;
};

async function getNews(): Promise<NewsCard[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('site_news')
      .select('id, title, excerpt, cover_url, category, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error || !data) return [];
    // slug = id (за динамичната статия)
    return data.map((n) => ({ ...n, slug: n.id }));
  } catch {
    return [];
  }
}

export default async function NewsArchivePage() {
  const posts = await getNews();

  return (
    <>
      <Header />
      <PageHero
        kicker="Блог и новини"
        title="Моменти, които разказват"
        intro="Актуални събития, творчески постижения, съобщения и вдъхновяващи истории от живота на децата и специалистите в ЦСОП – Варна."
        tone="em"
      />
      <NewsClient initialPosts={posts} />
      <Footer />
    </>
  );
}
