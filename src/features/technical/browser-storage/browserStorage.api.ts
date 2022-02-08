import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



export const setStorageItem = (key: string, value: string): void => {
    fireJustClientSide<void>(() => window.localStorage.setItem(key, value))
}

export const getStorageItem = (key: string): string | null => {
    return fireJustClientSide<string | null>(() => window.localStorage.getItem(key))
}
