// Съединение между две секции с различен фон на началната страница.
// Тънка нишка минава през смяната на фона, а в средата е „възел“ — спиралата от логото, която се върти при превъртане.
export default function SectionJoin() {
  return (
    <div className="sj" aria-hidden="true">
      <span className="sj-knot">
        <svg viewBox="-1.15 -1.15 2.3 2.3">
          <g className="sj-knot-g">
            <path fill="var(--brand-orange)" d="M-0.922 0.386A1 1 0 1 1 0.999 0.047A1 1 0 0 0 -0.922 0.386Z" />
            <path fill="var(--brand-lime)" d="M0.127 -0.992A1 1 0 1 1 -0.540 0.841A1 1 0 0 0 0.127 -0.992Z" />
            <path fill="var(--brand-blue)" d="M0.796 0.606A1 1 0 1 1 -0.459 -0.889A1 1 0 0 0 0.796 0.606Z" />
          </g>
        </svg>
      </span>
    </div>
  );
}
