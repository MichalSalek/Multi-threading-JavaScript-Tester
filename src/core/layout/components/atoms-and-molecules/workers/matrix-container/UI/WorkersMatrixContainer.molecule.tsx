import React, { useMemo } from 'react'
import {
    selectGlobalComplexityAmount
} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import WorkersWorkSwitchMolecule from '@/core/layout/components/atoms-and-molecules/workers/work-switch/UI/WorkersWorkSwitch.molecule'
import { getCalculationWorkerNameByOrderIndex } from '@/core/features/calculations-workers/calculationsWorkers.api'
import { useAppSelector } from '@/application/store/store'
import scss from './workersMatrixContainer.module.scss'
import { PopoverTitleMolecule } from '@/core/layout/components/atoms-and-molecules/popover-title/UI/PopoverTitle.molecule'
import {selectRequestedWorkersAmount} from '@/application/workers/workers.slice'



const WorkersMatrixContainerMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const globalComplexityValue = useAppSelector(selectGlobalComplexityAmount)

    const workersAmountArray = useMemo(() =>
        Array(workerRequestedAmount).fill(undefined), [workerRequestedAmount])



    return (<main className={scss.host}>

        <PopoverTitleMolecule
            popoverTextContent={'Start carefully with low values and monitor the CPU load on your own - it depends on\n' +
            '            yours device.'}
            titleTextContent={'Workers complexity matrix:'}
        />

        <section className={scss.workersContainer}>
            {workersAmountArray.map((_, index) =>

                <WorkersWorkSwitchMolecule
                    globalComplexityValue={globalComplexityValue}
                    workerKey={{
                        workerName: getCalculationWorkerNameByOrderIndex(index + 1),
                        fileName: 'calculation-worker.js'
                    }}
                    key={index}
                />)}
        </section>

        {workerRequestedAmount === 0 ?
            <strong className={'lower-opacity'}>No Workers added yet.</strong>
            : null}
    </main>)
}

export default WorkersMatrixContainerMolecule
