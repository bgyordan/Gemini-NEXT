import { getSiteInfo, noticeActive } from '../../lib/siteinfo';

// Обява най-горе на всяка страница — пише се от ЕИС → Сайт → Настройки
export default async function SiteNotice() {
  const { notice } = await getSiteInfo();
  if (!noticeActive(notice)) return null;
  const text = notice.text.trim();
  return (
    <div className="site-notice" role="status">
      <div className="wrap">
        {notice.link ? <a href={notice.link}>{text} <span aria-hidden="true">→</span></a> : <span>{text}</span>}
      </div>
    </div>
  );
}
