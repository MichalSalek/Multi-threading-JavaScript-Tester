import { useEffect, useState } from 'react'
import {
    IWorkerReadyState,
    IWorkerWorkState,
    NamedWorkerReadyStatusType,
    NamedWorkerWorkStatusType,
    WorkerKeyType
} from '@/features/background/web-workers-configuration/webWorkers.types'
import { useAppSelector } from '@/core/store.core'
import {
    selectWholeWorkersReadyState,
    selectWholeWorkersWorkState
} from '@/features/background/web-workers-configuration/webWorkersSlice'



// Hook to enable worker status data retrieval.
//
type ReturnedWorkerStatus = boolean | undefined
export type UseSingleWorkerSpecificStatusType = [ReturnedWorkerStatus]


export enum UseSpecificWorkerStatusCommandEnum {
    'ready' = 'ready',
    'working' = 'working'
}


export const useSingleWorkerSpecificStatus = (command: UseSpecificWorkerStatusCommandEnum, workerKey: WorkerKeyType): UseSingleWorkerSpecificStatusType => {

    const [returnedSingleWorkerSpecificStatus, setReturnedSingleWorkerSpecificStatus] = useState<ReturnedWorkerStatus>(undefined)


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
        setReturnedSingleWorkerSpecificStatus(() => {
            switch (command) {
            case UseSpecificWorkerStatusCommandEnum.ready:
                return isReady
            case UseSpecificWorkerStatusCommandEnum.working:
                return isWorking
            }
        })
        return () => undefined
    }, [command, isReady, isWorking])


    return [returnedSingleWorkerSpecificStatus]
}
