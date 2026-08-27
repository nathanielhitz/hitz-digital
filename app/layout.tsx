import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { site, professionalServiceSchema, websiteSchema, faqPageSchema } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

/** General Sans (koppen), self-hosted: geen externe request, geen render-blocking CSS. */
const display = localFont({
  src: [
    { path: "./fonts/GeneralSans-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display-src",
  display: "swap",
  preload: true,
});

const title = "Websites, hosting en computerhulp in de Hoeksche Waard | HitzDigital";
const description =
  "Ik bouw websites voor ondernemers in de Hoeksche Waard, houd ze online en help als je computer of site vastloopt. Eén persoon, korte lijnen. Website vanaf €250, hosting vanaf €5 per maand, alles incl. btw.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const faqSchema = faqPageSchema();
  return (
    <html lang="nl" className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
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
