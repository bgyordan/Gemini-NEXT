import './footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="foot-logo-row">
              <span className="foot-logo"><img src="/logo.jpg" alt="ЦСОП Варна" /></span>
              <span className="brand-txt">
                <b>ЦСОП ВАРНА</b>
                <span>Специална образователна подкрепа</span>
              </span>
            </div>
            <p>Обучение, специализирана подкрепа и рехабилитация за деца и семейства.</p>
            <div className="addr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              гр.Варна, ул. „Петко Стайнов“ 7
            </div>
            <div className="foot-social">
              <span className="foot-social-label">Последвайте ни</span>
              <a href="https://www.facebook.com/dimitar.miladinov.374/?locale=bg_BG" target="_blank" rel="noopener noreferrer" className="foot-social-btn" aria-label="Facebook на ЦСОП Варна">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.68 4.53-4.68 1.31 0 2.68.23 2.68.23v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h4>ЗА НАС</h4>
            <a href="/za-nas">За центъра</a>
            <a href="/novini">Новини и блог</a>
            <a href="/za-nas/ekip">Екип</a>
            <a href="/za-nas/vatreshni-dokumenti">Документи</a>
          </div>
          <div className="foot-col">
            <h4>ЗА РОДИТЕЛИ</h4>
            <a href="/za-roditeli/dneven-rezhim">Дневен режим</a>
            <a href="/za-roditeli/uchebno-razpisanie">Разписания</a>
            <a href="/za-roditeli/priemno-vreme">Приемно време</a>
            <a href="/za-roditeli/uslugi">Услуги</a>
          </div>
          <div className="foot-col">
            <h4>ПРИЕМ</h4>
            <a href="/priem/proczedura">Процедура</a>
            <a href="/priem/poseshtenie">Посещение</a>
            <a href="/kontakti">Контакти</a>
            <a href="/daritelstvo">Дарителство</a>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 ЦСОП – Варна. Всички права запазени.</span>
          <span>Политика за поверителност</span>
        </div>
      </div>
    </footer>
  );
}
