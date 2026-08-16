import './pagehero.css';

export default function PageHero({
  kicker,
  title,
  intro,
  tone = 'em',
}: {
  kicker: string;
  title: string;
  intro?: string;
  tone?: 'em' | 'bl';
}) {
  return (
    <section className={`page-hero ${tone}`}>
      <div className="ph-blob ph-blob-1" />
      <div className="ph-blob ph-blob-2" />
      <div className="wrap ph-inner">
        <span className="ph-kicker">{kicker.toUpperCase()}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
