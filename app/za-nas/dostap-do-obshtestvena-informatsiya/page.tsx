import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import LawRefs from '../../components/LawRefs';
import DocsBrowser from '../vatreshni-dokumenti/DocsBrowser';
import type { DocRow } from '../vatreshni-dokumenti/page';
import { supabase } from '../../../lib/supabase';
import '../vatreshni-dokumenti/docs.css';
import './zdoi.css';

export const metadata = {
  title: 'Достъп до обществена информация — ЦСОП Варна',
  description:
    'Ред за достъп до обществена информация в ЦСОП – Варна по ЗДОИ — заявления, форми на достъп, разходи, годишни отчети и нормативна уредба.',
};

export const revalidate = 0;

// TODO (Йордан): попълни данните на отговорното лице (със заповед на директора)
const RESPONSIBLE = {
  person: '—',
  email: 'info-400052@edu.mon.bg',
  phone: '—',
  hours: 'Работни дни, 8:30 – 16:30 ч.',
};

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
        kicker="Прозрачност · ЗДОИ"
        title="Достъп до обществена информация"
        intro="Всеки има право на достъп до обществена информация, създавана и съхранявана от ЦСОП – Варна, по реда на Закона за достъп до обществена информация (ЗДОИ)."
        tone="bl"
      />

      <div className="zdoi-page">
        <div className="wrap narrow">
          <section className="zdoi-block">
            <h2>Какво е обществена информация</h2>
            <p>
              Обществена информация по смисъла на закона е всяка информация, свързана с обществения живот
              в страната, която дава възможност на гражданите да си съставят собствено мнение за дейността
              на задължените субекти. Правото на достъп не обхваща лични данни и информация, представляваща
              защитена тайна по закон.
            </p>
          </section>

          <section className="zdoi-block zdoi-intro">
            <h2>Как да подадете заявление</h2>
            <p>
              Заявление може да се подаде писмено — на място в деловодството на центъра, по пощата или по
              електронен път — както и устно. Писмените и електронните заявления се смятат за равностойни.
              Заявлението трябва да съдържа трите имена на заявителя, описание на исканата информация,
              предпочитаната форма за предоставяне и адрес за кореспонденция.
            </p>
            <p>
              Срокът за произнасяне е до 14 дни от регистрирането. Когато предметът на искането е неясен, се
              изпраща уведомление за уточняване, а срокът започва да тече от уточняването. При голям обем
              информация срокът може да бъде удължен по реда на закона.
            </p>
          </section>

          <section className="zdoi-block">
            <h2>Форми на достъп</h2>
            <p>
              Достъпът може да бъде предоставен като преглед на информацията (оригинал или копие), устна
              справка, копие на хартиен носител, копие на технически носител или по електронен път. Заявителят
              посочва предпочитаната форма, а центърът я осигурява, доколкото е технически възможно.
            </p>
          </section>

          <section className="zdoi-block zdoi-cost">
            <h2>Разходи</h2>
            <p>
              Достъпът до обществена информация е безплатен. Заплащат се единствено разходите по
              предоставянето (напр. копия), съгласно Заповед № ЗМФ-1472 от 29.11.2011 г. на министъра на
              финансите за нормативите на разходите при предоставяне на обществена информация.
            </p>
          </section>

          <section className="zdoi-block">
            <h2>Публикуване и годишен отчет</h2>
            <p>
              Центърът публикува категориите обществена информация, подлежащи на публикуване по чл. 15 от
              ЗДОИ, и изготвя годишен отчет за постъпилите заявления (чл. 15, ал. 2), който се публикува
              ежегодно — включително когато през годината не са постъпили заявления.
            </p>
          </section>

          <section className="zdoi-block">
            <h2>Отговорно лице</h2>
            <div className="zdoi-contact">
              <div className="zdoi-contact-row"><span>Лице</span><b>{RESPONSIBLE.person}</b></div>
              <div className="zdoi-contact-row"><span>Ел. поща</span><b><a href={`mailto:${RESPONSIBLE.email}`}>{RESPONSIBLE.email}</a></b></div>
              <div className="zdoi-contact-row"><span>Телефон</span><b>{RESPONSIBLE.phone}</b></div>
              <div className="zdoi-contact-row"><span>Приемно време</span><b>{RESPONSIBLE.hours}</b></div>
            </div>
          </section>

          <section className="zdoi-block">
            <LawRefs
              items={[
                { label: 'Закон за достъп до обществена информация (пълен текст)', href: 'https://pitay.government.bg/documents/zakon-za-dostup-do-obshestvena-informaciya' },
                { label: 'Платформа за достъп до обществена информация', href: 'https://pitay.government.bg' },
              ]}
              note="Разходите се определят със Заповед № ЗМФ-1472 от 29.11.2011 г. на министъра на финансите."
            />
          </section>

          <section className="zdoi-block zdoi-docs">
            <h2>Документи</h2>
            <p className="zdoi-docs-sub">
              Вътрешни правила, образци на заявления и протоколи, списък по чл. 15 и годишни отчети по ЗДОИ.
            </p>
            <DocsBrowser docs={docs} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
