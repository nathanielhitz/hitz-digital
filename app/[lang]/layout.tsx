import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site, professionalServiceSchema, websiteSchema, faqPageSchema } from "@/lib/site";
import { locales, langOf, type LangParams } from "@/lib/i18n/paths";
import "../globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

/** General Sans (koppen), self-hosted: geen externe request, geen render-blocking CSS. */
const display = localFont({
  src: [
    { path: "../fonts/GeneralSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display-src",
  display: "swap",
  preload: true,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Alleen de talen uit generateStaticParams renderen; elke andere `lang` is een 404 (vangnet uit spec §1).
    Zonder dit zou een pad dat de middleware overslaat (bijv. /wp-login.php) als `lang` binnenkomen en de homepage opleveren. */
export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  openGraph: { siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default async function LangLayout({ children, params }: Readonly<{ children: React.ReactNode }> & LangParams) {
  const lang = langOf((await params).lang);
  const faqSchema = faqPageSchema();
  return (
    <html lang={lang} className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        {/* next-themes zet data-theme + color-scheme op <html> via een inline script vóór hydration:
            systeemvoorkeur als default, handmatige keuze in localStorage ("theme"). Geen flash. */}
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
