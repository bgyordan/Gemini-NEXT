'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '../../lib/supabaseClient';
import DocsManager from './DocsManager';
import NewsManager from './NewsManager';
import GalleryManager from './GalleryManager';

export default function AdminClient({ userName, profileId }: { userName: string; profileId: string }) {
  const [tab, setTab] = useState<'docs' | 'news' | 'gallery'>('docs');
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/vhod');
    router.refresh();
  };

  return (
    <div className="admin">
      <header className="admin-top">
        <div>
          <h1>Съдържание на сайта</h1>
          <span>Здравейте, {userName}</span>
        </div>
        <button onClick={logout} className="admin-logout">Изход</button>
      </header>

      <div className="admin-tabs">
        <button className={tab === 'docs' ? 'on' : ''} onClick={() => setTab('docs')}>Документи</button>
        <button className={tab === 'news' ? 'on' : ''} onClick={() => setTab('news')}>Новини</button>
        <button className={tab === 'gallery' ? 'on' : ''} onClick={() => setTab('gallery')}>Галерия</button>
      </div>

      {tab === 'gallery' ? (
        <div className="admin-body single">
          <GalleryManager />
        </div>
      ) : tab === 'news' ? (
        <div className="admin-body single">
          <NewsManager authorId={profileId} />
        </div>
      ) : (
        <div className="admin-body single">
          <DocsManager />
        </div>
      )}
    </div>
  );
}
