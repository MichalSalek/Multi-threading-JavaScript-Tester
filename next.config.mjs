/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'

const NextJSAppSettings = {
    reactStrictMode: true,

    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    }
}

// Thanks to that, PWA will not run during the development process.
export default (() => process.env.NODE_ENV === 'development' ? NextJSAppSettings :
    withPWA({
        ...NextJSAppSettings,
        ...{
            pwa: {
                dest: 'public',
                runtimeCaching
            }
        }
    }))()
