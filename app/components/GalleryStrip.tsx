import Link from 'next/link';
import './gallery-strip.css';

type Photo = { id: string; photo_url: string; caption: string | null };

async function getPhotos(): Promise<Photo[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from('gallery_photos')
      .select('id, photo_url, caption')
      .order('created_at', { ascending: false })
      .limit(6);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryStrip() {
  const photos = await getPhotos();
  if (photos.length === 0) return null;

  return (
    <section className="gstrip-sec">
      <div className="wrap">
        <div className="gstrip-head">
          <div>
            <span className="kicker">Галерия</span>
            <h2>Моменти от нашето ежедневие</h2>
          </div>
          <Link href="/galeriya" className="gstrip-link">
            Виж галерията
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Link href="/galeriya" className="gstrip-row">
          {photos.map((p) => (
            <div key={p.id} className="gstrip-tile">
              <img src={p.photo_url} alt={p.caption ?? 'Снимка от галерията'} loading="lazy" />
            </div>
          ))}
        </Link>
      </div>
    </section>
  );
}
