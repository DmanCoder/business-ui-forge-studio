/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [500, 768, 1024], // lean default for most images
    imageSizes: [],
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    // Legacy BlackBoltGuitar routes → UI Forge Studio routes.
    const legacyMap = [
      { source: '/blogs', destination: '/insights' },
      { source: '/blogs/:slug', destination: '/insights/:slug' },
      { source: '/categories/:category', destination: '/insights/categories/:category' },
      { source: '/about-me', destination: '/about' },
      { source: '/contact', destination: '/start-a-project' },
      { source: '/privacy-policy', destination: '/privacy' },
      { source: '/terms-and-conditions', destination: '/terms' },
      { source: '/disclaimer', destination: '/' },
      { source: '/editorial-guidelines', destination: '/' },
      { source: '/tools/guitar-chord-diagram-generator', destination: '/' },
    ];

    return legacyMap.flatMap(({ source, destination }) => [
      { source, destination, permanent: true },
      // Locale-prefixed variants of the same legacy routes.
      {
        source: `/:locale(en|es)${source}`,
        destination,
        permanent: true,
      },
    ]);
  },
  async rewrites() {
    return [
      { source: '/', destination: '/en' }, // All other paths (except locales & system paths) → /en/:path*
      {
        source:
          '/:path((?!en(?:/|$)|es(?:/|$)|api|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
        destination: '/en/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)', // Apply these headers to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self), microphone=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
