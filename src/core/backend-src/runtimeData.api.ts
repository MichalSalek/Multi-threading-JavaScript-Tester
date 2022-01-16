import {IWorkersJobsBody, NewWorkerJobType, WorkersJobsType} from '@/features/workers/workers.types'

//
// It's a pseudo-DB for the app presentation
// instead of real DB
// to avoid a boilerplate code overhead with additional configurations.
//


//////////////////////////////////////////////////////////////////
// Runtime data                                                 //
// { worker1: 0, worker2: 37, worker3: 560, worker4: 717 }      //
//                                                              //
export const workersRuntimeData: WorkersJobsType = {}           //
//                                                              //
//                                                              //
export const IPAddressesData: string[] = []                     //
//                                                              //
//////////////////////////////////////////////////////////////////


const returnNewKeyBodyWithDefaultValues = (): IWorkersJobsBody => ({
    results: [],
    amount: 0
})


const checkAndCreateNotExistingWorkerKey = (name: string): true => {
    typeof workersRuntimeData[name] === 'undefined' && (() => workersRuntimeData[name] = returnNewKeyBodyWithDefaultValues())()
    return true
}


const roundDecimalCalculationResultToInt = (number: number): number => Math.round(number * 1000000000000)


const setNewValuesToWorkerKey = ({workerName, lastCalculations}: NewWorkerJobType): true => {
    workersRuntimeData[workerName].results.push(roundDecimalCalculationResultToInt(lastCalculations))
    workersRuntimeData[workerName].amount = workersRuntimeData[workerName].results.length
    return true
}


// Data receive handler
//
export const setNewJobDone = ({workerName, lastCalculations}: NewWorkerJobType): true => {
    checkAndCreateNotExistingWorkerKey(workerName) && setNewValuesToWorkerKey({
        workerName,
        lastCalculations
    })
    return true // TODO: In the future, here we can handle any validations etc.
}


// Return current state of all jobs done by all threads
//
export const getAllJobsDone = (): WorkersJobsType => workersRuntimeData


// Clear data
//
export const setClearRuntimeData = (): true => {
    const keys: string[] = Object.keys(workersRuntimeData)
    keys.forEach((key) => delete workersRuntimeData[key])
    return true
}


export default workersRuntimeData
