// Дума на Брайл — релефни точки (българският Брайл следва руския).
// Номерация на точките в клетката: 1-2-3 лява колона отгоре надолу, 4-5-6 дясна.
const CELLS: Record<string, number[]> = {
  а: [1], б: [1, 2], в: [2, 4, 5, 6], г: [1, 2, 4, 5], д: [1, 4, 5], е: [1, 5], ж: [2, 4, 5], з: [1, 3, 5, 6], и: [2, 4],
  й: [1, 2, 3, 4, 6], к: [1, 3], л: [1, 2, 3], м: [1, 3, 4], н: [1, 3, 4, 5], о: [1, 3, 5], п: [1, 2, 3, 4], р: [1, 2, 3, 5],
  с: [2, 3, 4], т: [2, 3, 4, 5], у: [1, 3, 6], ф: [1, 2, 4], х: [1, 2, 5], ц: [1, 4], ч: [1, 2, 3, 4, 5], ш: [1, 5, 6],
  щ: [1, 3, 4, 6], ъ: [1, 2, 3, 5, 6], ь: [2, 3, 4, 5, 6], ю: [1, 2, 5, 6], я: [1, 2, 4, 6],
};
const POS: Record<number, [number, number]> = { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2] };

export default function Braille({ word, label }: { word: string; label?: string }) {
  const letters = [...word.toLowerCase()];
  const cellW = 3.4; // ширина на клетка с отстояние
  return (
    <figure className="braille" title={label ?? `„${word}“ на Брайл`}>
      <svg viewBox={`-0.6 -0.6 ${letters.length * cellW} 3.2`} role="img" aria-label={label ?? `„${word}“ на Брайл`}>
        {letters.map((ch, i) =>
          [1, 2, 3, 4, 5, 6].map((d) => {
            const [cx, cy] = POS[d];
            const on = (CELLS[ch] ?? []).includes(d);
            return <circle key={`${i}-${d}`} className={on ? 'on' : 'off'} cx={i * cellW + cx * 1.1} cy={cy * 1.1} r={on ? 0.42 : 0.16} />;
          })
        )}
      </svg>
      <figcaption>{label ?? `„${word}“ на Брайл`}</figcaption>
    </figure>
  );
}
