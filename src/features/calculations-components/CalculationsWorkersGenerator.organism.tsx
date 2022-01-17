import React, { useMemo, useState } from 'react'
import { handleWorkerAmountChange, selectRequestedWorkersAmount } from '@/features/workers/workersSlice'
import { WorkerAmountChangeActionEnum } from '@/features/workers/workers.types'
import CalculationsWorkerSwitchMolecule from '@/features/calculations-components/CalculationsWorkerSwitch.molecule'
import {
    constructWorkerNameByOrderIndex,
    getValidatedAndCorrectRequestedWorkersAmount
} from '@/features/workers/workers.api'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import { MAX_WORKERS_LIMIT } from '@/constants-and-dev-utils'



const CalculationsWorkersGeneratorOrganism = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const dispatch = useAppDispatch()

    const [newWorkersAmount, setNewWorkersAmount] = useState(1)

    const workersAmountArray = useMemo(() => Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])


    return (<>
        <button
            disabled={workerRequestedAmount.amount === MAX_WORKERS_LIMIT}
            onClick={() => dispatch(handleWorkerAmountChange({amountChangeAction: WorkerAmountChangeActionEnum.addOne}))}>
            Add new Worker +
        </button>
        <button
            disabled={workerRequestedAmount.amount === 0}
            onClick={() => dispatch(handleWorkerAmountChange({amountChangeAction: WorkerAmountChangeActionEnum.removeLast}))}>
            Remove last Worker -
        </button>

        <br/>
        <input
            type={'number'}
            value={newWorkersAmount}
            onInput={(e) => setNewWorkersAmount(getValidatedAndCorrectRequestedWorkersAmount(e.currentTarget.value))}
        />
        <button onClick={() => dispatch(handleWorkerAmountChange({
            amountChangeAction: WorkerAmountChangeActionEnum.setAmount,
            amount: newWorkersAmount
        }))}>
            Set specific Workers amount
        </button>
        <br/>
        <button onClick={() => dispatch(handleWorkerAmountChange({
            amountChangeAction: WorkerAmountChangeActionEnum.setAmount,
            amount: MAX_WORKERS_LIMIT
        }))}>
            Set Workers amount equals to yours CPU cores amount
        </button>
        <br/><br/>

        {workersAmountArray.map((_, index) =>
            <CalculationsWorkerSwitchMolecule
                workerKey={{
                    workerName: constructWorkerNameByOrderIndex(index + 1),
                    fileName: 'calculations-worker.js'
                }}
                key={index}
            />)}
    </>)
}

export default CalculationsWorkersGeneratorOrganism
