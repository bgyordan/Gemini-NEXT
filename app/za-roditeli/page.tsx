import Header from '../components/Header';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import ScheduleExplorer from './ScheduleExplorer';
import { supabase } from '../../lib/supabase';

export const metadata = {
  title: 'За родители — ЦСОП Варна',
  description:
    'Полезна информация за родители: дневен режим, графици, консултации с логопед и психолог, училищно настоятелство.',
};

export const revalidate = 0;

export default async function ParentsPage() {
  const { data: formsData } = await supabase
    .from('site_documents')
    .select('id, name, file_url, sort_order, on_site, section')
    .eq('section', 'roditeli')
    .eq('on_site', true)
    .order('sort_order', { ascending: true });
  const forms = formsData ?? [];

  const sections = [
    {
      title: 'Дневен режим и организация',
      desc: 'Целодневна организация на учебния и терапевтичен ден, балансирано топло хранене, отдих в парка и занимания по интереси.',
      badge: '08:00 – 16:30 ч.',
    },
    {
      title: 'Индивидуални консултации',
      desc: 'Регулярни срещи с логопеди, психолози, специални педагози и ерготерапевти за проследяване на индивидуалния напредък.',
      badge: 'Специализиран екип',
    },
    {
      title: 'Родителска общност и настоятелство',
      desc: 'Активно партньорство със семействата, съвместни тържества, благотворителни базари и творчески работилници.',
      badge: 'Родителски съвет',
    },
    {
      title: 'Административни и социални услуги',
      desc: 'Издаване на служебни бележки, удостоверения, съдействие за ТЕЛК, социално подпомагане и транспортни карти.',
      badge: 'Деловодство',
    },
  ];

  return (
    <>
      <Header />
      <PageHero
        kicker="За родители"
        title="Партньорство в грижата за вашето дете"
        intro="Ние вярваме, че най-добрите резултати за детето се постигат, когато семейството и екипът на центъра работят ръка за ръка с открито доверие, постоянна комуникация и взаимна подкрепа."
        tone="em"
      />

      <main style={{ padding: '70px 0 100px' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '26px',
              marginBottom: '40px',
            }}
          >
            {sections.map((sec, i) => (
              <Reveal
                key={sec.title}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '22px',
                  padding: '32px 28px',
                  boxShadow: 'var(--shadow-sm)',
                }}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--green-deep)',
                    background: 'var(--green-soft)',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    marginBottom: '16px',
                  }}
                >
                  {sec.badge}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '20px',
                    marginBottom: '10px',
                  }}
                >
                  {sec.title}
                </h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '14.5px', lineHeight: '1.6' }}>{sec.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* INTERACTIVE SCHEDULE AND CONSULTATION EXPLORER */}
          <ScheduleExplorer />

          {/* PARENT RESOURCE DOWNLOADS & SUPPORT */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              marginTop: '40px',
            }}
          >
            <Reveal
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '36px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="kicker">Документи и бланки</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '14px' }}>
                Полезни формуляри за родители
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '20px' }}>
                Можете да изтеглите основните бланки и правилници директно от дигиталния архив на ЦСОП – Варна:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {forms.length === 0 ? (
                  <p style={{ color: 'var(--ink-3)', fontSize: '13.5px', lineHeight: '1.6' }}>
                    Формулярите предстои да бъдат публикувани.
                  </p>
                ) : (
                  forms.map((d) => (
                    <a
                      key={d.id}
                      href={d.file_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: 'var(--sand-2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'var(--ink)',
                        fontSize: '13.5px',
                        fontWeight: 600,
                      }}
                    >
                      <span>📄 {d.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--green-deep)' }}>Свали PDF ↗</span>
                    </a>
                  ))
                )}
              </div>
            </Reveal>

            <Reveal
              style={{
                background: 'linear-gradient(145deg, var(--green-soft), var(--sand-2))',
                borderRadius: '24px',
                padding: '36px',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              delay={1}
            >
              <div>
                <span className="kicker" style={{ color: 'var(--green-deep)' }}>Пряка връзка</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', marginBottom: '12px' }}>
                  Нуждаете се от индивидуална консултация?
                </h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '14.5px', lineHeight: '1.6' }}>
                  Нашите логопеди, психолози и социални работници са на разположение за лични срещи и съдействие при всяко предизвикателство.
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <a href="/kontakti" className="btn btn-warm" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                  Свържете се с центъра
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
