const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // PM2 / Node.js server deployment — no static export
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
};

module.exports = withNextIntl(nextConfig);
