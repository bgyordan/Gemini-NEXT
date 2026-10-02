import { getNews, getUpcomingEvents, getHeroPhotos, getLatestPhotos, fmtDate, monthShort } from '../lib/data';
import { getSiteInfo } from '../lib/siteinfo';
import PhotoBand from './components/PhotoBand';
import './home.css';

// снимки по подразбиране, докато в ЕИС не са избрани други
const FALLBACK = ['/nachalna/kabineti-3.jpg', '/nachalna/terapiya-1.jpg', '/nachalna/kabineti-1.jpg'];

const STEPS = [
  {
    title: 'Подавате заявление',
    text: 'Детето е записано в училище или детска градина. Подавате заявление за насочване заедно с документите за здравословното състояние и протокол от ТЕЛК, НЕЛК или ЛКК.',
  },
  {
    title: 'Ние подготвяме преписката',
    text: 'Екипът за подкрепа за личностно развитие изготвя становище и протокол. Изпращаме документите към РЦПППО – Варна в срок до един месец.',
  },
  {
    title: 'Детето започва при нас',
    text: 'След становището на РЦПППО попълвате заявлението за записване и детето започва обучение и терапия по своя план.',
  },
];

const VALUES = [
  { t: 'Приемане', d: 'Всяко дете е добре дошло такова, каквото е – със своя ритъм, характер и начин да опознава света.' },
  { t: 'Индивидуалност', d: 'Работим по личен план за всеки ученик, изготвен от екип специалисти според неговите нужди.' },
  { t: 'Заедно', d: 'Родители, учители и терапевти сме един екип. Развитието на детето е обща грижа и обща радост.' },
  { t: 'Посока', d: 'Не бързаме. Важното е да вървим в правилната посока.' },
];

const DOCS = [
  { t: 'Бюджет и финанси', d: 'Бюджет и отчети', href: '/za-nas/byudzhet-i-finansi', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2' },
  { t: 'Документи в ЦСОП', d: 'Правилници, планове и политики', href: '/za-nas/dokumenti-v-tsop', icon: 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h6' },
  { t: 'Профил на купувача', d: 'Обществени поръчки в ЦАИС ЕОП', href: '/za-nas/profil-na-kupuvacha', icon: 'M3 7h18v13H3zM8 7V4h8v3' },
  { t: 'Достъп до информация', d: 'Заявления и отчети по ЗДОИ', href: '/za-nas/dostap-do-obshtestvena-informatsiya', icon: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4' },
  { t: 'Защита на личните данни', d: 'Политика по GDPR', href: '/za-nas/zashtita-na-lichnite-danni', icon: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z' },
  { t: 'Подаване на сигнали', d: 'Поверителен канал по ЗЗЛПСПОИН', href: '/podavane-na-signali', icon: 'M4 5h16v11H9l-5 4z' },
];

export default async function Home() {
  const { contact: CONTACT, hours: HOURS } = await getSiteInfo();
  const [hero, news, events, photos] = await Promise.all([getHeroPhotos(), getNews(4), getUpcomingEvents(3), getLatestPhotos(8)]);
  // празно място ('') от ЕИС → стандартната снимка точно там
  const h = [0, 1, 2].map((i) => hero[i] || FALLBACK[i]);
  const [feat, ...rest] = news;

  return (
    <>
      {/* ===== Герой: трите снимки се завъртат около общ център, като в логото ===== */}
      <section className="home-hero">
        <div className="wrap hh-grid">
          <div className="hh-text">
            <h1>Посоката, в която се движим, е по‑важна от скоростта</h1>
            <p className="hh-lead">
              Обучаваме и подкрепяме над 150 деца и младежи със специални образователни потребности.
              Всяко дете учи по свой план, изготвен от екип специалисти, а родителите са част от този екип.
            </p>
            <div className="btn-row hh-actions">
              <a className="btn btn-primary" href="/priem/proczedura">Как се записва дете</a>
              <a className="btn btn-ghost" href="/priem/poseshtenie">Елате на посещение</a>
            </div>
            <p className="hh-quick">
              <span><strong>{CONTACT.address}</strong>, Варна</span>
              <span>Понеделник – петък, <strong>{HOURS.center}</strong></span>
            </p>
          </div>
          <div className="swirl" aria-hidden="true">
            <div className="swirl-spin">
              <div className="sw-ph sw-1"><img src={h[0]} alt="" /></div>
              <div className="sw-ph sw-2"><img src={h[1]} alt="" /></div>
              <div className="sw-ph sw-3"><img src={h[2]} alt="" /></div>
            </div>
            <div className="sw-core"><span className="sw-kids" /></div>
          </div>
        </div>
      </section>

      {/* ===== Записване: истинска последователност I–III ===== */}
      <section className="section soft tone-orange" aria-labelledby="priem-h">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="priem-h">Записване на дете в три стъпки</h2>
              <p>Насочването става чрез РЦПППО – Варна. Ние подготвяме документите и ви водим през целия път.</p>
            </div>
            <a className="more" href="/priem/proczedura">Пълната процедура и бланките</a>
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="st-n">{['I', 'II', 'III'][i]}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Новини + събития ===== */}
      <section className="section tone-lime" aria-labelledby="news-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="news-h">Какво се случва при нас</h2>
            <a className="more" href="/novini">Всички новини</a>
          </div>
          {!feat ? (
            <p className="empty">Скоро тук ще има новини от живота в центъра.</p>
          ) : (
            <div className="hn-grid">
              <a className="hn-feat" href={`/novini/${feat.slug}`}>
                <div className="hn-img">
                  {feat.cover_url ? <img src={feat.cover_url} alt="" /> : <span className="hn-noimg" />}
                </div>
                <p className="hn-meta"><span className="tag">{feat.category}</span> <time>{fmtDate(feat.published_at)}</time></p>
                <h3>{feat.title}</h3>
                {feat.excerpt && <p className="hn-ex">{feat.excerpt}</p>}
              </a>
              <div className="hn-side">
                {rest.length > 0 && (
                  <ul className="hn-list">
                    {rest.map((n) => (
                      <li key={n.id}>
                        <a href={`/novini/${n.slug}`}>
                          {n.cover_url ? <img src={n.cover_url} alt="" loading="lazy" /> : <span className="hn-noimg" />}
                          <span>
                            <b>{n.title}</b>
                            <time>{fmtDate(n.published_at)}</time>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="hn-events">
                  <h3>Предстоящи събития</h3>
                  {events.length === 0 ? (
                    <p className="muted">Няма обявени събития в момента.</p>
                  ) : (
                    <ul>
                      {events.map((e) => (
                        <li key={e.id}>
                          <span className="ev-day"><b>{new Date(e.event_date).getDate()}</b>{monthShort(e.event_date)}</span>
                          <span>
                            <b>{e.title}</b>
                            {(e.event_time || e.location) && (
                              <small>{[e.event_time && `${e.event_time} ч.`, e.location].filter(Boolean).join(', ')}</small>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a className="more" href="/sabitiya">Всички събития</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== Галерия ===== */}
      {photos.length > 0 && (
        <section className="section tone-lime" aria-labelledby="gal-h">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="gal-h">Моменти от ежедневието</h2>
              <a className="more" href="/galeriya">Към галерията</a>
            </div>
            <PhotoBand photos={photos.map((p) => p.photo_url)} title="Моменти от ежедневието" />
          </div>
        </section>
      )}

      {/* ===== Ценности ===== */}
      <section className="section tint" aria-labelledby="val-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="val-h">Това, в което вярваме</h2>
            <a className="more" href="/za-nas">Повече за центъра</a>
          </div>
          <div className="vals">
            {VALUES.map((v) => (
              <div key={v.t} className="val">
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Прозрачност ===== */}
      <section className="section tone-blue" aria-labelledby="prz-h">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="prz-h">Прозрачност</h2>
              <p>Документите на центъра са публични и на едно място.</p>
            </div>
            <a className="more" href="/prozrachnost">Всички документи</a>
          </div>
          <div className="link-list" style={{ ['--cols' as any]: 3 }}>
            {DOCS.map((d) => (
              <a key={d.href} href={d.href}>
                <span className="ll-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon} /></svg>
                </span>
                <span><span className="ll-t">{d.t}</span><span className="ll-d">{d.d}</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Дарителство ===== */}
      <section className="section tone-orange" aria-labelledby="don-h">
        <div className="wrap">
          <div className="donate-band">
            <div>
              <h2 id="don-h">Помогнете ни да направим средата още по-добра</h2>
              <p>Всяко дарение отива за терапевтичната и учебната среда на децата.</p>
            </div>
            <a className="btn btn-primary" href="/daritelstvo">Как да дарите</a>
          </div>
        </div>
      </section>
    </>
  );
}
