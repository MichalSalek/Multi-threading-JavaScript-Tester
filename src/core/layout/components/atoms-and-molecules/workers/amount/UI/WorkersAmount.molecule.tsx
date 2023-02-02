import React, {useMemo, useState} from 'react'
import {Badge, BadgeProps, ButtonGroup, styled, Tooltip, Typography} from '@mui/material'
import scss from './workersAmount.module.scss'
import {useAppDispatch, useAppSelector} from '@/application/store/store'
import AppButtonAtom from '@/core/layout/components/common/AppButton.atom'
import {PopoverTitleMolecule} from '@/core/layout/components/atoms-and-molecules/popover-title/UI/PopoverTitle.molecule'
import Zoom from '@mui/material/Zoom'
import {WorkersPolicy} from '../../../../../../../../shared-policies/workers.policy'
import {handleWorkerAmountChange, selectRequestedWorkersAmount} from '@/application/workers/workers.slice'
import {WorkerAmountChangeActionEnum} from '@/application/workers/workers.types'
import {getValidatedPassedAmount} from '@/application/workers/workers.api'



const WorkersAmountMolecule = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    const dispatch = useAppDispatch()

    const [newWorkersAmount, setNewWorkersAmount] = useState<number>(workerRequestedAmount)


    const StyledBadge = useMemo(() => styled(Badge)<BadgeProps>(() => ({
        '& .MuiBadge-badge': {
            right: -22
        }
    })), [])


    const changeAmountPerOneHandler = (action: 'increment' | 'decrement') => {
        const getNumber = (numb: number) =>
            action === 'increment' ? numb + 1 : numb - 1
        setNewWorkersAmount((prevState) => getValidatedPassedAmount(getNumber(prevState), 0, WorkersPolicy.MAX_WORKERS_LIMIT))
    }


    return (
        <section className={scss.host}>

            <PopoverTitleMolecule
                popoverTextContent={'Add some new Workers to increase multithreading effect. Distribute the load evenly. Max number depends on your CPU cores amount.'}
                titleTextContent={'Workers amount control:'}
            />


            <main className={scss.amountControlsMainContainer}>


                <section className={scss.amountSetGroup}>

                    <StyledBadge
                        color={'secondary'}
                        badgeContent={
                            <Tooltip
                                placement={'top-start'}
                                title="MAX number - depends of your CPU cores amount"
                                TransitionComponent={Zoom}
                                arrow
                            >
                                <strong>{WorkersPolicy.MAX_WORKERS_LIMIT}</strong>
                            </Tooltip>}>

                        <Typography variant={'h6'}>{newWorkersAmount}</Typography>

                    </StyledBadge>

                    <ButtonGroup size={'large'} sx={{borderWidth: 0}} fullWidth={true}>
                        <AppButtonAtom
                            color={'success'}
                            disabled={newWorkersAmount === WorkersPolicy.MAX_WORKERS_LIMIT}
                            onClick={() => changeAmountPerOneHandler('increment')}>
              +
                        </AppButtonAtom>
                        <AppButtonAtom
                            color={'warning'}
                            disabled={newWorkersAmount === 0}
                            onClick={() => changeAmountPerOneHandler('decrement')}>
              -
                        </AppButtonAtom>
                    </ButtonGroup>

                    <AppButtonAtom
                        fullWidth={true}
                        freezeAfterClick={true}
                        disabled={workerRequestedAmount === newWorkersAmount}
                        onClick={() => dispatch(handleWorkerAmountChange({
                            amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                            amount: getValidatedPassedAmount(newWorkersAmount, 0, WorkersPolicy.MAX_WORKERS_LIMIT)
                        }))}>
            Set specific Workers amount
                    </AppButtonAtom>
                </section>


                <section className={scss.controlButtonGroup}>

                    <ButtonGroup size={'large'} sx={{borderWidth: 0}}>
                        <AppButtonAtom
                            color={'success'}
                            disabled={workerRequestedAmount === WorkersPolicy.MAX_WORKERS_LIMIT}
                            onClick={() => dispatch(handleWorkerAmountChange({
                                amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
                                amount: WorkersPolicy.MAX_WORKERS_LIMIT
                            }))}>
                            <StyledBadge color={'secondary'} badgeContent={
                                <strong>{WorkersPolicy.MAX_WORKERS_LIMIT}</strong>
                            }>
                                <span className={scss.weakWeight}>Add</span> <strong className={scss.amountSuffix}> all </strong>
                            </StyledBadge>
                        </AppButtonAtom>
                        <AppButtonAtom
                            color={'warning'}
                            disabled={workerRequestedAmount === 0}
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
                            disabled={workerRequestedAmount === WorkersPolicy.MAX_WORKERS_LIMIT}
                            onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.addOne}))}>
                            <StyledBadge color={'secondary'} badgeContent={
                                <strong>{1}</strong>
                            }>
                                <span className={scss.weakWeight}>Add</span> <strong className={scss.amountSuffix}> one </strong>
                            </StyledBadge>
                        </AppButtonAtom>
                        <AppButtonAtom
                            color={'warning'}
                            disabled={workerRequestedAmount === 0}
                            onClick={() => dispatch(handleWorkerAmountChange({amountChangeCommand: WorkerAmountChangeActionEnum.removeLast}))}>
                            <span className={scss.weakWeight}>Remove</span> <strong className={scss.amountSuffix}> one </strong>
                        </AppButtonAtom>
                    </ButtonGroup>
                </section>


                <Typography marginTop={2} variant={'body2'}>Current amount:</Typography>

                <Typography marginTop={2} variant={'h4'}>
                    <strong>{workerRequestedAmount}</strong>
                </Typography>


            </main>

        </section>
    )
}

export default WorkersAmountMolecule
