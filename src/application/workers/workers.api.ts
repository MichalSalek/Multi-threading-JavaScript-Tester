import {
    CalculationWorkerTask,
    CalculationWorkerWorkState,
    WorkerToSocketDTO
} from '@/core/features/calculations-workers/calculationsWorkers.types'
import store from '@/application/store/store'
import {handleWorkerWorkStateReport} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {addConsoleVerbose} from '@/application/logger/logger.api'
import {handleWorkerErrorStateReport, handleWorkerReadyStateReport} from '@/application/workers/workers.slice'
import {WorkerKeyType, WorkerName} from '@/application/workers/workers.types'




export const constructWorkerJobToSocketDTO = <T>(event: MessageEvent<T>, workerKey: WorkerKeyType): WorkerToSocketDTO<T> => ({
    keyNames: workerKey,
    unknownData: event.data
})



export const getWorkerInstanceAbsolutely = (workerKey: WorkerKeyType): Worker =>
  window[workerKey.workerName] as unknown as Worker




// Strict check of worker activity.
//
export const getWorkerRealActivityStatus = (workerName: WorkerName): boolean => {
    const LOOK_UP_STRING = 'orker'
    return String(window[workerName]).includes(LOOK_UP_STRING)
}




export const queueWorkerTask = (workerKey: WorkerKeyType, workerTask: CalculationWorkerTask, msgForDevConsoleLog = ''): void => {
    const workerWindowInstance = getWorkerInstanceAbsolutely(workerKey)

    if (!workerWindowInstance) addConsoleVerbose(`[Bug detector]: Instance of ${workerKey.workerName} is ${typeof workerWindowInstance}`, 'error')

    const workerData: WorkerToSocketDTO<CalculationWorkerTask> = {keyNames: workerKey, unknownData: workerTask}
    workerWindowInstance.postMessage(workerData)
    addConsoleVerbose(`Worker command queued: [ ${workerTask.workerTaskName} ]. ${msgForDevConsoleLog ? msgForDevConsoleLog : ''}`, 'log')
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
        addConsoleVerbose(error, 'error')
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
    const currentWorkerWorkState: CalculationWorkerWorkState | undefined = store.getState().calculationWorkersSlice.workStatuses[workerKey.workerName]

    if (!currentWorkerWorkState || currentWorkerWorkState.working !== workingNewFlag) {
        store.dispatch(handleWorkerWorkStateReport({
            workerName: workerKey.workerName,
            working: workingNewFlag
        }))
    }

    return true
}



// Give number or string with the range, get a number in the range.
//
export const getValidatedPassedAmount = (requestedAmount: number | string, minValue: number, maxValue: number): number => {

    // Usually: a whitespace or nothing. (probably user removes everything from input by a backspace)
    if (!requestedAmount) return minValue

    // IF fulfilled, when number has more than x digits, where x is amount of digits in the passed number.
    if (typeof requestedAmount === 'string' && requestedAmount.length > String(maxValue).length) return maxValue

    // Simple range check and making a nice iteration loop when User will use arrows to control amount
    const newAmountValue = Number(requestedAmount)
    if (newAmountValue < minValue) return minValue
    if (newAmountValue > maxValue) return maxValue

    // Validation passed, return actual value
    return newAmountValue
}

