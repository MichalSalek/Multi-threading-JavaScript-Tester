import {
    NewWorkersJobByIPType,
    WorkerJobsByClientBrowserIDTypeDTO,
    WorkersJobBodyType
} from '@/features/background/web-workers-configuration/webWorkers.types'

//
// It's a pseudo-DB for the app presentation
// instead of real DB
// to avoid a boilerplate code overhead with additional configurations.
//


//////////////////////////////////////////////////////////////////
// Runtime data
// 'some-id': { worker1: 0, worker2: 37, worker3: 560, worker4: 717 }
//
export const workersRuntimeData: WorkerJobsByClientBrowserIDTypeDTO = {}
//
//
//////////////////////////////////////////////////////////////////



const roundDecimalCalculationResultToInt = (number: number): number => Math.round(number * 1000000000000)


const setNewValuesToWorkerKey = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {
    const {workerName, lastCalculations} = data

    workersRuntimeData[clientBrowserID][workerName].results.push(roundDecimalCalculationResultToInt(lastCalculations))
    workersRuntimeData[clientBrowserID][workerName].amount = workersRuntimeData[clientBrowserID][workerName].results.length
}


const returnDefaultWorkerJobBody = (): WorkersJobBodyType => ({
    results: [],
    amount: 0
})



const checkAndCreateNotExistingWorkerSchema = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {

    typeof workersRuntimeData[clientBrowserID] === 'undefined' && (() => workersRuntimeData[clientBrowserID] = {})()
    typeof workersRuntimeData[clientBrowserID][data.workerName] === 'undefined' && (() => workersRuntimeData[clientBrowserID][data.workerName] = returnDefaultWorkerJobBody())()

}



// Data receive handler
//
export const setNewJobDone = (newWorkersJobByIP: NewWorkersJobByIPType): void => {

    checkAndCreateNotExistingWorkerSchema(newWorkersJobByIP)
    setNewValuesToWorkerKey(newWorkersJobByIP)
}


// Return current state of all jobs done by all threads
//
export const getAllJobsDone = (): WorkerJobsByClientBrowserIDTypeDTO => workersRuntimeData


// Clear data
//
export const setClearRuntimeData = (): void => {
    const keys: string[] = Object.keys(workersRuntimeData)
    keys.forEach((key) => delete workersRuntimeData[key])
}
