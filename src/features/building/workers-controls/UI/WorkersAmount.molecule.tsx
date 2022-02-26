import React, { FormEvent, useState } from 'react'
import { ButtonGroup, Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import scss from './WorkersAmount.module.scss'

import {
    handleWorkerAmountChange,
    selectRequestedWorkersAmount
} from '@/features/background/web-workers/webWorkersSlice'
import { WorkerAmountChangeActionEnum } from '@/features/background/web-workers/webWorkers.types'
import { getValidatedPassedAmount } from '@/features/background/web-workers/webWorkers.api'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import { MAX_WORKERS_LIMIT } from '@/app-config-constants'

import AppButtonAtom from '@/app-components/AppButton.atom'
import AppInputAtom from '@/app-components/AppInput.atom'



const WorkersAmountMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const dispatch = useAppDispatch()

    const [newWorkersAmount, setNewWorkersAmount] = useState<number | string>(1)


    return (
        <section className={scss.host}>
            <span>0 - <Tooltip
                placement={'top-start'}
                title="Number depends of your CPU cores amount"
                TransitionComponent={Zoom}
                arrow
            ><strong>{MAX_WORKERS_LIMIT}</strong></Tooltip> </span>
            <AppInputAtom
                type={'number'}
                value={newWorkersAmount}
                aria-label={'Expected Workers amount'}
                placeholder={`0 - ${MAX_WORKERS_LIMIT}`}
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
            <br/>

            <ButtonGroup className={scss.controlButtonGroup}>
                <AppButtonAtom onClick={() => dispatch(handleWorkerAmountChange({
                    amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                    amount: MAX_WORKERS_LIMIT
                }))}>
                    Set Workers amount equals to yours CPU cores amount
                </AppButtonAtom>
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
                <AppButtonAtom
                    disabled={workerRequestedAmount.amount === 0}
                    onClick={() => dispatch(handleWorkerAmountChange({
                        amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                        amount: 0
                    }))}>
                    Remove all Workers --
                </AppButtonAtom>
            </ButtonGroup>

            <br/><br/>
        </section>
    )
}

export default WorkersAmountMolecule
