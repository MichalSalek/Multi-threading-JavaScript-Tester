/** @type {import('next').NextConfig} */
import path from 'path'
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'


export default withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(path.dirname('./src'), 'styles')]
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    }
})
