'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '../../lib/supabaseClient';

type DocRow = {
  id: string;
  name: string;
  file_url: string;
  academic_year: string | null;
  section: string;
  sort_order: number;
};

const SECTIONS = [
  { id: 'internal', label: 'Вътрешни документи' },
  { id: 'budget', label: 'Бюджет и финанси' },
  { id: 'admission', label: 'Декларации за прием' },
];

export default function DocsManager() {
  const supabase = createSupabaseBrowser();

  const [section, setSection] = useState('internal');
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('2025/2026');
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editYear, setEditYear] = useState('');

  const load = async () => {
    const { data } = await supabase
      .from('site_documents')
      .select('*')
      .eq('section', section)
      .order('academic_year', { ascending: false })
      .order('sort_order', { ascending: true });
    setDocs(data ?? []);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setMsg('Попълнете име и изберете файл.');
      return;
    }
    setBusy(true);
    setMsg('');

    const ext = file.name.split('.').pop();
    const path = `${section}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from('public-docs').upload(path, file);
    if (upErr) {
      setBusy(false);
      setMsg('Грешка при качване: ' + upErr.message);
      return;
    }
    const { data: pub } = supabase.storage.from('public-docs').getPublicUrl(path);
    const { error: insErr } = await supabase.from('site_documents').insert({
      name: name.trim(),
      file_url: pub.publicUrl,
      academic_year: year.trim(),
      section,
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
    const fi = document.getElementById('docs-file') as HTMLInputElement;
    if (fi) fi.value = '';
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Изтриване на този документ?')) return;
    await supabase.from('site_documents').delete().eq('id', id);
    load();
  };

  const startEdit = (d: DocRow) => {
    setEditId(d.id);
    setEditName(d.name);
    setEditYear(d.academic_year ?? '');
  };

  const saveEdit = async (id: string) => {
    if (!editName.trim()) return;
    await supabase
      .from('site_documents')
      .update({ name: editName.trim(), academic_year: editYear.trim() })
      .eq('id', id);
    setEditId(null);
    load();
  };

  const currentLabel = SECTIONS.find((s) => s.id === section)?.label ?? '';
  const yearLabel = section === 'budget' ? 'Година (напр. 2026)' : 'Учебна година';
  const yearPlaceholder = section === 'budget' ? '2026' : '2025/2026';

  return (
    <div className="docs-mgr">
      {/* Избор на раздел */}
      <div className="docs-sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`docs-sec-btn ${section === s.id ? 'on' : ''}`}
            onClick={() => { setSection(s.id); setEditId(null); setMsg(''); }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="admin-body">
        <section className="admin-panel">
          <h2>Качване · {currentLabel}</h2>
          <form onSubmit={upload} className="admin-form">
            <label>
              <span>Име на документа</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="напр. Касов отчет към 31.03.2026" />
            </label>
            <label>
              <span>{yearLabel}</span>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder={yearPlaceholder} />
            </label>
            <label>
              <span>Файл (PDF)</span>
              <input id="docs-file" type="file" accept="application/pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
            {msg && <div className="admin-msg">{msg}</div>}
            <button type="submit" disabled={busy} className="admin-btn">
              {busy ? 'Качване…' : 'Качи документа'}
            </button>
          </form>
        </section>

        <section className="admin-list">
          <h2>{currentLabel} ({docs.length})</h2>
          {docs.length === 0 ? (
            <p className="admin-empty">Все още няма документи в този раздел.</p>
          ) : (
            <div className="admin-docs">
              {docs.map((d) => (
                <div key={d.id} className="admin-doc">
                  {editId === d.id ? (
                    <div className="admin-doc-edit">
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Име" />
                      <input type="text" value={editYear} onChange={(e) => setEditYear(e.target.value)} placeholder="Година" />
                      <div className="admin-doc-actions">
                        <button className="act-save" onClick={() => saveEdit(d.id)}>Запази</button>
                        <button className="act-cancel" onClick={() => setEditId(null)}>Отказ</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="admin-doc-info">
                        <b>{d.name}</b>
                        <span>{d.academic_year}</span>
                      </div>
                      <div className="admin-doc-actions">
                        <a href={d.file_url} target="_blank" rel="noopener noreferrer">Виж</a>
                        <button className="act-edit" onClick={() => startEdit(d)}>Редактирай</button>
                        <button className="act-del" onClick={() => remove(d.id)}>Изтрий</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
