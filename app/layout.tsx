import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site, professionalServiceSchema, websiteSchema, faqPageSchema } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
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
    <html lang="nl" className={body.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
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
