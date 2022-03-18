/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.theatre-madeleine.com%2Fwp-content%2Fuploads%2F2019%2F10%2Ftheatre-de-la-madeleine-03.jpg&f=1&nofb=1',
  },
}

module.exports = nextConfig
