import Reveal from './Reveal';
import Icon from './Icon';
import './resources.css';

const RESOURCES = [
  { name: 'МОН', desc: 'Министерство на образованието', href: 'https://www.mon.bg', icon: 'file' },
  { name: 'РУО — Варна', desc: 'Регионално управление на образованието', href: 'https://ruo-varna.bg', icon: 'book' },
  { name: 'РЦПППО — Варна', desc: 'Регионален център за приобщаващо образование', href: 'https://rcpppovarna.bg', icon: 'heart' },
  { name: 'ДАЗД', desc: 'Държавна агенция за закрила на детето', href: 'https://sacp.government.bg', icon: 'shield' },
  { name: 'НЕИСПУО', desc: 'Национална информационна система', href: 'https://neispuo.mon.bg', icon: 'chart' },
  { name: 'УНИЦЕФ България', desc: 'Ресурси за деца и семейства', href: 'https://www.unicef.org/bulgaria', icon: 'compass' },
];

export default function Resources() {
  return (
    <section className="resources">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="lead-kicker">ИНСТИТУЦИИ</span>
          <h2>Полезни ресурси</h2>
          <p>Официални институции и партньори в подкрепа на образованието и грижата за децата.</p>
        </Reveal>
        <div className="res-grid">
          {RESOURCES.map((r, i) => (
            <Reveal
              as="div"
              key={r.href}
              className="res-item"
              delay={((i % 3) + 1) as 1 | 2 | 3}
            >
              <a href={r.href} target="_blank" rel="noopener noreferrer">
                <span className="res-ic"><Icon name={r.icon} /></span>
                <span className="res-txt">
                  <b>{r.name}</b>
                  <span>{r.desc}</span>
                </span>
                <svg className="res-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
