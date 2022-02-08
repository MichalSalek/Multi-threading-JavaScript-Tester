// Hook for handling a main thread fake background calculations.
//
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import {
    handleWorkerAmountChange,
    selectRequestedWorkersAmount
} from '@/features/technical/web-workers-configuration/webWorkersSlice'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { getStorageItem, setStorageItem } from '@/features/technical/browser-storage/browserStorage.api'
import {
    STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE,
    STORAGE_KEY_CONTROL_PANEL_SWITCHES,
    STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION,
    STORAGE_KEY_WORKERS_AMOUNT
} from '@/app-config-constants'
import { WorkerAmountChangeActionEnum } from '@/features/technical/web-workers-configuration/webWorkers.types'
import {
    handleControlPanelSwitchVisibility,
    ISystemComponentsVisibilities,
    possibleControlPanelSwitchesNames,
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/features/business/control-panel/controlPanelSlice'
import { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
import { isUndefinedType } from '@/coding-utils/typeOperations.api'



// WORKERS AMOUNT STORAGE PERSIST
//
export const useWorkersAmountStoragePersist = (): void => {

    const dispatch = useAppDispatch()

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    useEffect(() => {
        const memorizedStorageWorkersAmountValue = getStorageItem(STORAGE_KEY_WORKERS_AMOUNT)
        const memorizedAmountOfWorkers = memorizedStorageWorkersAmountValue ? Number(memorizedStorageWorkersAmountValue) : 0
        memorizedAmountOfWorkers > 0 && dispatch(handleWorkerAmountChange({
            amountChangeCommand: WorkerAmountChangeActionEnum.setAmount,
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

        if (typeof memorizedStorageControlPanelSwitchesValue === 'string') {

            const memorizedStorageControlPanelSwitches: ISystemComponentsVisibilities = JSON.parse(memorizedStorageControlPanelSwitchesValue)

            Object.keys(memorizedStorageControlPanelSwitches).forEach((memorizedName: string) => {
                possibleControlPanelSwitchesNames.forEach((actualComponentName: SystemComponentNameType) => {
                    if (memorizedName === actualComponentName) {

                        dispatch(handleControlPanelSwitchVisibility({
                            name: actualComponentName,
                            visibilitySwitchState: memorizedStorageControlPanelSwitches[actualComponentName]
                        }))
                    }
                })
            })
        }

        return () => undefined
    }, [dispatch])


    useEffect(() => {
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


// CONTROL PANEL COLLAPSE STATE STORAGE PERSIST
//
type ControlPositionType = ControlPosition
type SetControlPositionType = (event: DraggableEvent, data: DraggableData) => void
export type UsePersistedPositionByBrowserStorageType = [ControlPositionType, SetControlPositionType]

export const usePersistedPositionByBrowserStorage = (
    storageSwitchName: SystemComponentNameType | string,
    initialBehavior: ControlPositionType
): UsePersistedPositionByBrowserStorageType => {

    const [memoizedPosition, setMemoizedPosition] = useState<ControlPositionType>(initialBehavior)

    const browserStorageKey = useMemo(() => `${STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION}_${storageSwitchName}`, [storageSwitchName])

    useEffect(() => {
        const memoizedOnTheScreenPositionValue = getStorageItem(browserStorageKey)

        if (typeof memoizedOnTheScreenPositionValue === 'string') {
            // Value is available
            //
            setMemoizedPosition(JSON.parse(memoizedOnTheScreenPositionValue))

        } else {

            // Default behavior
            //
            setMemoizedPosition(initialBehavior)
        }


        return () => undefined
    }, [initialBehavior, browserStorageKey])



    const validateControlPosition = (position: ControlPositionType): ControlPositionType => (
        {
            x: (() => position.x < 0 ? 0 : position.x)(),
            y: (() => position.y < 0 ? 50 : position.y)()
        })


    useEffect(() => {
        if (!isUndefinedType(memoizedPosition)) {
            const validatedPosition = validateControlPosition(memoizedPosition)

            setStorageItem(browserStorageKey, JSON.stringify(validatedPosition))
        }
        return () => undefined
    }, [memoizedPosition, browserStorageKey])


    const onDragStopHandler = (event: DraggableEvent, data: DraggableData): void => {
        setMemoizedPosition({
            x: data.x,
            y: data.y
        })
    }


    return [memoizedPosition, onDragStopHandler]
}

