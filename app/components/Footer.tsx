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
              гр. Варна, ул. „Петко Стайнов“ 7
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
