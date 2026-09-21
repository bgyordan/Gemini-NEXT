import type { ReactNode } from 'react';
import './editorial.css';

/* Обвивка на редакционен текст.
   justify -> двустранно подравняване с пренасяне (за дълги, четивни текстове). */
export function Article({ children, justify = false }: { children: ReactNode; justify?: boolean }) {
  return (
    <article className="ed" lang="bg">
      <div className={`ed-body${justify ? ' justify' : ''}`}>{children}</div>
    </article>
  );
}

/* Дребен главен надпис-акцент над заглавие/секция */
export function Kicker({ children }: { children: ReactNode }) {
  return <span className="ed-kicker">{children}</span>;
}

/* Заглавие (serif). За италик акцент ползвай <em> вътре. */
export function Title({ children }: { children: ReactNode }) {
  return <h1 className="ed-title">{children}</h1>;
}

/* Подзаглавие / байлайн с малки капители */
export function Byline({ children }: { children: ReactNode }) {
  return <p className="ed-byline">{children}</p>;
}

/* Водещ абзац (по-голям serif) */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="ed-lead">{children}</p>;
}

/* Абзац. dropCap -> голяма първа буква (само за първия абзац). */
export function Para({ children, dropCap = false }: { children: ReactNode; dropCap?: boolean }) {
  return <p className={dropCap ? 'ed-drop' : undefined}>{children}</p>;
}

/* Секционен разделител: кикер + тънка линия */
export function Section({ label }: { label: string }) {
  return (
    <div className="ed-section">
      <span>{label}</span>
      <div className="line" />
    </div>
  );
}

/* Подзаглавие на секция */
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="ed-h2">{children}</h2>;
}

/* Тонирано каре около важен параграф */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="ed-callout">
      <p>{children}</p>
    </div>
  );
}

/* Голям цитат с незадължителен подпис */
export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <div className="ed-quote">
      <p>{children}</p>
      {cite && <cite>{cite}</cite>}
    </div>
  );
}

/* Бележка в полето (маргиналия). На тесен екран става нормален акцент. */
export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="ed-note">
      {title && <b>{title}</b>}
      {children}
    </aside>
  );
}

/* Орнаментен разделител между блокове */
export function Divider() {
  return (
    <div className="ed-hr">
      <span>✳</span>
    </div>
  );
}
