import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import { handleWorkerAmountChange, selectRequestedWorkersAmount } from '@/features/workers/workersSlice'
import { getStorageItem, setStorageItem } from '@/features/browser-storage/browserStorage.api'
import { STORAGE_WORKERS_AMOUNT_KEY } from '@/constants-and-dev-utils'
import { WorkerAmountChangeActionEnum } from '@/features/workers/workers.types'



const WorkersRequestedAmountStoragePersist = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

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
        setStorageItem(STORAGE_WORKERS_AMOUNT_KEY, String(workerRequestedAmount.amount))
        return () => undefined
    }, [workerRequestedAmount.amount])

    return <></>
}

export default WorkersRequestedAmountStoragePersist
