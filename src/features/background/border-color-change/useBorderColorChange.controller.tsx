import React, {useEffect, useMemo} from 'react'
import {WorkersAmountStateType} from '@/features/background/web-workers/webWorkers.types'
import {useAppSelector} from '@/core/store.core'
import {selectActuallyWorkingWorkersAmount} from '@/features/background/web-workers/webWorkersSlice'
import {fireClientSide} from '@/core/low-level-utils/environmentOperations.api'



const APP_BORDER_ENABLED_CLASS_NAME = 'enabled-state'

const useBorderColorChangeController = (): void => {

    const allActuallyWorkWorkersAmount: WorkersAmountStateType = useAppSelector(selectActuallyWorkingWorkersAmount)


    const bodyElement: HTMLBodyElement | undefined | null = useMemo(
        () => fireClientSide<HTMLBodyElement | null>(() => document.querySelector('body')), [])


    useEffect(() => {
        if (!bodyElement) return void undefined

        if (allActuallyWorkWorkersAmount.amount) {
            bodyElement.classList.add(APP_BORDER_ENABLED_CLASS_NAME)
        } else {
            bodyElement.classList.remove(APP_BORDER_ENABLED_CLASS_NAME)
        }
    }, [allActuallyWorkWorkersAmount.amount, bodyElement])
}

export default useBorderColorChangeController
