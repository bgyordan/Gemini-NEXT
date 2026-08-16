import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import GalleryClient from './GalleryClient';
import './gallery.css';

export const metadata = {
  title: 'Галерия — ЦСОП Варна',
  description:
    'Снимки от събития, творчески ателиета, празници и ежедневието на децата и специалистите в ЦСОП – Варна.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export type Album = {
  id: string;
  title: string;
  cover_url: string | null;
  event_date: string | null;
  photo_count: number;
};

export type Photo = {
  id: string;
  album_id: string;
  photo_url: string;
  caption: string | null;
};

async function getData(): Promise<{ albums: Album[]; photos: Photo[] }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { albums: [], photos: [] };
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);

    const { data: albumsData } = await supabase
      .from('gallery_albums')
      .select('id, title, cover_url, event_date')
      .order('sort_order', { ascending: true })
      .order('event_date', { ascending: false });

    const { data: photosData } = await supabase
      .from('gallery_photos')
      .select('id, album_id, photo_url, caption')
      .order('sort_order', { ascending: true });

    const photos: Photo[] = photosData ?? [];
    const albums: Album[] = (albumsData ?? []).map((a) => ({
      ...a,
      photo_count: photos.filter((p) => p.album_id === a.id).length,
    }));

    return { albums, photos };
  } catch {
    return { albums: [], photos: [] };
  }
}

export default async function GalleryPage() {
  const { albums, photos } = await getData();

  return (
    <>
      <Header />
      <PageHero
        kicker="Галерия"
        title="Моменти в кадър"
        intro="Снимки от събития, творчески ателиета, празници и ежедневието на децата и специалистите в ЦСОП – Варна."
        tone="em"
      />
      <GalleryClient albums={albums} photos={photos} />
      <Footer />
    </>
  );
}
