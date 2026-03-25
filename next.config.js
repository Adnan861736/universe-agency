// next.config.js — UniVerse Agency
//
// GITHUB PAGES SUBDIRECTORY DEPLOYMENT:
// If your repo is at https://username.github.io/repo-name/
// uncomment the basePath line below and set it to your repo name:
//
//   basePath: '/repo-name',
//
// Then also update any absolute hrefs in the code (e.g. /en → /repo-name/en).
// For a custom domain (username.github.io) no basePath is needed.

const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/universe-agency',
  assetPrefix: '/universe-agency',
};

module.exports = withNextIntl(nextConfig);
