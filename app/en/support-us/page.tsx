import PageHero from '../../components/PageHero';
import PagePhotos from '../../components/PagePhotos';
import CopyText from '../../daritelstvo/CopyText';
import { getSiteInfo } from '../../../lib/siteinfo';
import { alternates } from '../../../lib/lang';

export const metadata = {
  title: 'Support us — CSOP Varna',
  description: 'Support the children and young people at CSOP Varna. Every donation goes into their learning and therapy environment.',
  alternates: alternates('/en/support-us'),
};

export default async function EnSupport() {
  const { bank: BANK } = await getSiteInfo();
  return (
    <>
      <PageHero
        lang="en"
        kicker="Support us"
        tone="orange"
        page="daritelstvo"
        title="Help us make the environment even better"
        intro="Donations go towards specialised equipment, art therapy materials, the sensory room and events for the children."
      />
      <section className="section tone-orange">
        <div className="wrap grid-2">
          <div>
            <h2>Bank transfer</h2>
            <p className="muted" style={{ marginTop: 10 }}>{/настоятелство/i.test(BANK.to) ? 'Donations are made to the School Board of Trustees of the centre.' : 'Donations are made to the centre’s own bank account, in euro.'}</p>
            <div className="kv" style={{ marginTop: 18 }}>
              <div className="kv-row"><span>Recipient</span><b>{BANK.to}</b></div>
              <div className="kv-row"><span>IBAN</span><b><CopyText text={BANK.iban} lang="en" /></b></div>
              <div className="kv-row"><span>BIC</span><b>{BANK.bic}</b></div>
              {!/настоятелство/i.test(BANK.to) && <div className="kv-row"><span>Bank</span><b>Central Cooperative Bank (CCB)</b></div>}
              <div className="kv-row"><span>Reference</span><b>{BANK.reason}</b></div>
            </div>
            <p className="muted" style={{ marginTop: 14 }}>The reference may also be written in English, e.g. “Donation to CSOP Varna”.</p>
          </div>
          <div>
            <h2>Materials and supplies</h2>
            <p className="muted" style={{ marginTop: 10 }}>We gratefully accept educational toys, sensory materials, drawing and pottery supplies and sports equipment. We most need:</p>
            <ul className="feature-list" style={{ marginTop: 18 }}>
              <li>Art therapy materials: clay, brushes, paints, card</li>
              <li>Sensory and tactile toys for fine motor skills</li>
              <li>Supplies for the teaching kitchen</li>
              <li>Books with large illustrations and learning boards</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section tone-orange">
        <div className="wrap">
          <div className="donate-band">
            <div>
              <h2>Have an idea for a joint project or campaign?</h2>
              <p>Get in touch and we will discuss how we can help the children most, together.</p>
            </div>
            <a className="btn btn-primary" href="/en/contacts">Contact us</a>
          </div>
        </div>
      </section>
      <PagePhotos page="daritelstvo" title="Support us" heading="What we have achieved with your help" />
    </>
  );
}
