import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import './resursi.css';

export const metadata = {
  title: 'Ресурси за родители — ЦСОП Варна',
  description:
    'Дигитална библиотека и психологическа подкрепа за семействата на деца със специални образователни потребности — материали за работа у дома, идеи за игри, литература и групи за взаимопомощ.',
};

export default function ParentsResourcesPage() {
  return (
    <>
      <Header />

      <div className="dc">
        {/* HERO */}
        <Reveal className="dc-hero">
          <div className="dc-hero-left">
            <span className="dc-hero-bg">ДОМ</span>
            <span className="dc-kicker">За родители · Ресурси</span>
            <h1>
              Ресурси <em>за дома</em>
            </h1>
          </div>
          <div className="dc-hero-right">
            <p>
              Терапията продължава и вкъщи. Събираме готови инструменти за работа с детето у дома и
              подкрепа за самите родители — защото семейството е част от екипа.
            </p>
          </div>
        </Reveal>

        {/* ДИГИТАЛНА БИБЛИОТЕКА */}
        <Reveal className="dc-docs">
          <div className="dc-section-header">
            <span className="dc-section-kicker">Дигитална библиотека</span>
            <div className="dc-section-line" />
          </div>

          <div className="dc-doc disabled">
            <span className="dc-doc-num">01</span>
            <div className="dc-doc-info">
              <h3>Картинни графици и символи</h3>
              <p>ПЕКС карти, табла за дневен режим и за тоалетни навици — готови за принтиране</p>
            </div>
            <div className="dc-doc-right">
              <span className="dc-badge soon">Предстои</span>
            </div>
          </div>

          <div className="dc-doc disabled">
            <span className="dc-doc-num">02</span>
            <div className="dc-doc-info">
              <h3>Идеи за игри</h3>
              <p>Видеа и статии за развиване на фината моторика, речта и концентрацията у дома</p>
            </div>
            <div className="dc-doc-right">
              <span className="dc-badge soon">Предстои</span>
            </div>
          </div>

          <div className="dc-doc disabled">
            <span className="dc-doc-num">03</span>
            <div className="dc-doc-info">
              <h3>Препоръчителна литература</h3>
              <p>Книги, наръчници и връзки към организации в подкрепа на семейства на деца със СОП</p>
            </div>
            <div className="dc-doc-right">
              <span className="dc-badge soon">Предстои</span>
            </div>
          </div>
        </Reveal>

        {/* ПСИХОЛОГИЧЕСКА ПОДКРЕПА */}
        <Reveal className="dc-docs">
          <div className="dc-section-header">
            <span className="dc-section-kicker">За родителите</span>
            <div className="dc-section-line" />
          </div>

          <div className="dc-doc">
            <span className="dc-doc-num">01</span>
            <div className="dc-doc-info">
              <h3>Работилница за родители</h3>
              <p>Съвместни срещи, в които терапевтите и родителите работят заедно за изграждане на общ език и ниво на комуникация с детето — практически техники, споделен опит и взаимна подкрепа</p>
            </div>
            <div className="dc-doc-right">
              <span className="dc-badge ok">Активна</span>
            </div>
          </div>

          <div className="dc-doc disabled">
            <span className="dc-doc-num">02</span>
            <div className="dc-doc-info">
              <h3>Групи за взаимопомощ</h3>
              <p>Срещите „Училище за родители“ и контакти на местни НПО за взаимопомощ</p>
            </div>
            <div className="dc-doc-right">
              <span className="dc-badge soon">Предстои</span>
            </div>
          </div>

          <div className="dc-doc disabled">
            <span className="dc-doc-num">03</span>
            <div className="dc-doc-info">
              <h3>Статии и съвети</h3>
              <p>Бърнаут при родителите, общуване с братята и сестрите, справяне с проблемни поведения</p>
            </div>
            <div className="dc-doc-right">
              <span className="dc-badge soon">Предстои</span>
            </div>
          </div>
        </Reveal>

        {/* INFO */}
        <Reveal className="dc-info">
          <p>
            За въпроси относно ресурсите или за индивидуална консултация се свържете с нас на{' '}
            <a href="mailto:info-400052@edu.mon.bg">info-400052@edu.mon.bg</a> или на телефон{' '}
            <a href="tel:052619456">052 619 456</a>.
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
