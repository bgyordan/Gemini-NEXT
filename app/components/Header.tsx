'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV } from './nav';
import './header.css';

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState<string | null>(null); // отворено падащо меню (desktop)
  const [mobile, setMobile] = useState(false);
  const [mobGroup, setMobGroup] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // затваря менютата при смяна на страница
  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobile(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const enter = (k: string) => { if (timer.current) clearTimeout(timer.current); setOpen(k); };
  const leave = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 160); };

  const isActive = (href: string, links: { href: string }[]) =>
    pathname === href || links.some((l) => pathname === l.href || pathname.startsWith(l.href + '/'));

  return (
    <header className="site-head">
      <a className="skip" href="#main">Към съдържанието</a>
      <div className="wrap sh-bar">
        <a href="/" className="sh-brand" aria-label="ЦСОП Варна – начална страница">
          <img src="/logo.jpg" alt="" width={44} height={44} />
          <span>
            <b>ЦСОП Варна</b>
            <small>Център за специална образователна подкрепа</small>
          </span>
        </a>

        <nav className="sh-nav" aria-label="Основно меню">
          {NAV.map((g) => (
            <div
              key={g.href}
              className={`sh-item tone-${g.tone}${open === g.href ? ' open' : ''}`}
              onMouseEnter={() => enter(g.href)}
              onMouseLeave={leave}
            >
              <button
                type="button"
                className={`sh-link${isActive(g.href, g.links) ? ' current' : ''}`}
                aria-expanded={open === g.href}
                onClick={() => setOpen(open === g.href ? null : g.href)}
              >
                {g.label}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div className="sh-panel" hidden={open !== g.href}>
                <div className="sh-panel-intro">
                  <a href={g.href} className="sh-panel-title">{g.label}</a>
                  <p>{g.intro}</p>
                </div>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
                        <b>{l.label}</b>
                        {l.desc && <span>{l.desc}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <a href="/kontakti" className={`sh-link solo${pathname === '/kontakti' ? ' current' : ''}`}>Контакти</a>
        </nav>

        <a href="/daritelstvo" className="sh-donate">Дарете</a>
        <button type="button" className="sh-menu" aria-expanded={mobile} aria-controls="mob-nav" onClick={() => setMobile(!mobile)}>
          {mobile ? 'Затвори' : 'Меню'}
        </button>
      </div>

      {/* Мобилно меню */}
      <div id="mob-nav" className="sh-mob" hidden={!mobile}>
        <div className="wrap">
          {NAV.map((g) => (
            <div key={g.href} className={`sh-mob-g tone-${g.tone}`}>
              <button type="button" aria-expanded={mobGroup === g.href} onClick={() => setMobGroup(mobGroup === g.href ? null : g.href)}>
                {g.label}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <ul hidden={mobGroup !== g.href}>
                {g.links.map((l) => (
                  <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <a className="sh-mob-solo" href="/kontakti">Контакти</a>
          <a className="btn btn-primary sh-mob-donate" href="/daritelstvo">Дарете</a>
        </div>
      </div>
    </header>
  );
}
