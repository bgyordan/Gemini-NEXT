import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Footer from '../../components/Footer';
import DocsBrowser from '../vatreshni-dokumenti/DocsBrowser';
import type { DocRow } from '../vatreshni-dokumenti/page';
import { supabase } from '../../../lib/supabase';
import '../vatreshni-dokumenti/docs.css';
import './zzld.css';

export const metadata = {
  title: 'Защита на личните данни — ЦСОП Варна',
  description:
    'Политика за поверителност на ЦСОП Варна — как обработваме и защитаваме личните данни съгласно ОРЗД (GDPR) и Закона за защита на личните данни.',
};

export const revalidate = 0;

// TODO (Йордан): замени данните за ДЛЗД с реалните, преди публикуване
const DPO = {
  name: '—',
  email: 'gdpr@csop-varna.bg',
  phone: '—',
};

const RIGHTS = [
  ['Достъп', 'Да получите информация дали обработваме Ваши данни и копие от тях.'],
  ['Коригиране', 'Да поискате поправка на неточни или непълни данни.'],
  ['Изтриване', 'Да поискате заличаване на данните Ви („правото да бъдеш забравен“).'],
  ['Ограничаване', 'Да ограничите обработването при определени условия.'],
  ['Възражение', 'Да възразите срещу обработване на данните Ви.'],
  ['Преносимост', 'Да получите данните си в структуриран, машинночетим формат.'],
];

export default async function ZzldPage() {
  const { data, error } = await supabase
    .from('site_documents')
    .select('id, name, file_url, academic_year, section, sort_order')
    .eq('section', 'privacy')
    .order('academic_year', { ascending: false })
    .order('sort_order', { ascending: true });

  const docs: DocRow[] = error ? [] : (data ?? []);

  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Лични данни"
        title="Защита на личните данни"
        intro="ЦСОП Варна обработва лични данни законосъобразно, добросъвестно и прозрачно, при спазване на Регламент (ЕС) 2016/679 (ОРЗД/GDPR) и Закона за защита на личните данни."
      />

      <div className="zzld-page">
        <div className="wrap narrow">
          <section className="zzld-block">
            <h2>Кой обработва Вашите данни</h2>
            <p>
              Администратор на лични данни е Център за специална образователна подкрепа – Варна, с адрес
              гр. Варна, ул. „Петко Стайнов“ 7. Обработваме лични данни на ученици, родители/настойници,
              служители и партньори единствено за целите на образователната, административната и
              финансовата дейност на центъра и на нормативно определените ни задължения.
            </p>
          </section>

          <section className="zzld-block zzld-dpo">
            <h2>Длъжностно лице по защита на данните (ДЛЗД)</h2>
            <p>
              За всички въпроси, свързани с обработването на Вашите лични данни и с упражняването на
              правата Ви, можете да се свържете с длъжностното лице по защита на данните:
            </p>
            <div className="zzld-dpo-card">
              <div className="zzld-dpo-row"><span>Име</span><b>{DPO.name}</b></div>
              <div className="zzld-dpo-row"><span>Ел. поща</span><b><a href={`mailto:${DPO.email}`}>{DPO.email}</a></b></div>
              <div className="zzld-dpo-row"><span>Телефон</span><b>{DPO.phone}</b></div>
            </div>
          </section>

          <section className="zzld-block">
            <h2>Вашите права</h2>
            <div className="zzld-rights">
              {RIGHTS.map(([title, text]) => (
                <div className="zzld-right" key={title}>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="zzld-block">
            <h2>Жалби</h2>
            <p>
              Ако считате, че правата Ви са нарушени, имате право да подадете жалба до Комисията за
              защита на личните данни (КЗЛД) — гр. София, бул. „Проф. Цветан Лазаров“ 2,{' '}
              <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>.
            </p>
          </section>

          <section className="zzld-block">
            <h2>Документи</h2>
            <p className="zzld-docs-sub">
              Пълна политика за поверителност, вътрешни правила и информационни съобщения за сваляне.
            </p>
            <DocsBrowser docs={docs} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
