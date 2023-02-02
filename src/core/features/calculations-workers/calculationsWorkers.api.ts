import {
    CalculationWorkerTask,
    CalculationWorkerWorkState
} from '@/core/features/calculations-workers/calculationsWorkers.types'
import store from '@/application/store/store'
import {handleWorkerWorkStateReport} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {WORKERS_KEYS} from '@/application/workers/add-new-worker-file-here'
import {WorkersPolicy} from '../../../../shared-policies/workers.policy'
import {getWorkerRealActivityStatus, queueWorkerTask} from '@/application/workers/workers.api'
import {WorkerFilenameType, WorkerKey, WorkerKeyType, WorkerName} from '@/application/workers/workers.types'



// Remember: worker numbers are counted from 1, NOT FROM 0 ( like in file names )
// output: calculationWorker1...
//
export const getCalculationWorkerNameByOrderIndex = (workerOrderNumber: number | string): WorkerName =>
    `${WORKERS_KEYS.calculationWorker.workerName}${Number(workerOrderNumber)}`



export const getCalculationWorkerKeyByName = (workerName: string): WorkerKey => ({
    workerName: workerName,
    fileName: WORKERS_KEYS.calculationWorker.fileName
})



export const getReadyStatesCalculationWorkersKeys = (): WorkerKey[] => {

    // Maybe-worker array of the maximum number of calculations-workers:
    // [Worker, undefined, Worker, Worker, undefined, ...].length === MAX_WORKERS_LIMIT
    //
    const allWorkersKeysPossibilities = Array(WorkersPolicy.MAX_WORKERS_LIMIT as number).fill(undefined)
        .reduce((accumulator: [] | WorkerKey[], _, index): WorkerKey[] => {
            const currentWorkerName = getCalculationWorkerNameByOrderIndex(index + 1)

            if (typeof window[currentWorkerName] !== 'undefined' && getWorkerRealActivityStatus(currentWorkerName)) {
                return [...accumulator, {workerName: currentWorkerName}]
            }
            return accumulator
        }, [])

    // Filter out all undefined - leave just worker keys
    //
    return allWorkersKeysPossibilities.filter((val: WorkerKey | undefined) =>
        typeof val !== 'undefined') as WorkerKey[]
}


export const queueAllCalculationWorkersTask = (workerFilename: WorkerFilenameType, workerTask: CalculationWorkerTask, msgForDevConsoleLog = ''): void => {
    const activeWorkersByNow: WorkerKey[] = getReadyStatesCalculationWorkersKeys()

    activeWorkersByNow.forEach((workerKey: WorkerKey) => {
        queueWorkerTask(workerKey, workerTask, msgForDevConsoleLog)
    })
}


export const flagIfWorkerIsWorking = (workerKey: WorkerKeyType, workingNewFlag: boolean): true => {
    const currentWorkerWorkState: CalculationWorkerWorkState | undefined = store.getState().calculationWorkersSlice.workStatuses[workerKey.workerName]

    if (!currentWorkerWorkState || currentWorkerWorkState.working !== workingNewFlag) {
        store.dispatch(handleWorkerWorkStateReport({
            workerName: workerKey.workerName,
            working: workingNewFlag
        }))
    }

    return true
}



