import {useEffect, useMemo} from 'react'
import {useAppSelector} from '@/application/store/store'
import {selectActuallyWorkingWorkersAmount} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {fireClientSide} from '@/utils/environmentOperations.api'
import {WorkersAmount} from '@/application/workers/workers.types'



const APP_BORDER_ENABLED_CLASS_NAME = 'enabled-state'

const useBorderColorChangeController = (): void => {

    const allActuallyWorkWorkersAmount: WorkersAmount = useAppSelector(selectActuallyWorkingWorkersAmount)


    const bodyElement: HTMLBodyElement | undefined | null = useMemo(
        () => fireClientSide<HTMLBodyElement | null>(() => document.querySelector('body')), [])


    useEffect(() => {
        if (!bodyElement) return void undefined

        if (allActuallyWorkWorkersAmount) {
            bodyElement.classList.add(APP_BORDER_ENABLED_CLASS_NAME)
        } else {
            bodyElement.classList.remove(APP_BORDER_ENABLED_CLASS_NAME)
        }
    }, [allActuallyWorkWorkersAmount, bodyElement])
}

export default useBorderColorChangeController
