'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

type Photo = { id: string; photo_url: string; caption: string | null; album_id: string };
type Album = { id: string; title: string };

export default function HeroManager() {
  const supabase = createSupabaseBrowser();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data: al } = await supabase.from('gallery_albums').select('id, title').order('sort_order');
    const { data: ph } = await supabase.from('gallery_photos').select('id, photo_url, caption, album_id').order('sort_order');
    const { data: setting } = await supabase.from('site_settings').select('value').eq('key', 'hero_photos').single();
    setAlbums(al ?? []);
    setPhotos(ph ?? []);
    setSelected((setting?.value as string[]) ?? []);
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

  return (
    <div className="hero-mgr">
      <div className="hm-intro">
        <h2>Снимки за началната мозайка</h2>
        <p>Изберете кои снимки от галерията да се въртят в мозайката на началната страница. Ако не изберете нищо, се показва снимката по подразбиране.</p>
        <div className="hm-count">Избрани: <b>{selected.length}</b></div>
      </div>

      {photos.length === 0 ? (
        <p className="admin-empty">Няма снимки в галерията. Първо качете снимки в раздел „Галерия".</p>
      ) : (
        albums.map((album) => {
          const albumPhotos = photos.filter((p) => p.album_id === album.id);
          if (albumPhotos.length === 0) return null;
          return (
            <div key={album.id} className="hm-album">
              <h3>{album.title}</h3>
              <div className="hm-grid">
                {albumPhotos.map((p) => (
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
            </div>
          );
        })
      )}

      {photos.length > 0 && (
        <div className="hm-save-bar">
          {msg && <span className="hm-msg">{msg}</span>}
          <button disabled={busy} onClick={save} className="admin-btn">
            {busy ? 'Запазване…' : 'Запази избора'}
          </button>
        </div>
      )}
    </div>
  );
}
