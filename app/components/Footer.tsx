import { NAV, CONTACT } from './nav';
import LastUpdated from './LastUpdated';
import ThemeToggle from './ThemeToggle';
import './footer.css';

export default function Footer() {
  const groups = NAV.filter((g) => g.label !== 'Новини');
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="sf-top">
          <div className="sf-brand">
            <img src="/logo.jpg" alt="" width={56} height={56} />
            <p className="sf-name">ЦСОП Варна</p>
            <p>Център за специална образователна подкрепа. Обучение, специализирана подкрепа и рехабилитация за деца и младежи.</p>
            <a className="sf-fb" href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook страница</a>
          </div>

          {groups.map((g) => (
            <nav key={g.href} className={`sf-col tone-${g.tone}`} aria-label={g.label}>
              <p className="sf-h">{g.label}</p>
              <ul>
                {g.links.slice(0, 6).map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </nav>
          ))}

          <div className="sf-col sf-contact">
            <p className="sf-h">Контакти</p>
            <address>
              {CONTACT.address}<br />{CONTACT.city}
            </address>
            <p><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
            <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            <p className="sf-hours">Пон – пет, 8:00 – 18:00</p>
          </div>
        </div>

        <div className="sf-bot">
          <span>© {new Date().getFullYear()} ЦСОП – Варна</span>
          <LastUpdated />
          <span className="sf-legal">
            <a href="/dostapnost">Достъпност</a>
            <a href="/za-nas/zashtita-na-lichnite-danni">Лични данни</a>
            <a href="/politika-za-biskvitki">Бисквитки</a>
            <a href="/obshti-usloviya">Общи условия</a>
          </span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
