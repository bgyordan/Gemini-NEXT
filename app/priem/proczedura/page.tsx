import PageHero from '../../components/PageHero';
import DocRows from '../../components/DocRows';
import AdmissionWizard from '../AdmissionWizard';
import { getDocuments } from '../../../lib/data';
import { getSiteInfo } from '../../../lib/siteinfo';

export const metadata = {
  title: 'Как се записва дете — ЦСОП Варна',
  description: 'Процедурата по прием в ЦСОП – Варна стъпка по стъпка: заявление, документи, становище на РЦПППО и записване.',
};
export const dynamic = 'force-dynamic';

export default async function ProcedurePage() {
  const { contact: CONTACT, hours: HOURS } = await getSiteInfo();
  const docs = await getDocuments('admission', true);
  return (
    <>
      <PageHero
        path="/priem/proczedura"
        page="priem"
        title="Как се записва дете"
        intro="Приемът е за деца и младежи със специални образователни потребности, насочени от РЦПППО – Варна. Процедурата има три етапа, които вървят поред."
      />
      <section className="section tone-orange">
        <div className="wrap split">
          <AdmissionWizard />
          <aside className="aside-box">
            <h3>Документи се приемат в деловодството</h3>
            <p className="muted">{CONTACT.address}, Варна, в работни дни {HOURS.admin}.</p>
            <p style={{ marginTop: 10, fontWeight: 600 }}><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
            <a className="btn btn-dark" style={{ marginTop: 16 }} href="/priem/poseshtenie">Елате на посещение</a>
          </aside>
        </div>
      </section>
      {docs.length > 0 && (
        <section className="section soft tone-orange">
          <div className="wrap narrow">
            <h2>Още бланки и декларации</h2>
            <p className="muted" style={{ margin: '8px 0 16px' }}>Изтеглете, попълнете и донесете при записване.</p>
            <DocRows docs={docs} />
          </div>
        </section>
      )}
    </>
  );
}
