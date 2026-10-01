'use client';

import { useState } from 'react';

// Текст с бутон „Копирай“ (за IBAN и др.)
export default function CopyText({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <span className="copy-text">
      <span>{text}</span>
      <button type="button" onClick={() => navigator.clipboard?.writeText(text.replace(/\s/g, '')).then(() => { setDone(true); setTimeout(() => setDone(false), 2000); }).catch(() => {})}>
        {done ? 'Копирано' : 'Копирай'}
      </button>
    </span>
  );
}
