import React, {FormEvent, useMemo, useState} from 'react'
import {Badge, BadgeProps, ButtonGroup, styled, Tooltip, Typography} from '@mui/material'
import scss from './workersAmount.module.scss'

import {handleWorkerAmountChange, selectRequestedWorkersAmount} from '@/features/background/web-workers/webWorkersSlice'
import {WorkerAmountChangeActionEnum} from '@/features/background/web-workers/webWorkers.types'
import {getValidatedPassedAmount} from '@/features/background/web-workers/webWorkers.api'
import {useAppDispatch, useAppSelector} from '@/core/store.core'
import {MAX_WORKERS_LIMIT} from '@/core/constants.core'

import AppButtonAtom from '@/app-components/AppButton.atom'
import AppInputAtom from '@/app-components/AppInput.atom'
import {PopoverTitleMolecule} from '@/features/building/popover-title/UI/PopoverTitle.molecule'
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
                titleTextContent={'Workers amount control:'}
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

                    <AppButtonAtom
                        fullWidth={true}
                        onClick={() => dispatch(handleWorkerAmountChange({
                            amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                            amount: getValidatedPassedAmount(newWorkersAmount, 0, MAX_WORKERS_LIMIT)
                        }))}>
            Set specific Workers amount
                    </AppButtonAtom>
                </section>


                <section className={scss.controlButtonGroup}>

                    <ButtonGroup size={'large'} sx={{borderWidth: 0}}>
                        <AppButtonAtom
                            color={'success'}
                            disabled={workerRequestedAmount.amount === MAX_WORKERS_LIMIT}
                            onClick={() => dispatch(handleWorkerAmountChange({
                                amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                                amount: MAX_WORKERS_LIMIT
                            }))}>
                            <StyledBadge color={'secondary'} badgeContent={
                                <strong>{MAX_WORKERS_LIMIT}</strong>
                            }>
                                <span className={scss.weakWeight}>Add</span> <strong className={scss.amountSuffix}> all </strong>
                            </StyledBadge>
                        </AppButtonAtom>
                        <AppButtonAtom
                            color={'warning'}
                            disabled={workerRequestedAmount.amount === 0}
                            onClick={() => dispatch(handleWorkerAmountChange({
                                amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                                amount: 0
                            }))}>
                            <span className={scss.weakWeight}>Remove</span> <strong className={scss.amountSuffix}> all </strong>
                        </AppButtonAtom>
                    </ButtonGroup>


                    <ButtonGroup size={'large'} sx={{borderWidth: 0}}>
                        <AppButtonAtom
                            color={'success'}
                            disabled={workerRequestedAmount.amount === MAX_WORKERS_LIMIT}
                            onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.addOne}))}>
                            <StyledBadge color={'secondary'} badgeContent={
                                <strong>{1}</strong>
                            }>
                                <span className={scss.weakWeight}>Add</span> <strong className={scss.amountSuffix}> one </strong>
                            </StyledBadge>
                        </AppButtonAtom>
                        <AppButtonAtom
                            color={'warning'}
                            disabled={workerRequestedAmount.amount === 0}
                            onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.removeLast}))}>
                            <span className={scss.weakWeight}>Remove</span> <strong className={scss.amountSuffix}> one </strong>
                        </AppButtonAtom>
                    </ButtonGroup>
                </section>


                <Typography marginTop={2} variant={'h6'}> Currently state is:</Typography>

                <Typography marginTop={2} textAlign={'center'}
                    variant={'h4'}><strong>{workerRequestedAmount.amount}</strong></Typography>


            </main>

        </section>
    )
}

export default WorkersAmountMolecule
