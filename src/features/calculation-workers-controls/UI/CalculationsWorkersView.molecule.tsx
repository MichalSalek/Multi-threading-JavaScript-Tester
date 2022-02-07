import React, { useMemo, useRef, useState } from 'react'
import {
    selectActuallyWorkingWorkersAmount,
    selectRequestedWorkersAmount
} from '@/features/web-workers-configuration/webWorkersSlice'
import CalculationWorkersWorkSwitchMolecule
    from '@/features/calculation-workers-controls/UI/CalculationWorkersWorkSwitch.molecule'
import {
    constructWorkerNameByOrderIndex,
    queueAllWorkersTask
} from '@/features/web-workers-configuration/webWorkers.api'
import { useAppSelector } from '@/core/store.core'
import scss from './CalculationsWorkersView.module.scss'
import { MAX_WORKER_COMPLEXITY_POSSIBILITY, MIN_WORKER_COMPLEXITY_POSSIBILITY } from '@/app-config-and-utils'
import { Slider } from '@mui/material'
import AppButtonAtom from '@/app-components/AppButton.atom'



const CalculationsWorkersViewMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const workersAmountArray = useMemo(() => Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])


    const actuallyWorkingWorkers = useAppSelector(selectActuallyWorkingWorkersAmount)


    const [sliderRAWValue, setSliderRAWValue] = useState<number | undefined>(undefined)

    const [globalComplexityValue, setGlobalComplexityValue] = useState<number | undefined>(undefined)

    const debounceTimeoutID = useRef(0)
    const handleNewSliderRAWValue = (newValue: number): void => {
        if (debounceTimeoutID.current !== 0) return void undefined

        window.clearTimeout(debounceTimeoutID.current)

        debounceTimeoutID.current = window.setTimeout(() => {

            setSliderRAWValue(newValue)
            debounceTimeoutID.current = 0
        }, 50)

    }


    const isSliderHasAnInitialStateYet = useMemo<boolean>(() =>
        typeof sliderRAWValue === 'undefined', [sliderRAWValue])


    const isAnyWorkerWorking = useMemo<boolean>(() =>
        actuallyWorkingWorkers.amount > 0, [actuallyWorkingWorkers.amount])


    const isAllOfWorkersWorking = useMemo<boolean>(() =>
        actuallyWorkingWorkers.amount === workerRequestedAmount.amount, [actuallyWorkingWorkers.amount, workerRequestedAmount.amount])


    const handleNewGlobalComplexitySet = (): void => {
        setGlobalComplexityValue(Array.isArray(sliderRAWValue) ? sliderRAWValue[0] : sliderRAWValue)
    }

    return (<main className={scss.host}>

        <Slider
            valueLabelDisplay="auto"
            disabled={isAnyWorkerWorking}
            aria-labelledby="input-slider"
            min={MIN_WORKER_COMPLEXITY_POSSIBILITY}
            max={MAX_WORKER_COMPLEXITY_POSSIBILITY}
            onChange={((_, newValue: number | number[]) => {
                handleNewSliderRAWValue(Array.isArray(newValue) ? newValue[0] : newValue)
            })}
        />

        <AppButtonAtom
            disabled={isSliderHasAnInitialStateYet || isAnyWorkerWorking}
            onClick={handleNewGlobalComplexitySet}>
            <span>SET</span>
        </AppButtonAtom>
        <AppButtonAtom
            onClick={() => setGlobalComplexityValue(undefined)}
            disabled={isAnyWorkerWorking}>
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


        <section className={scss.workersContainer}>
            {workersAmountArray.map((_, index) =>

                <CalculationWorkersWorkSwitchMolecule
                    globalComplexityValue={globalComplexityValue}
                    workerKey={{
                        workerName: constructWorkerNameByOrderIndex(index + 1),
                        fileName: 'calculations-worker.js'
                    }}
                    key={index}
                />)}

        </section>
    </main>)
}

export default CalculationsWorkersViewMolecule
