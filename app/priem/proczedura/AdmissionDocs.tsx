import './admission-docs.css';

type Doc = { id: string; name: string; file_url: string };

async function getDocs(): Promise<Doc[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from('site_documents')
      .select('id, name, file_url')
      .eq('section', 'admission')
      .eq('on_site', true)
      .order('sort_order', { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdmissionDocs() {
  const docs = await getDocs();
  if (docs.length === 0) return null;

  return (
    <div className="adm-docs">
      <div className="adm-docs-head">
        <span className="adm-kicker">Документи за прием</span>
        <h2>Бланки и декларации за изтегляне</h2>
        <p>Свалете, попълнете и донесете следните документи при записване.</p>
      </div>
      <div className="adm-docs-list">
        {docs.map((d, i) => (
          <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="adm-doc">
            <span className="adm-doc-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="adm-doc-name">{d.name}</span>
            <span className="adm-doc-right">
              <span className="adm-badge">Наличен</span>
              <span className="adm-doc-dl">Изтегли →</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
