import React, { useEffect, useRef, useState } from 'react'
import { doCalculations } from '@/features/calculations-components/doCalculations'
import { MAIN_THREAD_KEY } from '@/constants-and-dev-utils'
import { sendTriggerMessageToSocket } from '@/features/socket-client/socket.api'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/socket-client/socketEventsEntities'
import {
    IWorkerReadyState,
    IWorkerWorkState,
    NamedWorkerReadyStatusType,
    NamedWorkerWorkStatusType,
    WorkerKeyType
} from '@/features/workers/workers.types'
import { useAppSelector } from '@/core/store.core'
import { selectWholeWorkersReadyState, selectWholeWorkersWorkState } from '@/features/workers/workersSlice'



// Hook for handling a main thread fake background calculations.
//
type IsMainThreadOnType = boolean
type HandleMainThreadSwitchChangeType = () => void
export type UseMainThreadCalculationsType = [IsMainThreadOnType, HandleMainThreadSwitchChangeType]

export const useMainThreadCalculations = <D>(CALCULATION_INTERVAL_TIMING_IN_MS = 100, CALCULATIONS_COMPLEXITY = 50, isMainThreadActiveOnLoad = false): UseMainThreadCalculationsType => {

    const [isMainThreadOn, setIsMainThreadOn] = useState<boolean>(isMainThreadActiveOnLoad)

    const [lastMadeCalculation, setLastMadeCalculation] = useState<number | undefined>(undefined)

    const intervalIDRef: React.MutableRefObject<number> = useRef(0)


    useEffect(() => {
        const clearInterval = (() => window.clearInterval(intervalIDRef.current))

        if (isMainThreadOn) {
            intervalIDRef.current = window.setInterval(() =>
                setLastMadeCalculation(doCalculations(CALCULATIONS_COMPLEXITY)), CALCULATION_INTERVAL_TIMING_IN_MS)
        } else {
            clearInterval()
        }

        return () => {
            clearInterval()
        }
    }, [isMainThreadOn, CALCULATION_INTERVAL_TIMING_IN_MS, CALCULATIONS_COMPLEXITY])


    useEffect(() => {
        if (typeof lastMadeCalculation === 'undefined') return () => undefined

        sendTriggerMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, {
            keyNames: MAIN_THREAD_KEY,
            unknownData: {
                working: isMainThreadOn,
                lastCalculations: lastMadeCalculation,
                timestamp: Date.now()
            }
        })

        return () => undefined
    }, [lastMadeCalculation, isMainThreadOn])


    const handleMainThreadSwitchChange = (): void => setIsMainThreadOn((prevIsOnState: D | boolean) => !prevIsOnState)

    return [isMainThreadOn, handleMainThreadSwitchChange]
}



// Hook to enable worker status data retrieval.
//
type ReturnedWorkerStatus = boolean | undefined
export type UseSpecificWorkerStatusType = [ReturnedWorkerStatus]


export enum UseSpecificWorkerStatusCommandEnum {
    'ready' = 'ready',
    'working' = 'working'
}


export const useSpecificWorkerStatus = (command: UseSpecificWorkerStatusCommandEnum, workerKey: WorkerKeyType): UseSpecificWorkerStatusType => {

    const [returnedSpecificWorkerStatus, setReturnedSpecificWorkerStatus] = useState<ReturnedWorkerStatus>(undefined)


    const allWorkersReadyStatuses: NamedWorkerReadyStatusType = useAppSelector(selectWholeWorkersReadyState)
    const [isReady, setIsActive] = useState(false)
    useEffect(() => {
        if (command !== UseSpecificWorkerStatusCommandEnum.ready) return () => undefined
        if (!allWorkersReadyStatuses || !allWorkersReadyStatuses[workerKey.workerName]) return () => undefined

        const thisWorkerReadyState: IWorkerReadyState = allWorkersReadyStatuses[workerKey.workerName]
        setIsActive(thisWorkerReadyState.ready)

        return () => undefined
    }, [allWorkersReadyStatuses, workerKey.workerName, command])


    const allWorkersWorkStatuses: NamedWorkerWorkStatusType = useAppSelector(selectWholeWorkersWorkState)
    const [isWorking, setIsWorking] = useState(false)
    useEffect(() => {
        if (command !== UseSpecificWorkerStatusCommandEnum.working) return () => undefined
        if (!allWorkersWorkStatuses || !allWorkersWorkStatuses[workerKey.workerName]) return () => undefined

        const thisWorkerWorkState: IWorkerWorkState = allWorkersWorkStatuses[workerKey.workerName]
        setIsWorking(thisWorkerWorkState.working)

        return () => undefined
    }, [allWorkersWorkStatuses, workerKey.workerName, command])


    useEffect(() => {
        setReturnedSpecificWorkerStatus(() => {
            switch (command) {
            case UseSpecificWorkerStatusCommandEnum.ready:
                return isReady
            case UseSpecificWorkerStatusCommandEnum.working:
                return isWorking
            }
        })
        return () => undefined
    }, [command, isReady, isWorking])


    return [returnedSpecificWorkerStatus]
}

export default {}
