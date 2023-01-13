import {Slider} from '@mui/material'
import React, {useEffect, useMemo, useState} from 'react'
import {PopoverTitleMolecule} from '@/features/building/popover-title/UI/PopoverTitle.molecule'
import {MAX_WORKER_COMPLEXITY_POSSIBILITY, MIN_WORKER_COMPLEXITY_POSSIBILITY} from '@/core/constants.core'
import AppButtonAtom from '@/features/building/_shared-components/AppButton.atom'
import scss from './globalComplexitySet.module.scss'
import {useAppDispatch, useAppSelector} from '@/core/store.core'
import {
    handleGlobalComplexityChange,
    selectIsAnyWorkerWorking,
    selectIsNoWorkerActive
} from '@/features/background/web-workers/webWorkersSlice'
import {fireClientSide} from '@/core/low-level-utils/environmentOperations.api'
import {useSliderRAWValueHandler} from '@/features/building/global-complexity-set/useSliderRAWValueHandler'
import {handleNewGlobalComplexitySet} from '@/features/building/global-complexity-set/global-complexity-set.api'



export const GlobalComplexitySetMolecule = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isNoWorkerActive = useAppSelector(selectIsNoWorkerActive)

    const [sliderValue, handleSliderRAWValue] = useSliderRAWValueHandler()

    const [setDataButtonDisabledState, setSetDataButtonDisabledState] = useState(false)
    useEffect(() => {
        setSetDataButtonDisabledState(false)
    }, [sliderValue, setSetDataButtonDisabledState])
    

    const isSliderHasAnInitialStateYet = useMemo<boolean>(() =>
        typeof sliderValue === 'undefined', [sliderValue])


    const handleRefreshUndefinedGlobalComplexityState = (): void => {
        dispatch(handleGlobalComplexityChange({amount: 'NaN'}))
        fireClientSide(() => window.setTimeout(() =>
            dispatch(handleGlobalComplexityChange({amount: undefined}))
        , 0))
    }


    return (<section className={scss.host}>
        <PopoverTitleMolecule
            popoverTextContent={'It can be useful if you have many active Workers.'}
            titleTextContent={'Global complexity controls:'}
        />

        <Slider
            className={scss.slider}
            color={'secondary'}
            valueLabelDisplay="auto"
            disabled={isAnyWorkerWorking}
            aria-labelledby="input-slider"
            min={MIN_WORKER_COMPLEXITY_POSSIBILITY}
            max={MAX_WORKER_COMPLEXITY_POSSIBILITY}
            onChangeCommitted={((_, newValue: number | number[]) => {
                handleSliderRAWValue(Array.isArray(newValue) ? newValue[0] : newValue)
            })}
        />

        <section className={scss.buttons}>
            <AppButtonAtom
                disabled={isSliderHasAnInitialStateYet || isAnyWorkerWorking || isNoWorkerActive || setDataButtonDisabledState}
                onClick={() => {
                    setSetDataButtonDisabledState(true)
                    handleNewGlobalComplexitySet(sliderValue)
                }}>
                <span>Set to all workers</span>
            </AppButtonAtom>
            <AppButtonAtom
                freezeOnClick={true}
                onClick={async () => {
                    handleRefreshUndefinedGlobalComplexityState()

                    setSetDataButtonDisabledState(false)
                }}
                disabled={isAnyWorkerWorking || isNoWorkerActive}
            >
                <span>Come back to initial setting</span>
            </AppButtonAtom>
        </section>
    </section>)
}