/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the floating Next.js dev indicator (the icon bottom-left in dev mode).
  devIndicators: false,
  images: {
    // Local, trusted placeholder SVG screenshots (swap for real raster screenshots later).
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
