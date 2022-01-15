/** @type {import('next').NextConfig} */
import path from 'path'


export default {
    async redirects() {
        return [ ] // Global redirects handler
        // https://nextjs.org/docs/api-reference/next.config.js/redirects
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(path.dirname('./src'), 'styles')]
    }
}
