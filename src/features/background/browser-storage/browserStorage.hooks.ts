import {useAppDispatch, useAppSelector} from '@/core/store.core'
import {handleWorkerAmountChange, selectRequestedWorkersAmount} from '@/features/background/web-workers/webWorkersSlice'
import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {getStorageItem, setStorageItem} from '@/features/background/browser-storage/browserStorage.api'
import {
    STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE,
    STORAGE_KEY_CONTROL_PANEL_SWITCHES,
    STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION,
    STORAGE_KEY_WORKERS_AMOUNT,
    StorageKeyControlPanelCollapseStateEnum
} from '@/core/constants.core'
import {WorkerAmountChangeActionEnum} from '@/features/background/web-workers/webWorkers.types'
import {
    handleControlPanelSwitchVisibility,
    possibleControlPanelSwitchesNames,
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/features/building/control-panel/controlPanelSlice'
import {ControlPosition, DraggableData, DraggableEvent} from 'react-draggable'
import {isUndefinedType} from '@/coding-utils/typeOperations.api'
import {fireClientSide} from '@/coding-utils/environmentOperations.api'
import {ISystemComponentsVisibilities} from '@/features/building/control-panel/controlPanel.types'



// WORKERS AMOUNT STATE STORAGE PERSIST
//
export const useWorkersAmountStoragePersist = (): void => {

    const dispatch = useAppDispatch()

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)

    useEffect(() => {
        // @todo HERE trigger a query for amounts of all workers calculations.
        //
        const memorizedValue = getStorageItem(STORAGE_KEY_WORKERS_AMOUNT)
        const memorizedAmountOfWorkers = memorizedValue ? Number(memorizedValue) : 0
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



// CONTROL PANEL SWITCHES STATE STORAGE PERSIST
//
export const useControlPanelSwitchesStoragePersist = (): void => {

    const dispatch = useAppDispatch()

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    useEffect(() => {
        const memorizedValue = getStorageItem(STORAGE_KEY_CONTROL_PANEL_SWITCHES)

        if (typeof memorizedValue === 'string') {

            const memorizedStorageControlPanelSwitches: ISystemComponentsVisibilities = JSON.parse(memorizedValue)

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

export const useControlPanelCollapseStateStoragePersist = (initialBehavior: boolean): UseControlPanelCollapseStateStoragePersistType => {

    const [isListCollapsed, setIsListCollapsed] = useState<boolean>(initialBehavior)

    useEffect(() => {
        const memorizedValue = getStorageItem(STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE)

        if (typeof memorizedValue === 'string') {

            switch (memorizedValue) {
            case StorageKeyControlPanelCollapseStateEnum.false:
                setIsListCollapsed(false)
                break
            case StorageKeyControlPanelCollapseStateEnum.true:
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


// DRAGGABLE INSTANCES STATE STORAGE PERSIST
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
        const memorizedValue = getStorageItem(browserStorageKey)

        if (typeof memorizedValue === 'string') {
            // Value from storage is available.
            //
            setConsumerPosition(JSON.parse(memorizedValue))
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
        (axisPosition: number, XorY: 'X' | 'Y') => fireClientSide<boolean>(() => {
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
        fireClientSide(() => {
            window.clearInterval(intervalID.current)

            intervalID.current = window.setInterval(() => {
                checkIfTheOffScreenPositionRequireValidationThenValidate()
            }, 3000)
        })

        return () => {
            fireClientSide(() => {
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

