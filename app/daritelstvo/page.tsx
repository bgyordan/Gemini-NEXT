import PageHero from '../components/PageHero';
import PagePhotos from '../components/PagePhotos';
import CopyText from './CopyText';

export const metadata = {
  title: 'Дарителство — ЦСОП Варна',
  description: 'Подкрепете децата и младежите в ЦСОП – Варна. Всяко дарение отива за учебната и терапевтичната среда.',
};

// ВНИМАНИЕ: банковите данни трябва да са проверени от счетоводството.
const BANK = {
  to: 'Училищно настоятелство към ЦСОП – Варна',
  iban: 'BG12 UNCR 7000 1523 4891 00',
  bic: 'UNCRBGSF',
  reason: 'Дарение за дейността на ЦСОП – Варна',
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        tone="orange"
        page="daritelstvo"
        title="Помогнете ни да направим средата още по-добра"
        intro="Даренията отиват за специализирано оборудване, материали за арт терапия, сензорната зала и събития за децата."
      />
      <section className="section tone-orange">
        <div className="wrap grid-2">
          <div>
            <h2>Дарение по банков път</h2>
            <p className="muted" style={{ marginTop: 10 }}>Целевото дарение се превежда на Училищното настоятелство към центъра.</p>
            <div className="kv" style={{ marginTop: 18 }}>
              <div className="kv-row"><span>Получател</span><b>{BANK.to}</b></div>
              <div className="kv-row"><span>IBAN</span><b><CopyText text={BANK.iban} /></b></div>
              <div className="kv-row"><span>BIC</span><b>{BANK.bic}</b></div>
              <div className="kv-row"><span>Основание</span><b>{BANK.reason}</b></div>
            </div>
          </div>
          <div>
            <h2>Материали и пособия</h2>
            <p className="muted" style={{ marginTop: 10 }}>С благодарност приемаме образователни играчки, сензорни материали, пособия за рисуване и керамика и спортни уреди. Най-нужни са ни:</p>
            <ul className="feature-list" style={{ marginTop: 18 }}>
              <li>Материали за арт терапия: глина, четки, бои, картони</li>
              <li>Сензорни и тактилни играчки за фината моторика</li>
              <li>Консумативи за учебния кулинарен кабинет</li>
              <li>Книжки с едри илюстрации и учебни табла</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section tone-orange">
        <div className="wrap">
          <div className="donate-band">
            <div>
              <h2>Имате идея за общ проект или кампания?</h2>
              <p>Свържете се с нас и ще обсъдим как заедно да помогнем най-много на децата.</p>
            </div>
            <a className="btn btn-primary" href="/kontakti">Свържете се с нас</a>
          </div>
        </div>
      </section>
      <PagePhotos page="daritelstvo" title="Дарителство" heading="Какво постигнахме с ваша помощ" />
    </>
  );
}
