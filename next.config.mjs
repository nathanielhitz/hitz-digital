/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the floating Next.js dev indicator (the icon bottom-left in dev mode).
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Clippen-homepage (Google OAuth-verificatie wijst naar /clippen/). Statische bestanden onder public/
      // worden niet als index geserveerd en de middleware herschrijft /clippen naar de NL-404, dus expliciet doorsturen.
      { source: "/clippen", destination: "/clippen/index.html", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        // Statische portfolio-afbeeldingen werden met max-age=0 geserveerd (geen browsercaching).
        // 7 dagen cache + stale-while-revalidate. LET OP: bestandsnamen zijn niet gehasht —
        // hernoem een afbeelding als je 'm vervangt en direct een verse versie wilt tonen.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
