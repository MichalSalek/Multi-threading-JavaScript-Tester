import {useEffect, useState} from 'react'
import {
    CalculationWorkerWorkState,
    NamedWorkerWorkStatusType,
} from '@/core/features/calculations-workers/calculationsWorkers.types'
import {useAppSelector} from '@/application/store/store'
import {
    selectWholeWorkersWorkState
} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {NamedWorkerReadyStatusType, WorkerKeyType, WorkerReadyState} from '@/application/workers/workers.types'
import {selectWholeWorkersReadyState} from '@/application/workers/workers.slice'



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

        const thisWorkerReadyState: WorkerReadyState = allWorkersReadyStatuses[workerKey.workerName]
        setIsActive(thisWorkerReadyState.ready)

    }, [allWorkersReadyStatuses, workerKey.workerName, command])


    const allWorkersWorkStatuses: NamedWorkerWorkStatusType = useAppSelector(selectWholeWorkersWorkState)
    const [isWorking, setIsWorking] = useState(false)
    useEffect(() => {
        if (command !== UseSpecificWorkerStatusCommandEnum.working) return () => undefined
        if (!allWorkersWorkStatuses || !allWorkersWorkStatuses[workerKey.workerName]) return () => undefined

        const thisWorkerWorkState: CalculationWorkerWorkState = allWorkersWorkStatuses[workerKey.workerName]
        setIsWorking(thisWorkerWorkState.working)

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
    }, [command, isReady, isWorking])


    return [returnedSingleWorkerSpecificStatus]
}
