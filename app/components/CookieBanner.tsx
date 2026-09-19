'use client';

import { useEffect, useState } from 'react';

const KEY = 'csop-cookie-consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch { /* ignore */ }
  }, []);

  const accept = () => {
    try { localStorage.setItem(KEY, new Date().toISOString()); } catch { /* ignore */ }
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <style>{`
        .cookie-bar {
          position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 1100;
          max-width: 720px; margin: 0 auto;
          background: #fff; border: 1px solid #e6eaf0; border-radius: 18px;
          box-shadow: 0 20px 50px -16px rgba(16,34,64,.3);
          padding: 18px 20px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
          font-family: var(--sans, system-ui);
        }
        .cookie-bar .ck-ic {
          width: 40px; height: 40px; border-radius: 12px; flex: 0 0 auto;
          background: rgba(34,179,122,.12); color: #0E8A61; display: grid; place-items: center;
        }
        .cookie-bar .ck-txt { flex: 1; min-width: 220px; }
        .cookie-bar .ck-txt p { margin: 0; font-size: 13.5px; line-height: 1.6; color: #475569; }
        .cookie-bar .ck-txt a { color: #0E8A61; font-weight: 600; text-decoration: none; }
        .cookie-bar .ck-txt a:hover { text-decoration: underline; }
        .cookie-bar .ck-btn {
          border: none; cursor: pointer; background: #0E8A61; color: #fff;
          padding: 11px 22px; border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 600;
          transition: background .2s; flex: 0 0 auto;
        }
        .cookie-bar .ck-btn:hover { background: #0c7350; }
        @media (max-width: 520px) {
          .cookie-bar { flex-direction: column; align-items: stretch; text-align: left; }
          .cookie-bar .ck-btn { width: 100%; }
        }
      `}</style>
      <div className="cookie-bar" role="dialog" aria-label="Съобщение за бисквитки">
        <span className="ck-ic" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
            <circle cx="8.5" cy="10.5" r="1" fill="currentColor" /><circle cx="12.5" cy="15" r="1" fill="currentColor" /><circle cx="15.5" cy="10" r="1" fill="currentColor" />
          </svg>
        </span>
        <div className="ck-txt">
          <p>
            Този сайт използва само технически необходими данни (напр. избраната тема и настройки за достъпност).
            Не използваме рекламни или аналитични бисквитки. Вградената карта в „Контакти“ може да зареди бисквитки от Google.{' '}
            <a href="/politika-za-biskvitki">Политика за бисквитки</a>
          </p>
        </div>
        <button className="ck-btn" onClick={accept}>Разбрах</button>
      </div>
    </>
  );
}
