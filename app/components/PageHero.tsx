import './pagehero.css';

export default function PageHero({
  kicker,
  title,
  intro,
  tone = 'em',
  watermark,
}: {
  kicker: string;
  title: string;
  intro?: string;
  tone?: 'em' | 'bl';
  watermark?: string;
}) {
  return (
    <section className={`page-hero ${tone}`}>
      <div className="ph-blob ph-blob-1" />
      <div className="ph-blob ph-blob-2" />
      <div className="wrap ph-inner">
        {watermark && <span className="ph-watermark" aria-hidden="true">{watermark}</span>}
        <span className="ph-kicker">{kicker.toUpperCase()}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
