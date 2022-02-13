import {
    NewWorkersJobByIPType,
    WorkerJobsByClientBrowserIDTypeDTO,
    WorkersJobBodyType
} from '@/features/background/web-workers-configuration/webWorkers.types'
import { workersRuntimeData } from './runtimeData'



const roundDecimalCalculationResultToInt = (number: number): number => Math.round(number * 1000000000000)


const cleanupWorkerResultsArray = (clientBrowserID: string, workerName: string): void => {
    workersRuntimeData[clientBrowserID][workerName].results.length = 200
}


const setNewValuesToWorkerKey = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {
    const {workerName, lastCalculations} = data

    workersRuntimeData[clientBrowserID][workerName].results.unshift(roundDecimalCalculationResultToInt(lastCalculations))
    workersRuntimeData[clientBrowserID][workerName].amount = workersRuntimeData[clientBrowserID][workerName].results.length
}


const returnDefaultWorkerJobBody = (): WorkersJobBodyType => ({
    results: [],
    amount: 0
})



const checkAndCreateNotExistingWorkerSchema = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {

    typeof workersRuntimeData[clientBrowserID] === 'undefined'
    && (() => workersRuntimeData[clientBrowserID] = {})()

    typeof workersRuntimeData[clientBrowserID][data.workerName] === 'undefined'
    && (() => workersRuntimeData[clientBrowserID][data.workerName] = returnDefaultWorkerJobBody())()
}



// Data receive handler
//
export const setNewJobDone = (newWorkersJobByIP: NewWorkersJobByIPType): void => {

    checkAndCreateNotExistingWorkerSchema(newWorkersJobByIP)

    setNewValuesToWorkerKey(newWorkersJobByIP)

    cleanupWorkerResultsArray(newWorkersJobByIP.clientBrowserID, newWorkersJobByIP.data.workerName)
}


// Return current state of all jobs done by all threads
//
export const getAllJobsDone = (): WorkerJobsByClientBrowserIDTypeDTO => workersRuntimeData


// Clear _ALL_ data
//
export const setClearRuntimeData = (): void => {
    const keys: string[] = Object.keys(workersRuntimeData)
    keys.forEach((key) => delete workersRuntimeData[key])
}
