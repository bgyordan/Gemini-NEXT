'use client';

import { useState, useEffect, useCallback } from 'react';
import Reveal from '../components/Reveal';
import type { Album, Photo } from './page';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}

export default function GalleryClient({ albums, photos }: { albums: Album[]; photos: Photo[] }) {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const albumPhotos = openAlbum
    ? photos.filter((p) => p.album_id === openAlbum.id)
    : [];

  // Клавиатура за lightbox
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? 0 : (i + 1) % albumPhotos.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? 0 : (i - 1 + albumPhotos.length) % albumPhotos.length));
    },
    [lightbox, albumPhotos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  // Блокира скрола при отворен lightbox
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  if (albums.length === 0) {
    return (
      <div className="gal-wrap">
        <div className="wrap">
          <div className="gal-empty">Все още няма качени албуми.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="gal-wrap">
      <div className="wrap">
        {/* ===== АЛБУМИ ===== */}
        {!openAlbum && (
          <div className="gal-albums">
            {albums.map((a, i) => (
              <Reveal as="div" key={a.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <button className="gal-album" onClick={() => setOpenAlbum(a)}>
                  <div className="gal-album-img">
                    {a.cover_url ? <img src={a.cover_url} alt={a.title} /> : <div className="gal-noimg"><span>ЦСОП</span></div>}
                    <div className="gal-album-overlay">
                      <span className="gal-album-count">{a.photo_count} снимки</span>
                    </div>
                  </div>
                  <div className="gal-album-info">
                    <h3>{a.title}</h3>
                    <span>{formatDate(a.event_date)}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}

        {/* ===== ОТВОРЕН АЛБУМ (MASONRY) ===== */}
        {openAlbum && (
          <div className="gal-open">
            <button className="gal-back" onClick={() => setOpenAlbum(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Всички албуми
            </button>
            <div className="gal-open-head">
              <h2>{openAlbum.title}</h2>
              <span>{formatDate(openAlbum.event_date)} · {albumPhotos.length} снимки</span>
            </div>

            <div className="gal-masonry">
              {albumPhotos.map((p, i) => (
                <button key={p.id} className="gal-tile" onClick={() => setLightbox(i)}>
                  <img src={p.photo_url} alt={p.caption ?? ''} loading="lazy" />
                  {p.caption && <span className="gal-tile-cap">{p.caption}</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lightbox !== null && albumPhotos[lightbox] && (
        <div className="gal-lb" onClick={() => setLightbox(null)}>
          <button className="gal-lb-close" onClick={() => setLightbox(null)} aria-label="Затвори">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <button
            className="gal-lb-nav prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i - 1 + albumPhotos.length) % albumPhotos.length)); }}
            aria-label="Предишна"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div className="gal-lb-stage" onClick={(e) => e.stopPropagation()}>
            <img src={albumPhotos[lightbox].photo_url} alt={albumPhotos[lightbox].caption ?? ''} />
            {albumPhotos[lightbox].caption && (
              <div className="gal-lb-cap">{albumPhotos[lightbox].caption}</div>
            )}
            <div className="gal-lb-counter">{lightbox + 1} / {albumPhotos.length}</div>
          </div>

          <button
            className="gal-lb-nav next"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i + 1) % albumPhotos.length)); }}
            aria-label="Следваща"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
