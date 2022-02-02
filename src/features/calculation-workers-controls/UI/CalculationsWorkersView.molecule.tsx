import React, { useMemo } from 'react'
import { selectRequestedWorkersAmount } from '@/features/web-workers-configuration/webWorkersSlice'
import CalculationWorkersWorkSwitchMolecule
    from '@/features/calculation-workers-controls/UI/CalculationWorkersWorkSwitch.molecule'
import { constructWorkerNameByOrderIndex } from '@/features/web-workers-configuration/webWorkers.api'
import { useAppSelector } from '@/core/store.core'
import scss from './CalculationsWorkersView.module.scss'



const CalculationsWorkersViewMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const workersAmountArray = useMemo(() => Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])


    return (<main className={scss.host}>
        {workersAmountArray.map((_, index) =>
            <CalculationWorkersWorkSwitchMolecule
                workerKey={{
                    workerName: constructWorkerNameByOrderIndex(index + 1),
                    fileName: 'calculations-worker.js'
                }}
                key={index}
            />)}
    </main>)
}

export default CalculationsWorkersViewMolecule
