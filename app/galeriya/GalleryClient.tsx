'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import {
  GALLERY_ALBUMS,
  GALLERY_PHOTOS,
  CATEGORIES,
  GalleryPhoto,
} from './galleryData';
import './gallery.css';

export default function GalleryClient() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [viewMode, setViewMode] = useState<'albums' | 'all-photos'>('all-photos');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Filter photos by category
  const filteredPhotos =
    selectedCat === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCat);

  // Filter albums by category
  const filteredAlbums =
    selectedCat === 'all'
      ? GALLERY_ALBUMS
      : GALLERY_ALBUMS.filter((a) => a.category === selectedCat);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIdx === null) return;
      if (e.key === 'Escape') setActivePhotoIdx(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx, filteredPhotos.length]);

  const activePhoto: GalleryPhoto | null =
    activePhotoIdx !== null ? filteredPhotos[activePhotoIdx] : null;

  return (
    <>
      <Header />

      <PageHero
        kicker="Визуален архив"
        title="Галерия и моменти от ЦСОП – Варна"
        intro="Снимки от събития, творчески ателиета, празници и ежедневието на децата и специалистите в нашия център."
        tone="em"
      />

      <main className="gallery-page">
        <div className="wrap">
          {/* FILTER AND VIEW SWITCHER BAR */}
          <Reveal className="gallery-filters">
            <div className="gallery-pills" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`gallery-pill ${selectedCat === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setActivePhotoIdx(null);
                  }}
                  role="tab"
                  aria-selected={selectedCat === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="gallery-view-modes">
              <button
                className={`view-btn ${viewMode === 'all-photos' ? 'active' : ''}`}
                onClick={() => setViewMode('all-photos')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Всички снимки
              </button>
              <button
                className={`view-btn ${viewMode === 'albums' ? 'active' : ''}`}
                onClick={() => setViewMode('albums')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                </svg>
                Албуми по събития
              </button>
            </div>
          </Reveal>

          {/* VIEW: ALBUMS */}
          {viewMode === 'albums' ? (
            <div className="albums-grid">
              {filteredAlbums.map((album) => (
                <div
                  key={album.id}
                  className="album-card"
                  onClick={() => {
                    setViewMode('all-photos');
                    const matchIdx = filteredPhotos.findIndex(
                      (p) => p.category === album.category
                    );
                    if (matchIdx !== -1) setActivePhotoIdx(matchIdx);
                  }}
                >
                  <div className="album-cover">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      referrerPolicy="no-referrer"
                    />
                    <span className="album-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      {album.photoCount} кадъра
                    </span>
                  </div>
                  <div className="album-body">
                    <span className="date">{album.date}</span>
                    <h3>{album.title}</h3>
                    <p>{album.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* VIEW: INDIVIDUAL PHOTOS MASONRY */
            <div className="photos-masonry">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className="photo-card"
                  onClick={() => setActivePhotoIdx(idx)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="photo-overlay">
                    <h4>{photo.title}</h4>
                    <span>{photo.categoryLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* UPLOAD & INTEGRATION HINT BANNER */}
          <div className="upload-hint-banner">
            <div className="upload-hint-text">
              <h4>Имате още нови снимки от училищни събития?</h4>
              <p>
                Можете да прикачите или качите снимките тук, за да бъдат моментално добавени към съответните албуми с висока резолюция.
              </p>
            </div>
            <a
              href="/kontakti"
              className="btn btn-warm"
              style={{ fontSize: '13.5px', padding: '10px 20px' }}
            >
              Контакт с центъра
            </a>
          </div>
        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIdx(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="lightbox-close-btn"
                onClick={() => setActivePhotoIdx(null)}
                aria-label="Затвори"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18 }}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Prev / Next Navigation */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    className="lightbox-nav-btn prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIdx((prev) =>
                        prev !== null
                          ? (prev - 1 + filteredPhotos.length) %
                            filteredPhotos.length
                          : 0
                      );
                    }}
                    aria-label="Предишна снимка"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 22, height: 22 }}>
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    className="lightbox-nav-btn next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIdx((prev) =>
                        prev !== null ? (prev + 1) % filteredPhotos.length : 0
                      );
                    }}
                    aria-label="Следваща снимка"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 22, height: 22 }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Container */}
              <div className="lightbox-img-area">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption & Metadata */}
              <div className="lightbox-caption-area">
                <div>
                  <span
                    style={{
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      color: 'var(--clay-deep)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    {activePhoto.categoryLabel} · {activePhoto.eventDate}
                  </span>
                  <h3>{activePhoto.title}</h3>
                  <p>{activePhoto.description}</p>
                </div>

                <div className="lightbox-counter">
                  {activePhotoIdx! + 1} от {filteredPhotos.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
