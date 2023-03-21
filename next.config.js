/** @type {import('next').NextConfig} */

const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : undefined // if "" instead of undefined: error
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
}

module.exports = nextConfig

// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }

// module.exports = {
//   ...nextConfig,
//   webpack: config => {
//     config.resolve.fallback = {fs: false}
//     return config
//   },
// }
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
