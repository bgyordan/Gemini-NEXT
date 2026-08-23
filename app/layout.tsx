import type { Metadata } from "next";
import "./globals.css";
import BackdropBlobs from "./components/BackdropBlobs";

export const metadata: Metadata = {
  metadataBase: new URL("https://web.csop-varna.bg"),
  title: "Център за специална образователна подкрепа – Варна",
  description:
    "Центърът предоставя обучение, специализирана подкрепа и услуги за рехабилитация, за да могат децата и семействата да изживеят пълноценно своя личен и социален живот.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
    shortcut: "/logo.jpg",
  },
  openGraph: {
    title: "Център за специална образователна подкрепа – Варна",
    description:
      "Обучение, специализирана подкрепа и рехабилитация за деца и семейства.",
    url: "https://web.csop-varna.bg",
    siteName: "ЦСОП – Варна",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "Логото на ЦСОП – Варна",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=Golos+Text:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('csop-theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body><BackdropBlobs />{children}</body>
    </html>
  );
}
