import React, { FormEvent, useState } from 'react'
import {
    handleWorkerAmountChange,
    selectRequestedWorkersAmount
} from '@/features/web-workers-configuration/webWorkersSlice'
import { WorkerAmountChangeActionEnum } from '@/features/web-workers-configuration/webWorkers.types'
import { getValidatedPassedAmount } from '@/features/web-workers-configuration/webWorkers.api'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import { MAX_WORKERS_LIMIT } from '@/app-config-and-utils'
import { ButtonGroup } from '@mui/material'
import AppButtonAtom from '@/app-components/AppButton.atom'
import AppInputAtom from '@/app-components/AppInput.atom'



const CalculationsWorkersAmountMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const dispatch = useAppDispatch()

    const [newWorkersAmount, setNewWorkersAmount] = useState<number | string>(1)


    return (<>
        <ButtonGroup>
            <AppButtonAtom
                disabled={workerRequestedAmount.amount === MAX_WORKERS_LIMIT}
                onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.addOne}))}>
                Add new Worker +
            </AppButtonAtom>
            <AppButtonAtom
                disabled={workerRequestedAmount.amount === 0}
                onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.removeLast}))}>
                Remove last Worker -
            </AppButtonAtom>
        </ButtonGroup>


        <br/>
        <AppInputAtom
            type={'number'}
            value={newWorkersAmount}
            aria-label={'Expected Workers amount'}
            placeholder="How many workers do you want?"
            onChange={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewWorkersAmount(e.currentTarget.value)}
            onBlur={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setNewWorkersAmount(getValidatedPassedAmount(e.currentTarget.value, 0, MAX_WORKERS_LIMIT))}
        />
        <AppButtonAtom onClick={() => dispatch(handleWorkerAmountChange({
            amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
            amount: getValidatedPassedAmount(newWorkersAmount, 0, MAX_WORKERS_LIMIT)
        }))}>
            Set specific Workers amount
        </AppButtonAtom>
        <br/>
        <AppButtonAtom onClick={() => dispatch(handleWorkerAmountChange({
            amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
            amount: MAX_WORKERS_LIMIT
        }))}>
            Set Workers amount equals to yours CPU cores amount
        </AppButtonAtom>
        <br/><br/>
    </>)
}

export default CalculationsWorkersAmountMolecule
