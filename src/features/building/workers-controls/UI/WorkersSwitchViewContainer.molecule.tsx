import React, { useMemo, useState } from 'react'
import {
    selectIsAnyWorkerWorking,
    selectIsNoWorkerActive,
    selectRequestedWorkersAmount
} from '@/features/background/web-workers/webWorkersSlice'
import WorkersWorkSwitchMolecule from '@/features/building/workers-controls/UI/WorkersWorkSwitch.molecule'
import { constructWorkerNameByOrderIndex } from '@/features/background/web-workers/webWorkers.api'
import { useAppSelector } from '@/core/store.core'
import scss from './WorkersView.module.scss'
import { MAX_WORKER_COMPLEXITY_POSSIBILITY, MIN_WORKER_COMPLEXITY_POSSIBILITY } from '@/app-config-constants'
import { Slider } from '@mui/material'
import AppButtonAtom from '@/app-components/AppButton.atom'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



const WorkersSwitchViewContainerMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isNoWorkerActive = useAppSelector(selectIsNoWorkerActive)


    const [sliderValue, setSliderValue] = useState<number | undefined>(undefined)

    const [globalComplexityValue, setGlobalComplexityValue] = useState<number | undefined | 'NaN'>(undefined)


    const handleNewSliderRAWValue = (newValue: number): void => {
        setSliderValue(newValue)
    }


    const isSliderHasAnInitialStateYet = useMemo<boolean>(() =>
        typeof sliderValue === 'undefined', [sliderValue])


    const handleNewGlobalComplexitySet = (): void => {
        setGlobalComplexityValue(Array.isArray(sliderValue) ? sliderValue[0] : sliderValue)
    }

    const handleRefreshUndefinedGlobalComplexityState = (): void => {
        setGlobalComplexityValue(() => 'NaN')
        fireJustClientSide(() => window.setTimeout(() => setGlobalComplexityValue(undefined), 0))
    }

    const workersAmountArray = useMemo(() =>
        Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])



    return (<main className={scss.host}>

        <section>
            <Slider
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
                <span>SET</span>
            </AppButtonAtom>
            <AppButtonAtom
                onClick={handleRefreshUndefinedGlobalComplexityState}
                disabled={isAnyWorkerWorking || isNoWorkerActive}>
                <span>SET INITIAL</span>
            </AppButtonAtom>


        </section>


        <section className={scss.workersContainer}>

            {workersAmountArray.map((_, index) =>

                <WorkersWorkSwitchMolecule
                    globalComplexityValue={globalComplexityValue}
                    workerKey={{
                        workerName: constructWorkerNameByOrderIndex(index + 1),
                        fileName: 'calculation-worker.js'
                    }}
                    key={index}
                />)}

        </section>
    </main>)
}

export default WorkersSwitchViewContainerMolecule
