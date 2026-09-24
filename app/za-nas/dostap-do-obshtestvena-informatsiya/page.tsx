import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import LawRefs from '../../components/LawRefs';
import DocIcon from '../vatreshni-dokumenti/DocIcon';
import { supabase } from '../../../lib/supabase';
import '../vatreshni-dokumenti/docs.css';
import './zdoi.css';

export const metadata = {
  title: 'Достъп до обществена информация — ЦСОП Варна',
  description:
    'Ред за достъп до обществена информация в ЦСОП – Варна по ЗДОИ — заявления, форми на достъп, разходи, образци, вътрешни правила и годишни отчети.',
};

export const revalidate = 0;

type Doc = {
  id: string;
  name: string;
  file_url: string;
  academic_year: string | null;
  category: string | null;
};

// Звено за приемане на заявления по ЗДОИ
const UNIT = {
  name: 'Деловодство на ЦСОП – Варна',
  address: 'ул. „Петко Стайнов“ №7, гр. Варна',
  email: 'info-400052@edu.mon.bg',
  phones: '052 619 456 · 0878 521 823',
  hours: 'Работни дни, 8:30 – 16:30 ч.',
};

function DocList({ docs, icon }: { docs: Doc[]; icon: string }) {
  return (
    <div className="docs-list">
      {docs.map((d) => (
        <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="doc-row">
          <span className="doc-ic"><DocIcon name={icon} /></span>
          <span className="doc-txt"><b>{d.name}</b></span>
          <span className="doc-dl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
            <span>PDF</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export default async function ZdoiPage() {
  const { data, error } = await supabase
    .from('site_documents')
    .select('id, name, file_url, academic_year, section, category, on_site, sort_order')
    .eq('section', 'zdoi')
    .eq('on_site', true)
    .order('sort_order', { ascending: true });

  const docs: Doc[] = error ? [] : (data ?? []);

  const byCat = (k: string) => docs.filter((d) => (d.category ?? '') === k);
  const obrazci = byCat('obrazec');
  const pravila = byCat('pravila');
  const normativi = byCat('normativ');
  const otcheti = byCat('otchet');

  // Групиране на отчетите по година (низходящо)
  const years = Array.from(new Set(otcheti.map((d) => d.academic_year || '—'))).sort((a, b) =>
    b.localeCompare(a, 'bg')
  );

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
          {/* Право на достъп */}
          <section className="zdoi-block prose-block">
            <h2>Право на достъп</h2>
            <p className="prose-lead">
              Всеки гражданин на Република България, чужденците и лицата без гражданство, както и всички
              юридически лица, имат право на достъп до обществена информация. При упражняване на това право
              не е необходимо да се доказва правен интерес, нито да се посочват причини и цели. Правото не
              обхваща лични данни и информация, представляваща защитена тайна по закон.
            </p>
          </section>

          {/* Как да подадете заявление */}
          <section className="zdoi-block prose-block zdoi-intro">
            <h2>Как да подадете заявление</h2>
            <p>
              Заявление може да се подаде писмено — на място в деловодството на центъра, по пощата или по
              електронен път на адрес <a href={`mailto:${UNIT.email}`}>{UNIT.email}</a> — както и устно.
              Писмените и електронните заявления се смятат за равностойни; при електронно заявление не се
              изисква електронен подпис.
            </p>
            <p>
              Заявлението трябва да съдържа трите имена (съответно наименованието и седалището) на заявителя,
              описание на исканата информация, предпочитаната форма за предоставяне и адрес за кореспонденция.
              Срокът за произнасяне е до 14 дни от регистрирането. При неясно искане се изпраща уведомление за
              уточняване, а при голям обем информация срокът може да бъде удължен по реда на закона.
            </p>
          </section>

          {/* Форми на достъп */}
          <section className="zdoi-block prose-block">
            <h2>Форми на достъп</h2>
            <p>
              Достъпът може да бъде предоставен като преглед на информацията (оригинал или копие), устна
              справка, копие на хартиен носител, копие на технически носител или по електронен път. Заявителят
              посочва предпочитаната форма, а центърът я осигурява, доколкото е технически възможно.
            </p>
          </section>

          {/* Разходи */}
          <section className="zdoi-block prose-block zdoi-cost">
            <h2>Разходи</h2>
            <p>
              Достъпът до обществена информация е безплатен. Заплащат се единствено разходите по
              предоставянето (напр. копия), съгласно Заповед № ЗМФ-1472 от 29.11.2011 г. на министъра на
              финансите за нормативите на разходите при предоставяне на обществена информация.
            </p>
          </section>

          {/* Звено за приемане */}
          <section className="zdoi-block prose-block">
            <h2>Звено за приемане на заявления</h2>
            <div className="zdoi-contact">
              <div className="zdoi-contact-row"><span>Звено</span><b>{UNIT.name}</b></div>
              <div className="zdoi-contact-row"><span>Адрес</span><b>{UNIT.address}</b></div>
              <div className="zdoi-contact-row"><span>Ел. поща</span><b><a href={`mailto:${UNIT.email}`}>{UNIT.email}</a></b></div>
              <div className="zdoi-contact-row"><span>Телефон</span><b>{UNIT.phones}</b></div>
              <div className="zdoi-contact-row"><span>Работно време</span><b>{UNIT.hours}</b></div>
            </div>
          </section>

          {/* Образци и бланки */}
          <section className="zdoi-block prose-block zdoi-docs">
            <h2>Образци и бланки</h2>
            <p className="zdoi-docs-sub prose-note">
              Заявление за достъп, протоколи за приемане и предоставяне на информация, решения по ЗДОИ.
            </p>
            {obrazci.length > 0 ? (
              <DocList docs={obrazci} icon="scroll" />
            ) : (
              <p className="zdoi-empty">Образците предстои да бъдат публикувани.</p>
            )}
          </section>

          {/* Вътрешни правила */}
          <section className="zdoi-block prose-block zdoi-docs">
            <h2>Вътрешни правила по ЗДОИ</h2>
            {pravila.length > 0 ? (
              <DocList docs={pravila} icon="shield" />
            ) : (
              <p className="zdoi-empty">Вътрешните правила предстои да бъдат публикувани.</p>
            )}
          </section>

          {/* Нормативи за разходите (само ако има качени) */}
          {normativi.length > 0 && (
            <section className="zdoi-block prose-block zdoi-docs">
              <h2>Нормативи за разходите</h2>
              <DocList docs={normativi} icon="target" />
            </section>
          )}

          {/* Годишни отчети по чл. 15, ал. 2 */}
          <section className="zdoi-block prose-block zdoi-docs">
            <h2>Годишни отчети по чл. 15, ал. 2 от ЗДОИ</h2>
            <p className="zdoi-docs-sub prose-note">
              Отчет за постъпилите заявления за достъп до обществена информация — публикува се ежегодно,
              включително когато през годината не са постъпили заявления.
            </p>
            {otcheti.length === 0 ? (
              <p className="zdoi-empty">Отчетите предстои да бъдат публикувани.</p>
            ) : (
              years.map((y) => (
                <div key={y} className="zdoi-year">
                  <h3 className="zdoi-year-h">{y}</h3>
                  <DocList docs={otcheti.filter((d) => (d.academic_year || '—') === y)} icon="calendar" />
                </div>
              ))
            )}
          </section>

          {/* Нормативна уредба */}
          <section className="zdoi-block prose-block">
            <LawRefs
              items={[
                { label: 'Закон за достъп до обществена информация (пълен текст)', href: 'https://pitay.government.bg/documents/zakon-za-dostup-do-obshestvena-informaciya' },
                { label: 'Платформа за достъп до обществена информация', href: 'https://pitay.government.bg' },
              ]}
              note="Разходите се определят със Заповед № ЗМФ-1472 от 29.11.2011 г. на министъра на финансите."
            />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
