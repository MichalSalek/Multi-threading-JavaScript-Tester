import {handleGlobalComplexityChange} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import store from '@/application/store/store'



export const handleNewGlobalComplexitySet = (sliderValue: number[] | number | undefined): void => {
    store.dispatch(handleGlobalComplexityChange(Array.isArray(sliderValue) ? sliderValue[0] : sliderValue))
}
