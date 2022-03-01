import React, { FormEvent, useMemo, useState } from 'react'
import { Badge, BadgeProps, ButtonGroup, styled, Tooltip } from '@mui/material'
import scss from './workersAmount.module.scss'

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
import { PopoverTitleMolecule } from '@/features/building/popover-title/UI/PopoverTitle.molecule'
import Zoom from '@mui/material/Zoom'



const WorkersAmountMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const dispatch = useAppDispatch()

    const [newWorkersAmount, setNewWorkersAmount] = useState<number | string>(4)


    const StyledBadge = useMemo(() => styled(Badge)<BadgeProps>(() => ({
        '& .MuiBadge-badge': {
            right: -22
        }
    })), [])


    return (
        <section className={scss.host}>

            <PopoverTitleMolecule
                popoverTextContent={'Add some new Workers to increase multithreading effect. Distribute the load evenly. Max number depends on your CPU cores amount.'}
                titleTextContent={`Worker amount controls. Currently state is: ${workerRequestedAmount.amount}`}
            />


            <main className={scss.amountControlsMainContainer}>

                <section className={scss.amountSetGroup}>

                    <StyledBadge color={'secondary'} badgeContent={
                        <Tooltip
                            placement={'top-start'}
                            title="Number depends of your CPU cores amount"
                            TransitionComponent={Zoom}
                            arrow
                        >
                            <strong>0 - {MAX_WORKERS_LIMIT}</strong>
                        </Tooltip>}>

                        <AppInputAtom
                            type={'number'}
                            value={newWorkersAmount}
                            aria-label={'Expected Workers amount'}
                            placeholder={`0 - ${MAX_WORKERS_LIMIT}`}
                            className={scss.amountInput}
                            onChange={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewWorkersAmount(e.currentTarget.value)}
                            onBlur={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setNewWorkersAmount(getValidatedPassedAmount(e.currentTarget.value, 0, MAX_WORKERS_LIMIT))}
                        />
                    </StyledBadge>

                    <AppButtonAtom onClick={() => dispatch(handleWorkerAmountChange({
                        amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                        amount: getValidatedPassedAmount(newWorkersAmount, 0, MAX_WORKERS_LIMIT)
                    }))}>
                        Set specific Workers amount
                    </AppButtonAtom>
                </section>


                <section className={scss.controlButtonGroup}>
                    <ButtonGroup>
                        <AppButtonAtom
                            disabled={workerRequestedAmount.amount === MAX_WORKERS_LIMIT}
                            onClick={() => dispatch(handleWorkerAmountChange({
                                amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                                amount: MAX_WORKERS_LIMIT
                            }))}>
                            <span className={scss.weakWeight}>Add</span> <strong> all </strong>
                        </AppButtonAtom>
                        <AppButtonAtom
                            disabled={workerRequestedAmount.amount === 0}
                            onClick={() => dispatch(handleWorkerAmountChange({
                                amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                                amount: 0
                            }))}>
                            <span className={scss.weakWeight}>Remove</span> <strong> all </strong>
                        </AppButtonAtom>
                    </ButtonGroup>


                    <ButtonGroup>
                        <AppButtonAtom
                            disabled={workerRequestedAmount.amount === MAX_WORKERS_LIMIT}
                            onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.addOne}))}>
                            <span className={scss.weakWeight}>Add</span> <strong> one </strong>
                        </AppButtonAtom>
                        <AppButtonAtom
                            disabled={workerRequestedAmount.amount === 0}
                            onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.removeLast}))}>
                            <span className={scss.weakWeight}>Remove</span> <strong> one </strong>
                        </AppButtonAtom>
                    </ButtonGroup>
                </section>

            </main>

        </section>
    )
}

export default WorkersAmountMolecule
