import { useAppDispatch, useAppSelector } from '@/core/store.core'
import {
    handleWorkerAmountChange,
    selectRequestedWorkersAmount
} from '@/features/background/web-workers-configuration/webWorkersSlice'
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getStorageItem, setStorageItem } from '@/features/background/browser-storage/browserStorage.api'
import {
    STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE,
    STORAGE_KEY_CONTROL_PANEL_SWITCHES,
    STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION,
    STORAGE_KEY_WORKERS_AMOUNT
} from '@/app-config-constants'
import { WorkerAmountChangeActionEnum } from '@/features/background/web-workers-configuration/webWorkers.types'
import {
    handleControlPanelSwitchVisibility,
    ISystemComponentsVisibilities,
    possibleControlPanelSwitchesNames,
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/features/building/control-panel/controlPanelSlice'
import { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
import { isUndefinedType } from '@/coding-utils/typeOperations.api'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



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
    initialPosition: ControlPositionType
): UsePersistedPositionByBrowserStorageType => {

    const [consumerPosition, setConsumerPosition] = useState<ControlPositionType>(initialPosition)

    const browserStorageKey = useMemo(() => `${STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION}_${storageSwitchName}`, [storageSwitchName])

    // Pass value from storage to consumer on mount.
    //
    useEffect(() => {
        const memoizedOnTheScreenPositionValue = getStorageItem(browserStorageKey)

        if (typeof memoizedOnTheScreenPositionValue === 'string') {
            // Value from storage is available.
            //
            setConsumerPosition(JSON.parse(memoizedOnTheScreenPositionValue))
        } else {
            // Default behavior.
            //
            setConsumerPosition(initialPosition)
        }
        return () => undefined
    }, [initialPosition, browserStorageKey])



    // Set value to storage on new consumer position.
    //
    useEffect(() => {
        if (!isUndefinedType(consumerPosition)) {
            setStorageItem(browserStorageKey, JSON.stringify(consumerPosition))
        }
        return () => undefined
    }, [consumerPosition, browserStorageKey])



    const ifSingleAxisRequiresValidation = useCallback(
        (axisPosition: number, XorY: 'X' | 'Y') => fireJustClientSide<boolean>(() => {
            switch (XorY) {
            case 'X':
                return axisPosition < 0 || axisPosition > window.innerWidth
            case 'Y':
                return axisPosition < 0 || axisPosition > window.innerHeight
            }
        }) as boolean,
        [])

    const checkIfTheOffScreenPositionRequireValidation = useCallback((position: ControlPositionType): boolean =>
        ifSingleAxisRequiresValidation(position.x, 'X')
            || ifSingleAxisRequiresValidation(position.y, 'Y')
    , [ifSingleAxisRequiresValidation])

    const validateConsumerPosition = useCallback((position: ControlPositionType): ControlPositionType => ({
        x: ifSingleAxisRequiresValidation(position.x, 'X') ? 0 : position.x,
        y: ifSingleAxisRequiresValidation(position.y, 'Y') ? 0 : position.y
    }), [ifSingleAxisRequiresValidation])

    const checkIfTheOffScreenPositionRequireValidationThenValidate = useCallback((): void => {
        if (checkIfTheOffScreenPositionRequireValidation(consumerPosition)) {
            setConsumerPosition(validateConsumerPosition(consumerPosition))
        }
    }, [consumerPosition, checkIfTheOffScreenPositionRequireValidation, validateConsumerPosition])


    // Validate if consumer position is off-screen,
    // every position change.
    //
    const intervalID = useRef(0)
    useEffect(() => {
        fireJustClientSide(() => {
            window.clearInterval(intervalID.current)

            intervalID.current = window.setInterval(() => {
                checkIfTheOffScreenPositionRequireValidationThenValidate()
            }, 3000)
        })

        return () => {
            fireJustClientSide(() => {
                window.clearInterval(intervalID.current)
            })
        }
    }, [checkIfTheOffScreenPositionRequireValidationThenValidate])



    const onDragStopHandler = (event: DraggableEvent, data: DraggableData): void => {
        setConsumerPosition({
            x: data.x,
            y: data.y
        })
    }


    return [consumerPosition, onDragStopHandler]
}
