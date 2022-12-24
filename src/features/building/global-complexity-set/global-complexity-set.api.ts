import {handleGlobalComplexityChange} from '@/features/background/web-workers/webWorkersSlice'
import store from '@/core/store.core'



export const handleNewGlobalComplexitySet = (sliderValue: number[] | number | undefined): void => {
    store.dispatch(handleGlobalComplexityChange({amount: Array.isArray(sliderValue) ? sliderValue[0] : sliderValue}))
}
