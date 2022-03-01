/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NextJSAppSettings = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'global-styles')],
    },
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

