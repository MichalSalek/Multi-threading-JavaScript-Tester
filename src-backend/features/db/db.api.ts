import {NewWorkersJobByIPType} from '@/core/features/calculations-workers/calculationsWorkers.types'
import {workersRuntimeData} from './ram-db'
import {DBModel, WorkersJobBodyType} from './db.types'




// Return current state of all jobs done by all threads
//
export const getWholeData = (): DBModel => workersRuntimeData


// Check a collection length and remove overload when it's needed.
//
const checkAndCleanupMemoryAllocation = (clientBrowserID: string, workerName: string): void => {
    getWholeData()[clientBrowserID][workerName].results.length > 200
  && (() => getWholeData()[clientBrowserID][workerName].results.length = 200)()
}


const setNewValuesToWorkerKey = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {
    const roundDecimalCalculationResultToInt = (number: number): number => Math.round(number * 1000000000000)
    const {workerName, lastCalculations} = data

    getWholeData()[clientBrowserID][workerName].results.unshift(roundDecimalCalculationResultToInt(lastCalculations))
    getWholeData()[clientBrowserID][workerName].amount += 1
}


const returnDefaultWorkerJobBody = (): WorkersJobBodyType => ({
    results: [],
    amount: 0
})


// Add newly created client and calculations-workers models.
//
const checkAndCreateNotExistingWorkerSchema = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {

    typeof getWholeData()[clientBrowserID] === 'undefined'
  && (() => getWholeData()[clientBrowserID] = {})()

    typeof getWholeData()[clientBrowserID][data.workerName] === 'undefined'
  && (() => getWholeData()[clientBrowserID][data.workerName] = returnDefaultWorkerJobBody())()
}


// Data receive handler
//
export const setNewJobDone = (newWorkersJobByIP: NewWorkersJobByIPType): void => {

    checkAndCreateNotExistingWorkerSchema(newWorkersJobByIP)

    setNewValuesToWorkerKey(newWorkersJobByIP)

    checkAndCleanupMemoryAllocation(newWorkersJobByIP.clientBrowserID, newWorkersJobByIP.data.workerName)
}


// Erase _ALL_ data
//
export const eraseDBData = (): void => {
    const keys: string[] = Object.keys(getWholeData())
    keys.forEach((key) => delete getWholeData()[key])
}
