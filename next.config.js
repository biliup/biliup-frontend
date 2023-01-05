/** @type {import('next').NextConfig} */
const semi = require('@douyinfe/semi-next').default({
  /* the extension options */
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
}

module.exports = semi(nextConfig)
