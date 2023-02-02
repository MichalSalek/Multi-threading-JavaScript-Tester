import {CALCULATIONS_WORKER_COMMANDS} from '@/core/features/calculations-workers/calculationsWorkersCommandsList'
import {ClientBrowserIDType} from '@/application/socket-client/socket.types'

import {WorkersPolicy} from '../../../../shared-policies/workers.policy'
import {WorkerKey, WorkerName, WorkerTasksName} from '@/application/workers/workers.types'




// Types for tasks
//
type Keys = keyof typeof CALCULATIONS_WORKER_COMMANDS
export type CalculationWorkerTasksName = typeof CALCULATIONS_WORKER_COMMANDS[Keys] | WorkerTasksName


// Types of Workers utils
//
export type CalculationWorkerTask = {
  workerTaskName: CalculationWorkerTasksName
  complexity?: number
}


export type WorkerCalculationType = number


export type NewWorkersJobType = {
  workerName: WorkerName,
  lastCalculations: WorkerCalculationType
}

export type NewWorkersJobByIPType = {
  clientBrowserID: ClientBrowserIDType
  data: NewWorkersJobType
}




export type CalculationWorkerWorkState = {
  working: boolean
}


export type CalculationWorkerComplexityState = {
  complexity: number
}


export type CalculationWorkerLastCalculation = {
  lastCalculations: WorkerCalculationType | null
}


export type WorkerToSocketDTO<T> = {
  keyNames: WorkerKey | typeof WorkersPolicy.MAIN_THREAD_KEY
  unknownData: T
}


export type CalculationWorkerDTO = {
  timestamp: number
} & CalculationWorkerWorkState & CalculationWorkerLastCalculation


export type CalculationWorkerWorkStateReport = WorkerKey & CalculationWorkerWorkState


export type NamedWorkerWorkStatusType = Record<WorkerName, CalculationWorkerWorkState>



export type CalculationWorkerComplexityStateReport = WorkerKey & CalculationWorkerComplexityState



export type NamedWorkerComplexityStatusType = Record<WorkerName, CalculationWorkerComplexityState>

export type CalculationWorkersGlobalComplexityType = number | undefined | 'NaN'


