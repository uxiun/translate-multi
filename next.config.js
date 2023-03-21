/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  ...nextConfig,
  webpack: config => {
    config.resolve.fallback = {fs: false}
    return config
  },
}
// {
//   ...nextConfig,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.node = {
//         fs: "empty"
//       }
//     }
//     return config
//   }
// }
