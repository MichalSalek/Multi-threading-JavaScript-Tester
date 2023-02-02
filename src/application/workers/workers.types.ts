import {WORKERS_KEYS} from '@/application/workers/add-new-worker-file-here'
import {WORKER_COMMANDS} from '@/application/workers/workersCommandsList'



declare global {
  interface Window {
    [key: string]: unknown | Worker
  }
}



type Keys = keyof typeof WORKER_COMMANDS
export type WorkerTasksName = typeof WORKER_COMMANDS[Keys]



export type WorkerFilenameType = string

export type WorkerName = string


export type WorkerKey = {
  workerName: WorkerName
  fileName?: WorkerFilenameType
}

type KeyOfWorkersKeysNamesType = keyof typeof WORKERS_KEYS
export type WorkerKeyType = typeof WORKERS_KEYS[KeyOfWorkersKeysNamesType] | WorkerKey


export type WorkerReadyState = {
  ready: boolean
  listenerActive?: boolean
}


export type WorkerErrorState = {
  error: boolean
}



export type WorkerReadyStateReport = WorkerKey & WorkerReadyState

export type NamedWorkerReadyStatusType = Record<WorkerName, WorkerReadyState>


export type WorkerErrorStateReport = WorkerKey & WorkerErrorState

export type NamedWorkerErrorStatusType = Record<WorkerName, WorkerErrorState>


export type WorkersAmount = number



export enum WorkerAmountChangeActionEnum {
  'addOne' = 'addOne',
  'removeLast' = 'removeLast',
  'setAmount' = 'setAmount'
}


export enum WorkerLifeSwitchCommandEnum {
  'install' = 'install',
  'uninstall' = 'uninstall'
}


export enum WorkerTriggerMessageCommandEnum {
  'activate' = 'activate',
  'kill' = 'kill'
}

