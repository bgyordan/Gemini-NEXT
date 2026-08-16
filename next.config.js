/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    // Не спирай продукшън билда заради ESLint предупреждения
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
