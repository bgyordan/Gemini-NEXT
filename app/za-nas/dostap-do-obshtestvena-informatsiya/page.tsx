import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import DocsBrowser from '../vatreshni-dokumenti/DocsBrowser';
import type { DocRow } from '../vatreshni-dokumenti/page';
import { supabase } from '../../../lib/supabase';
import '../vatreshni-dokumenti/docs.css';
import './zdoi.css';

export const metadata = {
  title: 'Достъп до обществена информация — ЦСОП Варна',
  description:
    'Ред за достъп до обществена информация в ЦСОП Варна съгласно ЗДОИ — заявления, вътрешни правила и годишни отчети.',
};

export const revalidate = 0;

export default async function ZdoiPage() {
  const { data, error } = await supabase
    .from('site_documents')
    .select('id, name, file_url, academic_year, section, sort_order')
    .eq('section', 'zdoi')
    .order('academic_year', { ascending: false })
    .order('sort_order', { ascending: true });

  const docs: DocRow[] = error ? [] : (data ?? []);

  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · ЗДОИ"
        title="Достъп до обществена информация"
        intro="Всеки гражданин има право на достъп до обществена информация, създавана и съхранявана от ЦСОП Варна, по реда на Закона за достъп до обществена информация (ЗДОИ)."
        tone="bl"
      />

      <div className="zdoi-page">
        <div className="wrap narrow">
          <section className="zdoi-intro">
            <h2>Как да подадете заявление</h2>
            <p>
              Заявление за достъп до обществена информация се подава писмено или устно. Писмените
              заявления се приемат в деловодството на центъра на адрес гр. Варна, ул. „Петко Стайнов“ 7,
              както и по електронна поща. Заявлението трябва да съдържа трите имена на заявителя,
              описание на исканата информация, предпочитаната форма за предоставяне и адрес за
              кореспонденция.
            </p>
            <p>
              Срокът за произнасяне е до 14 дни от регистриране на заявлението. Достъпът е безплатен;
              заплащат се единствено разходите по предоставянето съгласно нормативно определените
              нормативи.
            </p>
          </section>

          <section className="zdoi-docs">
            <h2>Документи</h2>
            <p className="zdoi-docs-sub">
              Образец на заявление, вътрешни правила за предоставяне на достъп и годишни отчети по ЗДОИ.
            </p>
            <DocsBrowser docs={docs} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
