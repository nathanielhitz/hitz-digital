/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the floating Next.js dev indicator (the icon bottom-left in dev mode).
  devIndicators: false,
  images: {
    // Local, trusted placeholder SVG screenshots (swap for real raster screenshots later).
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
