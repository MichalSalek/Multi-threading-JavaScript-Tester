/** @type {import('next').NextConfig} */
import path from 'path'


export default {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(path.dirname('./src'), 'styles')]
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    }
}
