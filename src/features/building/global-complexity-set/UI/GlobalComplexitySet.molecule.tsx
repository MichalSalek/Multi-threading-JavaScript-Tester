import { Slider } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { PopoverTitleMolecule } from '@/features/building/popover-title/UI/PopoverTitle.molecule'
import { MAX_WORKER_COMPLEXITY_POSSIBILITY, MIN_WORKER_COMPLEXITY_POSSIBILITY } from '@/app-config-constants'
import AppButtonAtom from '@/app-components/AppButton.atom'
import scss from './GlobalComplexitySet.module.scss'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import {
    handleGlobalComplexityChange,
    selectIsAnyWorkerWorking,
    selectIsNoWorkerActive
} from '@/features/background/web-workers/webWorkersSlice'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



export const GlobalComplexitySetMolecule = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isNoWorkerActive = useAppSelector(selectIsNoWorkerActive)



    const [sliderValue, setSliderValue] = useState<number | undefined>(undefined)


    const handleNewSliderRAWValue = (newValue: number): void => {
        setSliderValue(newValue)
    }


    const isSliderHasAnInitialStateYet = useMemo<boolean>(() =>
        typeof sliderValue === 'undefined', [sliderValue])


    const handleNewGlobalComplexitySet = (): void => {
        dispatch(handleGlobalComplexityChange({amount: Array.isArray(sliderValue) ? sliderValue[0] : sliderValue}))
    }

    const handleRefreshUndefinedGlobalComplexityState = (): void => {
        dispatch(handleGlobalComplexityChange({amount: 'NaN'}))
        fireJustClientSide(() => window.setTimeout(() =>
            dispatch(handleGlobalComplexityChange({amount: undefined}))
        , 0))
    }



    return (<section className={scss.host}>
        <PopoverTitleMolecule
            popoverTextContent={'It can be useful if you have many active Workers.'}
            titleTextContent={'Global complexity controls'}
        />

        <Slider
            color={'secondary'}
            valueLabelDisplay="auto"
            disabled={isAnyWorkerWorking}
            aria-labelledby="input-slider"
            min={MIN_WORKER_COMPLEXITY_POSSIBILITY}
            max={MAX_WORKER_COMPLEXITY_POSSIBILITY}
            onChangeCommitted={((_, newValue: number | number[]) => {
                handleNewSliderRAWValue(Array.isArray(newValue) ? newValue[0] : newValue)
            })}
        />

        <AppButtonAtom
            disabled={isSliderHasAnInitialStateYet || isAnyWorkerWorking || isNoWorkerActive}
            onClick={handleNewGlobalComplexitySet}>
            <span>Set to all workers</span>
        </AppButtonAtom>
        <AppButtonAtom
            onClick={handleRefreshUndefinedGlobalComplexityState}
            disabled={isAnyWorkerWorking || isNoWorkerActive}>
            <span>Come back to initial setting</span>
        </AppButtonAtom>
    </section>)
}