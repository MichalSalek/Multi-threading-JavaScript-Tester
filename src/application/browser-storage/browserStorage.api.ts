import { fireClientSide } from '@/utils/environmentOperations.api'



export const setStorageItem = (key: string, value: string): void => {
    fireClientSide<void>(() => window.localStorage.setItem(key, value))
}

export const getStorageItem = (key: string): string | null => {
    return fireClientSide<string | null>(() => window.localStorage.getItem(key))
}
