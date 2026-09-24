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

type Doc = { id: string; name: string; file_url: string; academic_year: string | null; category: string | null };

async function getBudget(): Promise<Doc[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from('site_documents')
      .select('id, name, file_url, academic_year, category')
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
        tone="em"
      />
      <div className="budget-page">
        <div className="wrap narrow">
          <section className="budget-intro prose-block">
            <p className="prose-lead">
              Публичността на финансовата информация е важна част от прозрачността в управлението на
              ЦСОП – Варна. Тук публикуваме утвърдения бюджет на центъра и информация за изпълнението му
              през годината, за да могат родители, служители, институции и граждани да проследят
              финансовото обезпечаване на дейността.
            </p>
            <h2>Какво ще намерите</h2>
            <ul className="budget-cats">
              <li><b>Утвърден бюджет</b> — за съответната година, с основните направления на приходите и разходите.</li>
              <li><b>Отчети за изпълнение</b> — периодични и годишни отчети към съответния отчетен период.</li>
            </ul>
            <p className="budget-intro-note prose-note">
              Документите са подредени по години и отчетни периоди, за да може информацията да се проследява
              във времето.
            </p>
          </section>
          <BudgetBrowser docs={docs} />
        </div>
      </div>
      <Footer />
    </>
  );
}
