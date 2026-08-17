import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import BudgetBrowser from './BudgetBrowser';
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
          <BudgetBrowser docs={docs} />
        </div>
      </div>
      <Footer />
    </>
  );
}
