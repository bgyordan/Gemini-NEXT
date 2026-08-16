'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

const CATEGORIES = ['Новини', 'Събития', 'Публикации', 'Моменти'];

type NewsRow = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string;
  status: string;
  published_at: string | null;
};

export default function NewsManager({ authorId }: { authorId: string | null }) {
  const supabase = createSupabaseBrowser();

  const [news, setNews] = useState<NewsRow[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Новини');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await supabase
      .from('site_news')
      .select('*')
      .order('created_at', { ascending: false });
    setNews(data ?? []);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setEditId(null);
    setTitle('');
    setCategory('Новини');
    setExcerpt('');
    setContent('');
    setFile(null);
    setExistingCover(null);
    const fi = document.getElementById('news-file') as HTMLInputElement;
    if (fi) fi.value = '';
  };

  const startEdit = (n: NewsRow) => {
    setEditId(n.id);
    setTitle(n.title);
    setCategory(n.category);
    setExcerpt(n.excerpt ?? '');
    setContent(n.content ?? '');
    setExistingCover(n.cover_url);
    setFile(null);
    setMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = async (status: 'draft' | 'published') => {
    if (!title.trim()) {
      setMsg('Въведете заглавие.');
      return;
    }
    setBusy(true);
    setMsg('');

    let coverUrl = existingCover;

    // Качване на снимка, ако е избрана нова
    if (file) {
      const ext = file.name.split('.').pop();
      const path = `news/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('public-media').upload(path, file);
      if (upErr) {
        setBusy(false);
        setMsg('Грешка при качване на снимката: ' + upErr.message);
        return;
      }
      coverUrl = supabase.storage.from('public-media').getPublicUrl(path).data.publicUrl;
    }

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim() || null,
      cover_url: coverUrl,
      category,
      status,
      author_id: authorId,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from('site_news').update(payload).eq('id', editId));
    } else {
      ({ error } = await supabase.from('site_news').insert(payload));
    }

    setBusy(false);
    if (error) {
      setMsg('Грешка при запис: ' + error.message);
      return;
    }
    setMsg(status === 'published' ? '✓ Публикувано!' : '✓ Запазено като чернова.');
    resetForm();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Изтриване на тази новина?')) return;
    await supabase.from('site_news').delete().eq('id', id);
    load();
  };

  return (
    <div className="news-mgr">
      <section className="admin-panel">
        <h2>{editId ? 'Редактиране на новина' : 'Нова новина'}</h2>
        <div className="admin-form">
          <label>
            <span>Заглавие</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заглавие на новината" />
          </label>
          <label>
            <span>Категория</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="admin-select">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            <span>Кратко резюме (за картата)</span>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Едно-две изречения…" />
          </label>
          <label>
            <span>Съдържание (пълен текст)</span>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={14} placeholder="Текстът на статията. Нов ред = нов абзац." />
          </label>
          <label>
            <span>Снимка {existingCover && !file ? '(вече има — качете нова за смяна)' : ''}</span>
            <input id="news-file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          {existingCover && !file && (
            <img src={existingCover} alt="" className="news-cover-preview" />
          )}
          {msg && <div className="admin-msg">{msg}</div>}
          <div className="news-btns">
            <button disabled={busy} onClick={() => save('published')} className="admin-btn">
              {busy ? 'Запис…' : editId ? 'Обнови и публикувай' : 'Публикувай'}
            </button>
            <button disabled={busy} onClick={() => save('draft')} className="admin-btn ghost">Чернова</button>
            {editId && <button onClick={resetForm} className="admin-btn cancel">Отказ</button>}
          </div>
        </div>
      </section>

      <section className="admin-list">
        <h2>Всички новини ({news.length})</h2>
        {news.length === 0 ? (
          <p className="admin-empty">Все още няма новини.</p>
        ) : (
          <div className="admin-docs">
            {news.map((n) => (
              <div key={n.id} className="admin-news-row">
                <div className="anr-thumb">
                  {n.cover_url ? <img src={n.cover_url} alt="" /> : <div className="anr-noimg">ЦСОП</div>}
                </div>
                <div className="anr-info">
                  <b>{n.title}</b>
                  <div className="anr-meta">
                    <span className={`anr-status ${n.status}`}>{n.status === 'published' ? 'Публикувана' : 'Чернова'}</span>
                    <span className="anr-cat">{n.category}</span>
                  </div>
                </div>
                <div className="admin-doc-actions">
                  <button className="act-edit" onClick={() => startEdit(n)}>Редактирай</button>
                  <button className="act-del" onClick={() => remove(n.id)}>Изтрий</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
