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
  category: string | null;
  on_site?: boolean;
};
export default async function DocsPage() {
  const { data, error } = await supabase
    .from('site_documents')
     .select('id, name, file_url, academic_year, section, sort_order, category, on_site')
    .eq('section', 'internal')
    .eq('on_site', true)
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
          <section className="docs-intro">
            <p>
              В този раздел ЦСОП – Варна публикува основните документи, които определят организацията,
              развитието и ежедневната работа на центъра — стратегическите и плановите документи,
              правилниците и вътрешните правила, както и документи, свързани с образователната,
              терапевтичната и административната дейност.
            </p>
            <h2>Основни категории</h2>
            <ul className="docs-cats">
              <li><b>Стратегическо планиране</b> — дългосрочно развитие и приоритети на центъра.</li>
              <li><b>Годишно планиране</b> — планове, програми и графици за съответната учебна година.</li>
              <li><b>Правилници и вътрешни правила</b> — организация на работата и ред за дейностите.</li>
              <li><b>Образователна и терапевтична дейност</b> — подкрепа за личностно развитие и терапия.</li>
              <li><b>Безопасност и сигурност</b> — правила и планове за действие при рискове и извънредни ситуации.</li>
              <li><b>Защита на данните и информацията</b> — политики за законосъобразно обработване.</li>
            </ul>
            <p className="docs-intro-note">
              Документите се актуализират при промяна в нормативната уредба, при приемане на нови вътрешни
              правила или при промени в организацията на дейността на центъра.
            </p>
          </section>
          <DocsBrowser docs={docs} />
        </div>
      </div>
      <Footer />
    </>
  );
}
