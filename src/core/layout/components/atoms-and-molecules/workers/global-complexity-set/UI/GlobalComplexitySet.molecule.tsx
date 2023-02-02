import {Slider} from '@mui/material'
import React, {useEffect, useMemo, useState} from 'react'
import {PopoverTitleMolecule} from '@/core/layout/components/atoms-and-molecules/popover-title/UI/PopoverTitle.molecule'
import AppButtonAtom from '@/core/layout/components/common/AppButton.atom'
import scss from './globalComplexitySet.module.scss'
import {useAppDispatch, useAppSelector} from '@/application/store/store'
import {
    handleGlobalComplexityChange,
    selectIsAnyWorkerWorking
} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {fireClientSide} from '@/utils/environmentOperations.api'
import {
    useSliderRAWValueHandler
} from '@/core/layout/components/atoms-and-molecules/workers/global-complexity-set/useSliderRAWValueHandler'
import {
    handleNewGlobalComplexitySet
} from '@/core/layout/components/atoms-and-molecules/workers/global-complexity-set/global-complexity-set.api'
import {WorkersPolicy} from '../../../../../../../../shared-policies/workers.policy'
import {selectIsNoWorkerActive} from '@/application/workers/workers.slice'



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
        dispatch(handleGlobalComplexityChange('NaN'))
        fireClientSide(() => window.setTimeout(() =>
            dispatch(handleGlobalComplexityChange(undefined))
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
            min={WorkersPolicy.MIN_WORKER_COMPLEXITY_POSSIBILITY}
            max={WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY}
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
                freezeAfterClick={true}
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