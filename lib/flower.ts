// Форма „цвете“ за clip-path: n заоблени листа около центъра.
// r(θ) = 1 − depth + depth·|cos(nθ/2)|^0.7 — листата са пълни, а вдлъбнатините между тях меки.
// Връща CSS polygon() в проценти (центъра е 50% 50%); rot завърта цветето, за да не са еднакви.
export function flowerPolygon(petals: number, depth = 0.17, rot = 0, steps = 240): string {
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = 1 - depth + depth * Math.pow(Math.abs(Math.cos((petals * t) / 2)), 0.7);
    const a = t + rot;
    pts.push(`${(50 + 50 * r * Math.cos(a)).toFixed(2)}% ${(50 + 50 * r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(', ')})`;
}
