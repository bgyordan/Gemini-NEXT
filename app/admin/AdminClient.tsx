'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '../../lib/supabaseClient';
import DocsManager from './DocsManager';
import NewsManager from './NewsManager';
import GalleryManager from './GalleryManager';
import HeroManager from './HeroManager';

const TABS = [
  { id: 'docs', label: 'Документи', icon: 'M6 2h8l4 4v16H6z M14 2v4h4' },
  { id: 'news', label: 'Новини', icon: 'M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h5' },
  { id: 'gallery', label: 'Галерия', icon: 'M3 3h18v18H3z M3 15l5-5 4 4 3-3 6 6' },
  { id: 'hero', label: 'Начална мозайка', icon: 'M3 3h8v8H3z M13 3h8v8h-8z M3 13h8v8H3z M13 13h8v8h-8z' },
];

export default function AdminClient({ userName, profileId }: { userName: string; profileId: string }) {
  const [tab, setTab] = useState('docs');
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/vhod');
    router.refresh();
  };

  const initials = userName.split(' ').map((n) => n[0]).slice(0, 2).join('');

  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="admin-brand">
          <div className="admin-logo"><img src="/logo.jpg" alt="ЦСОП" /></div>
          <div>
            <h1>Съдържание</h1>
            <span>ЦСОП – Варна</span>
          </div>
        </div>

        <nav className="admin-nav">
          {TABS.map((t) => (
            <button key={t.id} className={`admin-nav-btn ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={t.icon} />
              </svg>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="admin-user">
          <div className="admin-avatar">{initials}</div>
          <div className="admin-user-info">
            <b>{userName}</b>
            <button onClick={logout}>Изход</button>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          {tab === 'docs' && <DocsManager />}
          {tab === 'news' && <NewsManager authorId={profileId} />}
          {tab === 'gallery' && <GalleryManager />}
          {tab === 'hero' && <HeroManager />}
        </div>
      </main>
    </div>
  );
}
