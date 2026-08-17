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
        <h2>Бланки и декларации за изтегляне</h2>
        <p>Свалете, попълнете и донесете следните документи при записване.</p>
      </div>
      <div className="adm-docs-list">
        {docs.map((d) => (
          <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="adm-doc">
            <span className="adm-doc-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 13h6M9 17h4" />
              </svg>
            </span>
            <span className="adm-doc-name">{d.name}</span>
            <span className="adm-doc-dl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
