import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import { supabase } from '../../../lib/supabase';
import JobSubscribe from './JobSubscribe';
import './karieri.css';

export const metadata = {
  title: 'Кариери — ЦСОП Варна',
  description:
    'Свободни позиции в ЦСОП – Варна. Присъединете се към екип от специални педагози, логопеди, психолози и терапевти.',
};

export const revalidate = 0;

type Job = {
  id: string;
  title: string;
  employment: string | null;
  description: string | null;
  requirements: string | null;
  location: string | null;
};

export default async function CareersPage() {
  const { data } = await supabase
    .from('site_jobs')
    .select('id, title, employment, description, requirements, location')
    .eq('status', 'active')
    .order('sort_order', { ascending: true });
  const jobs: Job[] = data ?? [];

  return (
    <>
      <Header />
      <PageHero
        kicker="За нас · Кариери"
        title="Станете част от екипа"
        intro="В ЦСОП – Варна работят специални педагози, логопеди, психолози и терапевти, отдадени на грижата за всяко дете. Ако споделяте нашата мисия, ще се радваме да се запознаем."
        tone="bl"
      />

      <main className="careers-main">
        <div className="wrap narrow">
          {/* Свободни позиции */}
          <section className="careers-jobs">
            <span className="kicker">Свободни позиции</span>
            <h2>Актуални обяви</h2>

            {jobs.length === 0 ? (
              <div className="careers-empty">
                В момента няма обявени свободни позиции. Можете да изпратите документите си по всяко време —
                ще ги разгледаме при бъдеща възможност.
              </div>
            ) : (
              <div className="job-list">
                {jobs.map((j) => (
                  <Reveal key={j.id} className="job-card">
                    <div className="job-head">
                      <h3>{j.title}</h3>
                      <div className="job-meta">
                        {j.employment && <span>{j.employment}</span>}
                        {j.location && <span>{j.location}</span>}
                      </div>
                    </div>
                    {j.description && <p className="job-desc">{j.description}</p>}
                    {j.requirements && (
                      <div className="job-req">
                        <b>Изисквания</b>
                        <ul>
                          {j.requirements.split('\n').filter((r) => r.trim()).map((r, i) => (
                            <li key={i}>{r.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Reveal>
                ))}
              </div>
            )}
          </section>

          {/* Абонамент */}
          <JobSubscribe />

          {/* Как да кандидатствам */}
          <Reveal className="careers-apply">
            <div>
              <span className="kicker" style={{ color: 'var(--green-deep)' }}>Кандидатстване</span>
              <h3>Изпратете ни своите документи</h3>
              <p>
                Изпратете CV, мотивационно писмо и копия от дипломи на място в канцеларията на
                ул. „Петко Стайнов“ №7 или на имейл: <b>info-400052@edu.mon.bg</b>.
              </p>
            </div>
            <div className="apply-cta">
              <a href="/kontakti" className="btn btn-warm">Свържете се с нас</a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
