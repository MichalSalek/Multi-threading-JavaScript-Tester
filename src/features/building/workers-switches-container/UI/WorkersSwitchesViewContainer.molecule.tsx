import React, { useMemo } from 'react'
import {
    selectGlobalComplexityAmount,
    selectRequestedWorkersAmount
} from '@/features/background/web-workers/webWorkersSlice'
import WorkersWorkSwitchMolecule from '@/features/building/workers-work-switch/UI/WorkersWorkSwitch.molecule'
import { constructWorkerNameByOrderIndex } from '@/features/background/web-workers/webWorkers.api'
import { useAppSelector } from '@/core/store.core'
import scss from './workersSwitchesViewContainer.module.scss'
import { PopoverTitleMolecule } from '@/features/building/popover-title/UI/PopoverTitle.molecule'



const WorkersSwitchesViewContainerMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const globalComplexityValue = useAppSelector(selectGlobalComplexityAmount)

    const workersAmountArray = useMemo(() =>
        Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])



    return (<main className={scss.host}>

        <PopoverTitleMolecule
            popoverTextContent={'Start carefully with low values and monitor the CPU load on your own - it depends on\n' +
            '            yours device.'}
            titleTextContent={'Worker switch and calculations complexity set'}
        />

        <section className={scss.workersContainer}>
            {workersAmountArray.map((_, index) =>

                <WorkersWorkSwitchMolecule
                    globalComplexityValue={globalComplexityValue.amount}
                    workerKey={{
                        workerName: constructWorkerNameByOrderIndex(index + 1),
                        fileName: 'calculation-worker.js'
                    }}
                    key={index}
                />)}
        </section>

        {workerRequestedAmount.amount === 0 ?
            <strong className={'lower-opacity'}>No Workers added yet.</strong>
            : null}
    </main>)
}

export default WorkersSwitchesViewContainerMolecule
