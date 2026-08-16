'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

type Album = { id: string; title: string; cover_url: string | null; event_date: string | null; sort_order: number };
type Photo = { id: string; album_id: string; photo_url: string; caption: string | null; sort_order: number };

export default function GalleryManager() {
  const supabase = createSupabaseBrowser();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  // нов албум
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const load = async () => {
    const { data: al } = await supabase.from('gallery_albums').select('*').order('sort_order').order('event_date', { ascending: false });
    const { data: ph } = await supabase.from('gallery_photos').select('*').order('sort_order');
    setAlbums(al ?? []);
    setPhotos(ph ?? []);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const createAlbum = async () => {
    if (!title.trim()) { setMsg('Въведете заглавие на албума.'); return; }
    setBusy(true); setMsg('');
    const { error } = await supabase.from('gallery_albums').insert({
      title: title.trim(),
      event_date: date || null,
      sort_order: albums.length + 1,
    });
    setBusy(false);
    if (error) { setMsg('Грешка: ' + error.message); return; }
    setTitle(''); setDate(''); setMsg('✓ Албумът е създаден.');
    load();
  };

  const deleteAlbum = async (id: string) => {
    if (!confirm('Изтриване на албума и всичките му снимки?')) return;
    await supabase.from('gallery_albums').delete().eq('id', id);
    if (openId === id) setOpenId(null);
    load();
  };

  const uploadPhotos = async (albumId: string, files: FileList) => {
    setBusy(true); setMsg('');
    const existing = photos.filter((p) => p.album_id === albumId).length;
    let ok = 0;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const ext = f.name.split('.').pop();
      const path = `gallery/${albumId}/${Date.now()}-${i}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('public-media').upload(path, f);
      if (upErr) continue;
      const url = supabase.storage.from('public-media').getPublicUrl(path).data.publicUrl;
      const { error: insErr } = await supabase.from('gallery_photos').insert({
        album_id: albumId,
        photo_url: url,
        sort_order: existing + i + 1,
      });
      if (!insErr) ok++;
    }
    setBusy(false);
    setMsg(`✓ Качени ${ok} от ${files.length} снимки.`);
    load();
  };

  const setCover = async (albumId: string, url: string) => {
    await supabase.from('gallery_albums').update({ cover_url: url }).eq('id', albumId);
    setMsg('✓ Корицата е зададена.');
    load();
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Изтриване на снимката?')) return;
    await supabase.from('gallery_photos').delete().eq('id', id);
    load();
  };

  const openAlbum = albums.find((a) => a.id === openId);
  const openPhotos = photos.filter((p) => p.album_id === openId);

  return (
    <div className="gal-mgr">
      {!openId ? (
        <>
          <section className="admin-panel">
            <h2>Нов албум</h2>
            <div className="admin-form">
              <label><span>Заглавие</span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="напр. Ден на Земята" />
              </label>
              <label><span>Дата на събитието</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              {msg && <div className="admin-msg">{msg}</div>}
              <button disabled={busy} onClick={createAlbum} className="admin-btn">
                {busy ? 'Създаване…' : 'Създай албум'}
              </button>
            </div>
          </section>

          <section className="admin-list">
            <h2>Албуми ({albums.length})</h2>
            {albums.length === 0 ? (
              <p className="admin-empty">Все още няма албуми.</p>
            ) : (
              <div className="gm-albums">
                {albums.map((a) => {
                  const count = photos.filter((p) => p.album_id === a.id).length;
                  return (
                    <div key={a.id} className="gm-album">
                      <div className="gm-album-thumb" onClick={() => setOpenId(a.id)}>
                        {a.cover_url ? <img src={a.cover_url} alt="" /> : <div className="anr-noimg">ЦСОП</div>}
                      </div>
                      <div className="gm-album-info">
                        <b>{a.title}</b>
                        <span>{count} снимки</span>
                      </div>
                      <div className="admin-doc-actions">
                        <button className="act-edit" onClick={() => setOpenId(a.id)}>Отвори</button>
                        <button className="act-del" onClick={() => deleteAlbum(a.id)}>Изтрий</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="admin-panel gm-open">
          <button className="gal-back" onClick={() => { setOpenId(null); setMsg(''); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Всички албуми
          </button>
          <h2>{openAlbum?.title}</h2>

          <label className="gm-upload">
            <input type="file" accept="image/*" multiple
              onChange={(e) => e.target.files && e.target.files.length > 0 && uploadPhotos(openId, e.target.files)} />
            <span>{busy ? 'Качване…' : '+ Качи снимки (може няколко наведнъж)'}</span>
          </label>
          {msg && <div className="admin-msg">{msg}</div>}

          {openPhotos.length === 0 ? (
            <p className="admin-empty">Албумът е празен. Качете снимки.</p>
          ) : (
            <div className="gm-photos">
              {openPhotos.map((p) => (
                <div key={p.id} className={`gm-photo ${openAlbum?.cover_url === p.photo_url ? 'is-cover' : ''}`}>
                  <img src={p.photo_url} alt="" />
                  <div className="gm-photo-acts">
                    <button title="Направи корица" onClick={() => setCover(openId, p.photo_url)}>★</button>
                    <button title="Изтрий" onClick={() => deletePhoto(p.id)}>✕</button>
                  </div>
                  {openAlbum?.cover_url === p.photo_url && <span className="gm-cover-badge">Корица</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
