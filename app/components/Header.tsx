'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV } from './nav';
import ThemeToggle from './ThemeToggle';
import './header.css';

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState<string | null>(null); // отворено падащо меню (desktop)
  const [mobile, setMobile] = useState(false);
  const [mobGroup, setMobGroup] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false); // страницата е превъртяна → капсулата става „стъклена“ и по-ниска
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // затваря менютата при смяна на страница
  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobile(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  // кратко забавяне при първо отваряне — менюто не „мига“, ако мишката само минава през лентата
  const enter = (k: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (open) setOpen(k);
    else timer.current = setTimeout(() => setOpen(k), 110);
  };
  const leave = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 160); };

  // само един раздел е „текущ“ — първият, в който е страницата (някои страници са в два раздела)
  const activeGroup = NAV.find((g) => pathname === g.href || g.links.some((l) => pathname === l.href || pathname.startsWith(l.href + '/')))?.href;
  const isActive = (href: string, _links?: { href: string }[]) => href === activeGroup;

  return (
    <header className={`site-head${open ? ' is-open' : ''}${stuck ? ' is-stuck' : ''}${mobile ? ' is-mob' : ''}`}>
      <a className="skip" href="#main">Към съдържанието</a>
      <div className="wrap sh-bar">
        <a href="/" className="sh-brand" aria-label="ЦСОП Варна – начална страница">
          <img src="/logo.jpg" alt="" width={56} height={56} />
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
                <i className="sh-dot" aria-hidden="true" />
                {g.label}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <div className="sh-panel" hidden={open !== g.href}>
                <div className="sh-panel-in">
                  <div className="sh-panel-intro">
                    <p className="sh-panel-title">{g.label}</p>
                    <p>{g.intro}</p>
                    <a href={g.href} className="sh-panel-all">Към раздела</a>
                  </div>
                  <ul>
                    {g.links.map((l, i) => (
                      <li key={l.href} style={{ ['--i' as any]: i }}>
                        <a href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
                          <b>{l.label}</b>
                          {l.desc && <span>{l.desc}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className="sh-item tone-orange"><a href="/kontakti" className={`sh-link solo${pathname === '/kontakti' ? ' current' : ''}`}><i className="sh-dot" aria-hidden="true" />Контакти</a></div>
        </nav>

        <ThemeToggle />
        <a href="/daritelstvo" className="sh-donate"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.1 4.5c2 0 3.6 1.1 4.9 2.9 1.3-1.8 2.9-2.9 4.9-2.9 3.5 0 5.6 3.5 4.4 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" /></svg>Дарителство</a>
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
                <i className="sh-dot" aria-hidden="true" />
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
          <a className="sh-mob-solo tone-orange" href="/kontakti"><i className="sh-dot" aria-hidden="true" />Контакти</a>
          <a className="sh-donate sh-mob-donate" href="/daritelstvo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7.1 4.5c2 0 3.6 1.1 4.9 2.9 1.3-1.8 2.9-2.9 4.9-2.9 3.5 0 5.6 3.5 4.4 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" /></svg>Дарителство</a>
        </div>
      </div>
    </header>
  );
}
