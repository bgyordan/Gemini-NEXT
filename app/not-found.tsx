import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Страницата не е намерена — ЦСОП Варна',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ padding: '120px 20px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '540px' }}>
          <span style={{ fontSize: '64px', fontWeight: 800, fontFamily: 'var(--serif)', color: 'var(--clay)', display: 'block', marginBottom: '12px' }}>
            404
          </span>
          <h1 style={{ fontSize: '28px', fontFamily: 'var(--serif)', marginBottom: '16px' }}>
            Страницата не е намерена
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
            Съжаляваме, но страницата, която търсите, не съществува или е била преместена.
          </p>
          <Link href="/" className="btn btn-primary">
            Към началната страница
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
