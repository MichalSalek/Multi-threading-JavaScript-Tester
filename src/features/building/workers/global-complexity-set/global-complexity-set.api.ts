import {handleGlobalComplexityChange} from '@/features/background/workers/workers.slice'
import store from '@/core/store.core'



export const handleNewGlobalComplexitySet = (sliderValue: number[] | number | undefined): void => {
    store.dispatch(handleGlobalComplexityChange({amount: Array.isArray(sliderValue) ? sliderValue[0] : sliderValue}))
}
