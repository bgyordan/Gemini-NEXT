'use client';

import { useEffect, useState, useMemo } from 'react';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

type Photo = { id: string; photo_url: string; caption: string | null; album_id: string };
type Album = { id: string; title: string };

export default function HeroManager() {
  const supabase = createSupabaseBrowser();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [filterAlbum, setFilterAlbum] = useState<string>('all');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data: al } = await supabase.from('gallery_albums').select('id, title').order('sort_order');
    const { data: ph } = await supabase.from('gallery_photos').select('id, photo_url, caption, album_id').order('sort_order');
    const { data: setting } = await supabase.from('site_settings').select('value').eq('key', 'hero_photos').single();

    const allPhotos: Photo[] = ph ?? [];
    const savedUrls: string[] = (setting?.value as string[]) ?? [];

    // Чистим "призраци" — избрани URL-и, чиито снимки вече не съществуват
    const existingUrls = new Set(allPhotos.map((p) => p.photo_url));
    const cleaned = savedUrls.filter((u) => existingUrls.has(u));

    setAlbums(al ?? []);
    setPhotos(allPhotos);
    setSelected(cleaned);

    // Ако е имало призраци, записваме изчистения списък
    if (cleaned.length !== savedUrls.length) {
      await supabase.from('site_settings')
        .update({ value: cleaned, updated_at: new Date().toISOString() })
        .eq('key', 'hero_photos');
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const toggle = (url: string) => {
    setSelected((prev) => prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]);
  };

  const save = async () => {
    setBusy(true); setMsg('');
    const { error } = await supabase.from('site_settings')
      .update({ value: selected, updated_at: new Date().toISOString() })
      .eq('key', 'hero_photos');
    setBusy(false);
    setMsg(error ? 'Грешка: ' + error.message : '✓ Запазено! Мозайката ще ползва избраните снимки.');
  };

  // Избраните снимки (обекти) — за лентата горе
  const selectedPhotos = useMemo(
    () => selected.map((url) => photos.find((p) => p.photo_url === url)).filter(Boolean) as Photo[],
    [selected, photos]
  );

  // Снимки за показване според филтъра
  const visiblePhotos = filterAlbum === 'all'
    ? photos
    : photos.filter((p) => p.album_id === filterAlbum);

  const albumTitle = (id: string) => albums.find((a) => a.id === id)?.title ?? '';

  return (
    <div className="hero-mgr">
      <div className="hm-intro">
        <h2>Снимки за началната мозайка</h2>
        <p>Изберете кои снимки да се въртят в мозайката на началната страница. При всяко зареждане се показва една от избраните. Ако не изберете нищо, се показва снимката по подразбиране.</p>
      </div>

      {photos.length === 0 ? (
        <p className="admin-empty">Няма снимки в галерията. Първо качете снимки в раздел „Галерия".</p>
      ) : (
        <>
          {/* Избрани в момента — винаги видими */}
          <div className="hm-selected-bar">
            <div className="hm-selected-head">
              <span>Избрани за мозайката</span>
              <b>{selected.length}</b>
            </div>
            {selectedPhotos.length === 0 ? (
              <p className="hm-none">Все още няма избрани снимки.</p>
            ) : (
              <div className="hm-selected-strip">
                {selectedPhotos.map((p) => (
                  <button key={p.id} className="hm-sel-thumb" onClick={() => toggle(p.photo_url)} title="Премахни от избора">
                    <img src={p.photo_url} alt="" />
                    <span className="hm-sel-x">✕</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Филтър по албум */}
          <div className="hm-filter">
            <button className={`hm-filter-btn ${filterAlbum === 'all' ? 'on' : ''}`} onClick={() => setFilterAlbum('all')}>
              Всички ({photos.length})
            </button>
            {albums.map((a) => {
              const count = photos.filter((p) => p.album_id === a.id).length;
              if (count === 0) return null;
              return (
                <button key={a.id} className={`hm-filter-btn ${filterAlbum === a.id ? 'on' : ''}`} onClick={() => setFilterAlbum(a.id)}>
                  {a.title} ({count})
                </button>
              );
            })}
          </div>

          {/* Мрежа със снимки за избор */}
          <div className="hm-grid">
            {visiblePhotos.map((p) => (
              <button
                key={p.id}
                className={`hm-tile ${selected.includes(p.photo_url) ? 'on' : ''}`}
                onClick={() => toggle(p.photo_url)}
              >
                <img src={p.photo_url} alt={p.caption ?? ''} />
                <span className="hm-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
              </button>
            ))}
          </div>

          <div className="hm-save-bar">
            {msg && <span className="hm-msg">{msg}</span>}
            <button disabled={busy} onClick={save} className="admin-btn">
              {busy ? 'Запазване…' : 'Запази избора'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
