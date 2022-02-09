import React, { useMemo, useState } from 'react'
import {
    selectActuallyWorkingWorkersAmount,
    selectRequestedWorkersAmount
} from '@/features/background/web-workers-configuration/webWorkersSlice'
import WorkersWorkSwitchMolecule
    from '@/features/building/workers-controls/UI/WorkersWorkSwitch.molecule'
import {
    constructWorkerNameByOrderIndex,
    queueAllWorkersTask
} from '@/features/background/web-workers-configuration/webWorkers.api'
import { useAppSelector } from '@/core/store.core'
import scss from './WorkersView.module.scss'
import { MAX_WORKER_COMPLEXITY_POSSIBILITY, MIN_WORKER_COMPLEXITY_POSSIBILITY } from '@/app-config-constants'
import { Slider } from '@mui/material'
import AppButtonAtom from '@/app-components/AppButton.atom'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



const WorkersSwitchViewContainerMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const workersAmountArray = useMemo(() => Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])


    const actuallyWorkingWorkers = useAppSelector(selectActuallyWorkingWorkersAmount)


    const [sliderRAWValue, setSliderRAWValue] = useState<number | undefined>(undefined)

    const [globalComplexityValue, setGlobalComplexityValue] = useState<number | undefined | 'NaN'>(undefined)


    const handleNewSliderRAWValue = (newValue: number): void => {
        setSliderRAWValue(newValue)
    }


    const isSliderHasAnInitialStateYet = useMemo<boolean>(() =>
        typeof sliderRAWValue === 'undefined', [sliderRAWValue])


    const isAnyWorkerWorking = useMemo<boolean>(() =>
        actuallyWorkingWorkers.amount > 0, [actuallyWorkingWorkers.amount])


    const isAllOfWorkersWorking = useMemo<boolean>(() =>
        actuallyWorkingWorkers.amount === workerRequestedAmount.amount, [actuallyWorkingWorkers.amount, workerRequestedAmount.amount])


    const isNoWorkerActive = useMemo(() =>
        workerRequestedAmount.amount === 0, [workerRequestedAmount.amount])


    const handleNewGlobalComplexitySet = (): void => {
        setGlobalComplexityValue(Array.isArray(sliderRAWValue) ? sliderRAWValue[0] : sliderRAWValue)
    }

    const handleRefreshUndefinedGlobalComplexityState = (): void => {

        setGlobalComplexityValue(() => 'NaN')
        fireJustClientSide(() => window.setTimeout(() => setGlobalComplexityValue(undefined), 0))
    }

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


            <AppButtonAtom
                onClick={() => queueAllWorkersTask({workerTaskName: 'task__calculations_on'})}
                disabled={isAllOfWorkersWorking}>
                <span>MAKE THEM ALL WORK</span>
            </AppButtonAtom>
            <AppButtonAtom
                onClick={() => queueAllWorkersTask({workerTaskName: 'task__calculations_off'})}
                disabled={!isAnyWorkerWorking}>
                <span>STOP ALL WORKERS</span>
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
