'use client';

import { useState } from 'react';

// Картата на Google зарежда бисквитки — показваме я чак след клик.
export default function MapEmbed({ src, link }: { src: string; link: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className="map-frame">
        <iframe src={src} title="Карта – ЦСОП Варна, ул. „Петко Стайнов“ 7" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    );
  }
  return (
    <div className="map-frame map-off">
      <div>
        <h3>Къде се намираме</h3>
        <p className="muted">Картата се зарежда от Google и може да постави бисквитки.</p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 16 }}>
          <button type="button" className="btn btn-dark" onClick={() => setOn(true)}>Покажи картата</button>
          <a className="btn btn-ghost" href={link} target="_blank" rel="noopener noreferrer">Отвори в Google Maps</a>
        </div>
      </div>
    </div>
  );
}
