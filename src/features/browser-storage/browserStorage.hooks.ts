// Hook for handling a main thread fake background calculations.
//
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import { handleWorkerAmountChange, selectRequestedWorkersAmount } from '@/features/workers/workersSlice'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getStorageItem, setStorageItem } from '@/features/browser-storage/browserStorage.api'
import {
    isUndefinedType,
    STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE,
    STORAGE_KEY_CONTROL_PANEL_SWITCHES,
    STORAGE_KEY_WORKERS_AMOUNT
} from '@/constants-and-dev-utils'
import { WorkerAmountChangeActionEnum } from '@/features/workers/workers.types'
import {
    handleControlPanelSwitchVisibility,
    ISystemComponentsVisibilities,
    possibleControlPanelSwitchesNames,
    selectSystemComponentsVisibilities,
    VisibilityOfSystemComponentNameType
} from '@/features/control-panel/controlPanelSlice'



// WORKERS AMOUNT STORAGE PERSIST
//
export const useWorkersAmountStoragePersist = (): void => {

    const dispatch = useAppDispatch()

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    useEffect(() => {
        const memorizedStorageWorkersAmountValue = getStorageItem(STORAGE_KEY_WORKERS_AMOUNT)
        const memorizedAmountOfWorkers = memorizedStorageWorkersAmountValue ? Number(memorizedStorageWorkersAmountValue) : 0
        memorizedAmountOfWorkers > 0 && dispatch(handleWorkerAmountChange({
            amountChangeAction: WorkerAmountChangeActionEnum.setAmount,
            amount: memorizedAmountOfWorkers
        }))
        return () => undefined
    }, [dispatch])


    useEffect(() => {
        setStorageItem(STORAGE_KEY_WORKERS_AMOUNT, String(workerRequestedAmount.amount))
        return () => undefined
    }, [workerRequestedAmount.amount])


    return void undefined
}



// CONTROL PANEL SWITCHES STORAGE PERSIST
//
export const useControlPanelSwitchesStoragePersist = (): void => {

    const dispatch = useAppDispatch()

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    useEffect(() => {
        const memorizedStorageControlPanelSwitchesValue = getStorageItem(STORAGE_KEY_CONTROL_PANEL_SWITCHES)

        console.log('memorizedStorageControlPanelSwitchesValue, localstorage getter Effect')
        console.log(memorizedStorageControlPanelSwitchesValue)

        if (typeof memorizedStorageControlPanelSwitchesValue === 'string') {

            console.log('memorizedStorageControlPanelSwitchesValue here is a string.')

            const memorizedStorageControlPanelSwitches: ISystemComponentsVisibilities = JSON.parse(memorizedStorageControlPanelSwitchesValue)

            Object.keys(memorizedStorageControlPanelSwitches).forEach((memorizedName: string) => {
                possibleControlPanelSwitchesNames.forEach((actualComponentName: VisibilityOfSystemComponentNameType) => {
                    if (memorizedName === actualComponentName) {

                        dispatch(handleControlPanelSwitchVisibility({
                            name: actualComponentName,
                            switchState: memorizedStorageControlPanelSwitches[actualComponentName]
                        }))
                    }
                })
            })
        }

        return () => undefined
    }, [dispatch])


    useEffect(() => {
        console.log('systemComponentsVisibilities, localstorage setter Effect')
        console.log(systemComponentsVisibilities)
        setStorageItem(STORAGE_KEY_CONTROL_PANEL_SWITCHES, JSON.stringify(systemComponentsVisibilities))
        return () => undefined
    }, [systemComponentsVisibilities])


    return void undefined
}



// CONTROL PANEL COLLAPSE STATE STORAGE PERSIST
//
type IsListCollapsedType = boolean
type SetIsListCollapsedType = Dispatch<SetStateAction<boolean>>
export type UseControlPanelCollapseStateStoragePersistType = [IsListCollapsedType, SetIsListCollapsedType]


export enum UseControlPanelCollapseStateStoragePersistEnum {
    'true' = 'true',
    'false' = 'false'
}


export const useControlPanelCollapseStateStoragePersist = (initialBehavior: boolean): UseControlPanelCollapseStateStoragePersistType => {

    const [isListCollapsed, setIsListCollapsed] = useState<boolean>(initialBehavior)

    useEffect(() => {
        const memorizedStorageCollapseStateValue = getStorageItem(STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE)

        if (typeof memorizedStorageCollapseStateValue === 'string') {

            switch (memorizedStorageCollapseStateValue) {
            case UseControlPanelCollapseStateStoragePersistEnum.false:
                setIsListCollapsed(false)
                break
            case UseControlPanelCollapseStateStoragePersistEnum.true:
                setIsListCollapsed(true)
                break
            }

        } else {
            // Default behavior
            //
            setIsListCollapsed(initialBehavior)
        }
        return () => undefined
    }, [initialBehavior])



    useEffect(() => {
        if (!isUndefinedType(isListCollapsed)) {
            setStorageItem(STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE, String(isListCollapsed))
        }
        return () => undefined
    }, [isListCollapsed])


    return [isListCollapsed, setIsListCollapsed]
}

export default {}
