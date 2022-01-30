import { runInDevEnvOnly } from '@/app-config-and-utils'



export const setStorageItem = (key: string, value: string): void => {
    if (process.browser) {
        return window.localStorage.setItem(key, value)
    } else {
        runInDevEnvOnly(() => console.warn('Bzz bzz, no browser env here -> local storage didn\'t work.'))
    }
}

export const getStorageItem = (key: string): string | null | void => {
    if (process.browser) {
        return window.localStorage.getItem(key)
    } else {
        runInDevEnvOnly(() => console.warn('Bzz bzz, no browser env here -> local storage didn\'t work.'))
    }
}

export default {}
