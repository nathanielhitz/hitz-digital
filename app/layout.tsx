import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { site, professionalServiceSchema } from "@/lib/site";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

// MVP stand-in for General Sans (build brief §2.3).
// TODO(polish): self-host General Sans (Fontshare woff2) via next/font/local and swap here.
const display = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display-src",
  display: "swap",
});

const title = "HitzDigital — Websites die direct professioneler voelen";
const description =
  "Moderne websites en redesigns voor kleine ondernemers. Je ziet eerst een concrete preview, daarna beslis je pas.";

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
    images: [{ url: "/og/cover.svg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/cover.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${body.variable} ${display.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Naar inhoud
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
        />
      </body>
    </html>
  );
}
