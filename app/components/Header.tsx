'use client';

import { useEffect, useRef, useState } from 'react';
import { MEGA } from './megaData';
import ThemeToggle from './ThemeToggle';
import './header.css';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const show = (id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setOpenId(id);
  };

  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenId(null), 180);
  };

  const keep = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <header className={solid ? 'solid' : ''}>
      <div className="bar wrap">
        {/* BRAND LOGO & TITLE */}
        <a href="/" className="brand" aria-label="ЦСОП Варна - Начало">
          <span className="logo-wrap">
            <img src="/logo.jpg" alt="Лого ЦСОП Варна" />
          </span>
          <span className="brand-txt">
            <b className="brand-name">ЦСОП Варна</b>
            <span className="brand-tag">Специална образователна подкрепа</span>
          </span>
        </a>

        {/* DESKTOP REFINED NAVIGATION */}
        <nav className="main-nav" aria-label="Основна навигация">
          {MEGA.map((m) => {
            const isOpen = openId === m.href;
            const isWide = m.subs.length > 4;

            return (
              <div
                key={m.href}
                className={`nav-item ${isOpen ? 'active' : ''}`}
                onMouseEnter={() => show(m.href)}
                onMouseLeave={hide}
              >
                <a
                  href={m.href}
                  className="nav-link"
                  aria-expanded={isOpen}
                >
                  <span>{m.label}</span>
                  <svg
                    className="chevron-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </a>

                {/* ELEGANT COMPACT DROPDOWN POPOVER */}
                <div
                  className={`dropdown-panel ${isWide ? 'wide' : ''}`}
                  onMouseEnter={keep}
                  onMouseLeave={hide}
                >
                  <div className="dropdown-bridge" />
                  <div className="dropdown-card">
                    <div className={`dropdown-grid ${isWide ? 'cols-2' : 'cols-1'}`}>
                      {m.subs.map((s) => (
                        <a
                          key={`${s.href}-${s.label}`}
                          href={s.href}
                          className="dropdown-item"
                          onClick={() => setOpenId(null)}
                        >
                          <div className="item-text">
                            <span className="item-label">{s.label}</span>
                            {s.desc && <span className="item-desc">{s.desc}</span>}
                          </div>
                          <svg
                            className="item-arrow"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </a>
                      ))}
                    </div>

                    <div className="dropdown-footer">
                      <a
                        href={m.href}
                        className="footer-link"
                        onClick={() => setOpenId(null)}
                      >
                        <span>Преглед на секция „{m.label}“</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <a href="/kontakti" className="nav-link single" onMouseEnter={() => setOpenId(null)}>
            <span>Контакти</span>
          </a>

          {/* THEME TOGGLE (DESKTOP) */}
          <div className="theme-toggle-wrap">
            <ThemeToggle />
          </div>

          <a href="/daritelstvo" className="btn-donate" onMouseEnter={() => setOpenId(null)}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="heart-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Дарителство</span>
          </a>
        </nav>

        {/* MOBILE CONTROLS (THEME + BURGER) */}
        <div className="mobile-actions">
          <ThemeToggle className="mobile-header-toggle" />
          <button
            className="burger-btn"
            aria-label="Отвори менюто"
            onClick={() => setMobileOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <div className="mobile-brand">
            <span className="logo-wrap mini">
              <img src="/logo.jpg" alt="" />
            </span>
            <b>ЦСОП Варна</b>
          </div>
          <button
            className="mobile-close"
            aria-label="Затвори менюто"
            onClick={() => setMobileOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mobile-body">
          {MEGA.map((m) => {
            const isExp = expanded === m.href;
            return (
              <div key={m.href} className="mobile-group">
                <button
                  className={`mobile-parent ${isExp ? 'expanded' : ''}`}
                  onClick={() => setExpanded(isExp ? null : m.href)}
                >
                  <span>{m.label}</span>
                  <svg
                    className="mobile-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div className={`mobile-sub ${isExp ? 'open' : ''}`}>
                  <a
                    href={m.href}
                    className="mobile-sub-item main-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    Всичко в „{m.label}“ →
                  </a>
                  {m.subs.map((s) => (
                    <a
                      key={`${s.href}-${s.label}`}
                      href={s.href}
                      className="mobile-sub-item"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mobile-sub-label">{s.label}</span>
                      {s.desc && <span className="mobile-sub-desc">{s.desc}</span>}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}

          <a
            href="/kontakti"
            className="mobile-parent single"
            onClick={() => setMobileOpen(false)}
          >
            <span>Контакти</span>
          </a>

          <div className="mobile-footer">
            <ThemeToggle showLabel className="mobile-toggle" />
            <a
              href="/daritelstvo"
              className="mobile-cta-btn"
              style={{ marginTop: '14px' }}
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Подкрепете ни / Дарителство</span>
            </a>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}
