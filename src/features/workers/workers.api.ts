import { MAX_WORKERS_LIMIT, runInDevEnvOnly } from '@/constants-and-dev-utils'
import {
    ISocketDTO,
    IWorkerKey,
    IWorkerTask,
    IWorkerWorkState,
    WorkerKeyType,
    WorkerNameType
} from '@/features/workers/workers.types'
import store from '@/core/store.core'
import {
    handleWorkerErrorStateReport,
    handleWorkerReadyStateReport,
    handleWorkerWorkStateReport
} from '@/features/workers/workersSlice'
import { workersKeysNames } from '@/features/workers/add-new-physical-worker-here'



// Remember: worker numbers are counted from 1, NOT FROM 0 ( business rule ;-) )
// output: calculationWorker1...
//
export const constructWorkerNameByOrderIndex = (workerOrderNumber: number | string): WorkerNameType =>
    `${workersKeysNames.calculationWorker.workerName}${Number(workerOrderNumber)}`


export const constructCalculationWorkerKeyByName = (workerName: string): IWorkerKey => ({
    workerName: workerName,
    fileName: workersKeysNames.calculationWorker.fileName
})


export const constructWorkerJobSocketDTO = <T>(event: MessageEvent<T>, workerKey: WorkerKeyType): ISocketDTO<T> => ({
    keyNames: workerKey,
    unknownData: event.data
})


export const getWorkerInstanceAbsolutely = (workerKey: WorkerKeyType) => window[workerKey.workerName] as Worker


// Strict, in-action check of worker activity
//
export const getWorkerRealActivityStatus = (workerName: WorkerNameType): boolean => {
    const LOOK_UP_STRING = 'orker'
    return String(window[workerName]).includes(LOOK_UP_STRING)
}


export const getExistingWorkersKeys = (): IWorkerKey[] => {

    // Maybe-worker array of the maximum number of workers:
    // [Worker, undefined, Worker, Worker, undefined, ...].length === MAX_WORKERS_LIMIT
    //
    const allWorkersPossibilities = Array(MAX_WORKERS_LIMIT as number).fill(undefined)
        .reduce((accumulator: [] | IWorkerKey[], _, index): IWorkerKey[] => {
            const currentWorkerName = constructWorkerNameByOrderIndex(index + 1)

            if (typeof window[currentWorkerName] !== 'undefined' && getWorkerRealActivityStatus(currentWorkerName)) {
                return [...accumulator, {workerName: currentWorkerName}]
            }
            return accumulator
        }, [])

    // Filter out all undefined - leave just worker keys
    //
    return allWorkersPossibilities.filter((val: IWorkerKey | undefined) =>
        typeof val !== 'undefined') as IWorkerKey[]
}


export const queueWorkerTask = (workerKey: WorkerKeyType, workerTask: IWorkerTask, msgForDevConsoleLog = ''): void => {
    const workerWindowInstance = getWorkerInstanceAbsolutely(workerKey)

    if (!workerWindowInstance) runInDevEnvOnly(() =>
        console.warn(`[Bug detector]: Instance of ${workerKey.workerName} is ${typeof workerWindowInstance}`))

    const workerData: ISocketDTO<IWorkerTask> = {keyNames: workerKey, unknownData: workerTask}
    workerWindowInstance.postMessage(workerData)
    runInDevEnvOnly(() => console.log(`Worker command queued: [ ${workerTask.workerTaskName} ]. ${msgForDevConsoleLog ? msgForDevConsoleLog : ''}`))
}


export const flagIfWorkerHasError = (workerKey: WorkerKeyType, isError: boolean, error: Error = {
    name: `Default error of ${workerKey.workerName}.`,
    message: 'Please pass a valid error msg.'
}): true => {
    if (isError) {
        store.dispatch(handleWorkerErrorStateReport({
            workerName: workerKey.workerName,
            error: true
        }))
        runInDevEnvOnly(() => console.error(error))
    } else {
        store.dispatch(handleWorkerErrorStateReport({
            workerName: workerKey.workerName,
            error: false
        }))
    }

    return true
}


export const updateWorkerIsReadyState = (workerKey: WorkerKeyType): true => {
    const isReady: boolean = process.browser && (!!window[workerKey.workerName])

    store.dispatch(handleWorkerReadyStateReport({
        workerName: workerKey.workerName,
        ready: isReady
    }))

    return true
}


export const flagIfWorkerIsWorking = (workerKey: WorkerKeyType, workingNewFlag: boolean): true => {
    const currentWorkerWorkState: IWorkerWorkState | undefined = store.getState().calculationsWorkersSlice.workStatuses[workerKey.workerName]

    if (!currentWorkerWorkState || currentWorkerWorkState.working !== workingNewFlag) {
        store.dispatch(handleWorkerWorkStateReport({
            workerName: workerKey.workerName,
            working: workingNewFlag
        }))
    }

    return true
}



export const getValidatedAndCorrectRequestedWorkersAmount = (requestedAmount: number | string): number => {

    // Usually: a whitespace or nothing. (probably user removes everything from input by a backspace)
    if (!requestedAmount) return 0

    // When number has more than 2 digits. Example: 233
    if (typeof requestedAmount === 'string' && requestedAmount.length > 2) return MAX_WORKERS_LIMIT

    // Simple range check and making a nice iteration loop when User will use arrows to control amount
    const newAmountValue = Number(requestedAmount)
    if (newAmountValue < 0) return MAX_WORKERS_LIMIT
    if (newAmountValue > MAX_WORKERS_LIMIT) return 0

    // Validation passed, return actual value
    return newAmountValue
}

export default {}
