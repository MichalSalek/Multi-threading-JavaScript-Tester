import {NewWorkersJobByIPType} from '@/features/background/web-workers/webWorkers.types'
import {workersRuntimeData} from './ram-db'
import {DBModel, WorkersJobBodyType} from './db.types'




// Return current state of all jobs done by all threads
//
export const getAllJobsDone = (): DBModel => workersRuntimeData


// Check a collection length and remove overload when it's needed.
//
const checkAndCleanupMemoryAllocation = (clientBrowserID: string, workerName: string): void => {
    getAllJobsDone()[clientBrowserID][workerName].results.length > 200
  && (() => getAllJobsDone()[clientBrowserID][workerName].results.length = 200)()
}


const setNewValuesToWorkerKey = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {
    const roundDecimalCalculationResultToInt = (number: number): number => Math.round(number * 1000000000000)
    const {workerName, lastCalculations} = data

    getAllJobsDone()[clientBrowserID][workerName].results.unshift(roundDecimalCalculationResultToInt(lastCalculations))
    getAllJobsDone()[clientBrowserID][workerName].amount += 1
}


const returnDefaultWorkerJobBody = (): WorkersJobBodyType => ({
    results: [],
    amount: 0
})


// Add newly created client and workers models.
//
const checkAndCreateNotExistingWorkerSchema = ({clientBrowserID, data}: NewWorkersJobByIPType): void => {

    typeof getAllJobsDone()[clientBrowserID] === 'undefined'
  && (() => getAllJobsDone()[clientBrowserID] = {})()

    typeof getAllJobsDone()[clientBrowserID][data.workerName] === 'undefined'
  && (() => getAllJobsDone()[clientBrowserID][data.workerName] = returnDefaultWorkerJobBody())()
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
    const keys: string[] = Object.keys(getAllJobsDone())
    keys.forEach((key) => delete getAllJobsDone()[key])
}
