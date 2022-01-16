import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@/core/store.core'
import {handleWorkerAmountChange, selectExpectedWorkersAmount} from '@/features/workers/workersSlice'
import {getStorageItem, setStorageItem} from '@/features/browser-storage/browserStorage.api'
import {STORAGE_WORKERS_AMOUNT_KEY} from '@/utils-and-constants.core'
import {WorkerAmountChangeActionEnum} from '@/features/workers/workers.types'



const WorkersRequestedAmountStoragePersist = (): JSX.Element => {

    const workerExpectedAmount = useAppSelector(selectExpectedWorkersAmount)

    const dispatch = useAppDispatch()


    useEffect(() => {
        const memorizedStorageWorkersAmountValue = getStorageItem(STORAGE_WORKERS_AMOUNT_KEY)
        const memorizedAmountOfWorkers = memorizedStorageWorkersAmountValue ? Number(memorizedStorageWorkersAmountValue) : 0
        memorizedAmountOfWorkers > 0 && dispatch(handleWorkerAmountChange({
            amountChangeAction: WorkerAmountChangeActionEnum.setAmount,
            amount: memorizedAmountOfWorkers
        }))
        return () => undefined
    }, [dispatch])

    useEffect(() => {
        setStorageItem(STORAGE_WORKERS_AMOUNT_KEY, String(workerExpectedAmount.amount))
        return () => undefined
    }, [workerExpectedAmount.amount])

    return <></>
}

export default WorkersRequestedAmountStoragePersist
