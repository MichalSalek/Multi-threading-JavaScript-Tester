import React, { useEffect, useMemo } from 'react'
import { WorkersAmountStateType } from '@/features/web-workers-configuration/webWorkers.types'
import { useAppSelector } from '@/core/store.core'
import { selectActuallyWorkingWorkersAmount } from '@/features/web-workers-configuration/webWorkersSlice'
import { fireJustClientSide } from '@/app-config-and-utils'



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



// OGARNĄC CONTROL PANEL - state domyslnie ma byc zwiniete i sie rozwijac - nie bedzie buga z fantomowym divem