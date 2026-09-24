import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import LawRefs from '../components/LawRefs';
import DocsBrowser from '../za-nas/vatreshni-dokumenti/DocsBrowser';
import type { DocRow } from '../za-nas/vatreshni-dokumenti/page';
import { supabase } from '../../lib/supabase';
import '../za-nas/vatreshni-dokumenti/docs.css';
import './signali.css';

export const metadata = {
  title: 'Подаване на сигнали — ЦСОП Варна',
  description:
    'Сигурен и поверителен канал за подаване на сигнали за нарушения по ЗЗЛПСПОИН в ЦСОП – Варна.',
};

export const revalidate = 0;

// TODO (Йордан): попълни телефона
const CONTACT = {
  person: 'Силвия Кьошкерян, ЗДУД',
  email: 'signali@csop-varna.bg',
  phone: '—',
  address: 'гр. Варна, ул. „Петко Стайнов“ №7',
};

export default async function SignaliPage() {
  const { data, error } = await supabase
    .from('site_documents')
    .select('id, name, file_url, academic_year, section, sort_order')
    .eq('section', 'signali')
    .order('academic_year', { ascending: false })
    .order('sort_order', { ascending: true });

  const docs: DocRow[] = error ? [] : (data ?? []);

  return (
    <>
      <Header />
      <PageHero
        kicker="Прозрачност · Сигнали"
        title="Подаване на сигнали"
        intro="ЦСОП – Варна осигурява защитен и поверителен канал за подаване на сигнали за нарушения съгласно Закона за защита на лицата, подаващи сигнали или публично оповестяващи информация за нарушения (ЗЗЛПСПОИН)."
        tone="bl"
      />

      <div className="sig-page">
        <div className="wrap narrow">
          <section className="sig-block prose-block">
            <h2>Кой може да подаде сигнал</h2>
            <p className="prose-lead">
              Сигнал може да подаде всяко лице, което е узнало за нарушение в работен контекст — настоящи и
              бивши служители, кандидати за работа, лица, работещи по граждански договор, стажанти, както и
              партньори, доставчици и техни служители, свързани с дейността на центъра.
            </p>
          </section>

          <section className="sig-block prose-block">
            <h2>За какви нарушения</h2>
            <p>
              Каналът е за сигнали за нарушения на българското законодателство или на актове на Европейския
              съюз, станали известни във връзка с работата — например в областта на обществените поръчки,
              финансовото управление, защитата на личните данни, безопасността, опазването на околната среда
              и други сериозни нарушения. Той не е предназначен за лични жалби и битови въпроси, за които има
              друг ред.
            </p>
          </section>

          <section className="sig-block prose-block">
            <h2>Как се подава сигнал</h2>
            <p>
              Сигнал се подава писмено (включително по електронен път) или устно до определеното длъжностно
              лице. Устният сигнал се документира чрез попълване на формуляр от отговорния служител, който се
              предоставя на подателя за проверка, коригиране и подпис. Законът не допуска разглеждане на
              анонимни сигнали, затова е необходимо да посочите своите данни — те остават поверителни.
            </p>
            <p>
              Писмен сигнал може да се подаде и по пощата или на място в сградата — в запечатан плик с надпис
              „Сигнал по ЗЗЛПСПОИН — лично до отговорното лице“. Пликът не се отваря в деловодството.
            </p>
          </section>

          <section className="sig-block prose-block">
            <h2>Какво трябва да съдържа сигналът</h2>
            <p>
              Трите Ви имена, адрес и телефон (и имейл, ако имате); имената и месторабота на лицето, срещу
              което подавате сигнала, ако са известни; конкретни данни за нарушението — място, период и
              описание; дата и подпис. Препоръчваме да използвате формуляра по образец на КЗЛД по-долу и да
              приложите наличните доказателства.
            </p>
            <p>
              Не се разглеждат анонимни сигнали и сигнали за нарушения, извършени преди повече от две години.
            </p>
          </section>

          <section className="sig-block prose-block">
            <h2>Срокове</h2>
            <p>
              В срок до 7 дни ще получите потвърждение за получаването на сигнала и неговия уникален
              идентификационен номер (УИН), генериран от КЗЛД. В срок до 3 месеца от потвърждението ще
              получите обратна информация за предприетите действия.
            </p>
          </section>

          <section className="sig-block prose-block sig-guarantee">
            <h2>Гаранции за поверителност</h2>
            <p>
              Самоличността на подателя и на всяко засегнато лице е защитена и не се разкрива без съгласие,
              освен когато това е задължение по закон. Законът забранява всякакви ответни действия (репресии)
              спрямо лицата, подали сигнал добросъвестно. Достъп до подадените сигнали има единствено
              определеното за целта лице.
            </p>
          </section>

          <section className="sig-block prose-block">
            <h2>Канал за сигнали</h2>
            <p>
              Сигнал може да се подаде писмено или устно до определеното със заповед на директора длъжностно
              лице:
            </p>
            <div className="sig-contact">
              <div className="sig-contact-row"><span>Отговорно лице</span><b>{CONTACT.person}</b></div>
              <div className="sig-contact-row"><span>Ел. поща</span><b><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></b></div>
              <div className="sig-contact-row"><span>Телефон</span><b>{CONTACT.phone}</b></div>
              <div className="sig-contact-row"><span>Адрес</span><b>{CONTACT.address}</b></div>
            </div>
            <p className="sig-note prose-note">
              До специализирания имейл достъп има само отговорното лице. Освен вътрешния канал, сигнал може
              да се подаде и до централния орган за външно подаване — Комисията за защита на личните данни
              (КЗЛД), гр. София 1592, бул. „Проф. Цветан Лазаров“ №2, имейл:{' '}
              <a href="mailto:whistleblowing@cpdp.bg">whistleblowing@cpdp.bg</a>.
            </p>
          </section>

          <section className="sig-block prose-block">
            <h2>Лични данни</h2>
            <p>
              Личните данни в сигнала се обработват от ЦСОП – Варна само за целите на разглеждането му,
              съгласно ОРЗД и Закона за защита на личните данни. Сигналите и материалите по тях се съхраняват
              5 години след приключване на разглеждането. Повече информация —{' '}
              <a href="/za-nas/zashtita-na-lichnite-danni">Защита на личните данни</a>.
            </p>
          </section>

          <section className="sig-block prose-block">
            <LawRefs
              items={[
                { label: 'Защита на подаващите сигнали (ЗЗЛПСПОИН) — КЗЛД', href: 'https://www.cpdp.bg' },
                { label: 'Образец на формуляр за сигнал (КЗЛД)', href: 'https://www.cpdp.bg' },
              ]}
              note="КЗЛД е централният орган за външно подаване на сигнали и поддържа образеца на формуляра и указанията по закона."
            />
          </section>

          <section className="sig-block prose-block">
            <h2>Документи и формуляр</h2>
            <p className="sig-docs-sub prose-note">
              Вътрешни правила по ЗЗЛПСПОИН и официалният формуляр за подаване на сигнал (по образец на КЗЛД).
            </p>
            <DocsBrowser docs={docs} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
