import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import './budget.css';

export const metadata = {
  title: 'Бюджет и финанси — ЦСОП Варна',
  description: 'Финансови отчети и бюджетна прозрачност на Център за специална образователна подкрепа – Варна.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Doc = { id: string; name: string; file_url: string; academic_year: string | null };

async function getBudget(): Promise<Doc[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from('site_documents')
      .select('id, name, file_url, academic_year')
      .eq('section', 'budget')
      .order('academic_year', { ascending: false })
      .order('sort_order', { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function BudgetPage() {
  const docs = await getBudget();

  // Групиране по година
  const groups: Record<string, Doc[]> = {};
  docs.forEach((d) => {
    const y = d.academic_year || 'Без година';
    (groups[y] ||= []).push(d);
  });
  const years = Object.keys(groups).sort().reverse();

  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Финанси"
        title="Бюджет и финанси"
        intro="Финансова прозрачност — публични отчети за разходване на бюджетните средства на центъра."
        tone="bl"
      />
      <div className="budget-page">
        <div className="wrap narrow">
          {years.length === 0 ? (
            <div className="budget-empty">Все още няма публикувани финансови отчети.</div>
          ) : (
            years.map((year) => (
              <div key={year} className="year-group">
                <div className="year-header">
                  <span className="year-badge">{year}</span>
                  <span className="year-label">Финансови отчети</span>
                </div>
                <div className="report-list">
                  {groups[year].map((d) => (
                    <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="report-row">
                      <span className="report-ic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 13h6M9 17h4" />
                        </svg>
                      </span>
                      <span className="report-name">{d.name}</span>
                      <span className="report-dl">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                        </svg>
                        Изтегли
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
