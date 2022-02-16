/** @type {import('next').NextConfig} */
import path from 'path'


export default {
    async redirects() {
        return [] // Global redirects handler
        // https://nextjs.org/docs/api-reference/next.config.js/redirects
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(path.dirname('./src'), 'styles')]
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    swcMinify: false // error - Failed to load SWC binary for freebsd/x64, see more info here: https://nextjs.org/docs/messages/failed-loading-swc
}
