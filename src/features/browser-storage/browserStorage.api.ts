import {runInDevEnvOnly} from '@/utils-and-constants.core'



export const setStorageItem = (key: string, value: string): void => {
	if (process.browser) {
		return window.localStorage.setItem(key, value)
	} else {
		runInDevEnvOnly(() => console.warn('Missing process.browser -> Local storage did not work.'))
	}
}

export const getStorageItem = (key: string): string | null | void => {
	if (process.browser) {
		return window.localStorage.getItem(key)
	} else {
		runInDevEnvOnly(() => console.warn('Missing process.browser -> Local storage did not work.'))
	}
}

export default {}
