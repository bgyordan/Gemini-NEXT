import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/golos-text';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import AccessibilityWidget from './components/AccessibilityWidget';
import CookieBanner from './components/CookieBanner';

const SITE = 'https://csop-varna.bg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'ЦСОП Варна – Център за специална образователна подкрепа',
    template: '%s',
  },
  description:
    'Център за специална образователна подкрепа – Варна: обучение, специализирана подкрепа и рехабилитация за деца и младежи със специални образователни потребности.',
  icons: { icon: '/logo.jpg', apple: '/logo.jpg', shortcut: '/logo.jpg' },
  openGraph: {
    title: 'ЦСОП Варна – Център за специална образователна подкрепа',
    description: 'Обучение, специализирана подкрепа и рехабилитация за деца и младежи.',
    url: SITE,
    siteName: 'ЦСОП Варна',
    images: [{ url: '/logo.jpg', width: 512, height: 512, alt: 'Логото на ЦСОП Варна' }],
    locale: 'bg_BG',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1A25' },
  ],
};

// Темата се избира преди първото рисуване (без проблясване).
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('csop-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var h=document.documentElement;h.setAttribute('data-theme',d?'dark':'light');h.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollTop />
        <AccessibilityWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
