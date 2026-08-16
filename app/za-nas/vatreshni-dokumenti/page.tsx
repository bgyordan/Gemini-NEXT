import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import DocsBrowser from './DocsBrowser';
import { supabase } from '../../../lib/supabase';
import './docs.css';

export const metadata = {
  title: 'Вътрешни документи — ЦСОП Варна',
  description:
    'Актуална нормативна уредба, правилници, планове и стратегии за развитие на Център за специална образователна подкрепа – Варна.',
};

// Всеки път се чете свежо от базата (без кеширане на стари данни)
export const revalidate = 0;

export type DocRow = {
  id: string;
  name: string;
  file_url: string;
  academic_year: string | null;
  section: string;
  sort_order: number;
};

export default async function DocsPage() {
  const { data, error } = await supabase
    .from('site_documents')
    .select('id, name, file_url, academic_year, section, sort_order')
    .eq('section', 'internal')
    .order('academic_year', { ascending: false })
    .order('sort_order', { ascending: true });

  const docs: DocRow[] = error ? [] : (data ?? []);

  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Документи"
        title="Вътрешни документи"
        intro="Актуална нормативна уредба, правилници и планове за развитие на центъра. Всеки документ се отваря като PDF."
      />
      <div className="docs-page">
        <div className="wrap narrow">
          <DocsBrowser docs={docs} />
        </div>
      </div>
      <Footer />
    </>
  );
}
