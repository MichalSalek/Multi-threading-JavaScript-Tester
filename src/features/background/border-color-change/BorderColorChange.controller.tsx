import React, { useEffect, useMemo } from 'react'
import { WorkersAmountStateType } from '@/features/background/web-workers-configuration/webWorkers.types'
import { useAppSelector } from '@/core/store.core'
import { selectActuallyWorkingWorkersAmount } from '@/features/background/web-workers-configuration/webWorkersSlice'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



const APP_BORDER_ENABLED_CLASS_NAME = 'enabled-state'

const BorderColorChangeController = (): JSX.Element => {

    const allActuallyWorkWorkersAmount: WorkersAmountStateType = useAppSelector(selectActuallyWorkingWorkersAmount)

    const bodyElement: HTMLBodyElement | undefined | null = useMemo(
        () => fireJustClientSide<HTMLBodyElement | null>(() => document.querySelector('body')), [])


    useEffect(() => {
        if (!bodyElement) return void undefined

        if (allActuallyWorkWorkersAmount.amount) {
            bodyElement.classList.add(APP_BORDER_ENABLED_CLASS_NAME)
        } else {
            bodyElement.classList.remove(APP_BORDER_ENABLED_CLASS_NAME)
        }

        return () => undefined
    }, [allActuallyWorkWorkersAmount.amount, bodyElement])


    return <></>
}

export default BorderColorChangeController
