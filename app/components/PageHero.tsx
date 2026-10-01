import { NAV, type Tone } from './nav';
import { getPagePhotos } from '../../lib/data';
import './pagehero.css';

/**
 * Заглавие на вътрешна страница.
 * path  — адресът на страницата; от него се вземат цветът на раздела и „пътечката“.
 * page  — ключ за снимки от ЕИС (site_settings.page_photos[page]); първата снимка се показва тук.
 */
export default async function PageHero({
  title,
  intro,
  path,
  page,
  tone,
  kicker,
}: {
  title: string;
  intro?: string;
  path?: string;
  page?: string;
  tone?: Tone | 'em' | 'bl';
  kicker?: string;
  watermark?: string;
}) {
  const group = path ? NAV.find((g) => g.href === path || g.links.some((l) => l.href === path)) : undefined;
  const t: Tone = group?.tone ?? (tone === 'em' ? 'lime' : tone === 'bl' ? 'blue' : (tone as Tone) ?? 'blue');
  const photos = page ? await getPagePhotos(page) : [];
  const photo = photos[0];

  return (
    <div className={`page-hero tone-${t}${photo ? ' has-photo' : ''}`}>
      <div className="wrap ph-grid">
        <div className="ph-text">
          {group ? (
            <nav className="ph-crumb" aria-label="Пътечка">
              <a href="/">Начало</a>
              <span aria-hidden="true">/</span>
              {group.href !== path ? <a href={group.href}>{group.label}</a> : <span>{group.label}</span>}
            </nav>
          ) : kicker ? (
            <p className="ph-crumb"><a href="/">Начало</a><span aria-hidden="true">/</span><span>{kicker}</span></p>
          ) : null}
          <h1>{title}</h1>
          {intro && <p className="ph-intro">{intro}</p>}
        </div>
        {photo && (
          <div className="ph-photo" aria-hidden="true">
            <img src={photo} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
