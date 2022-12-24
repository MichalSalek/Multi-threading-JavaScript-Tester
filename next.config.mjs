/** @type {import('next').NextConfig} */
import withNextPWA from 'next-pwa'

const NextJSAppSettings = {
  reactStrictMode: true,

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

}


const withPWA = withNextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  sw: 'sw.js',
})

export default withPWA({
  ...NextJSAppSettings
})