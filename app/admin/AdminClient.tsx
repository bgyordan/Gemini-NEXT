'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

type DocRow = {
  id: string;
  name: string;
  file_url: string;
  academic_year: string | null;
  section: string;
  sort_order: number;
};

export default function AdminClient({ userName }: { userName: string }) {
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const [docs, setDocs] = useState<DocRow[]>([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('2025/2026');
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await supabase
      .from('site_documents')
      .select('*')
      .eq('section', 'internal')
      .order('academic_year', { ascending: false })
      .order('sort_order', { ascending: true });
    setDocs(data ?? []);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/vhod');
    router.refresh();
  };

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setMsg('Попълнете име и изберете файл.');
      return;
    }
    setBusy(true);
    setMsg('');

    // 1) Качване на файла в bucket public-docs
    const ext = file.name.split('.').pop();
    const path = `internal/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('public-docs')
      .upload(path, file);

    if (upErr) {
      setBusy(false);
      setMsg('Грешка при качване на файла: ' + upErr.message);
      return;
    }

    // 2) Взимане на публичния линк
    const { data: pub } = supabase.storage.from('public-docs').getPublicUrl(path);

    // 3) Запис в таблицата
    const { error: insErr } = await supabase.from('site_documents').insert({
      name: name.trim(),
      file_url: pub.publicUrl,
      academic_year: year.trim(),
      section: 'internal',
      sort_order: docs.length + 1,
    });

    setBusy(false);
    if (insErr) {
      setMsg('Грешка при запис: ' + insErr.message);
      return;
    }

    setMsg('✓ Документът е качен успешно!');
    setName('');
    setFile(null);
    (document.getElementById('file-input') as HTMLInputElement).value = '';
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този документ?')) return;
    await supabase.from('site_documents').delete().eq('id', id);
    load();
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

      <div className="admin-body">
        <section className="admin-panel">
          <h2>Качване на документ</h2>
          <form onSubmit={upload} className="admin-form">
            <label>
              <span>Име на документа</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="напр. Дневен режим"
              />
            </label>
            <label>
              <span>Учебна година</span>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025/2026"
              />
            </label>
            <label>
              <span>PDF файл</span>
              <input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {msg && <div className="admin-msg">{msg}</div>}
            <button type="submit" disabled={busy} className="admin-btn">
              {busy ? 'Качване…' : 'Качи документа'}
            </button>
          </form>
        </section>

        <section className="admin-list">
          <h2>Качени документи ({docs.length})</h2>
          {docs.length === 0 ? (
            <p className="admin-empty">Все още няма качени документи.</p>
          ) : (
            <div className="admin-docs">
              {docs.map((d) => (
                <div key={d.id} className="admin-doc">
                  <div className="admin-doc-info">
                    <b>{d.name}</b>
                    <span>{d.academic_year}</span>
                  </div>
                  <div className="admin-doc-actions">
                    <a href={d.file_url} target="_blank" rel="noopener noreferrer">Виж</a>
                    <button onClick={() => remove(d.id)}>Изтрий</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
