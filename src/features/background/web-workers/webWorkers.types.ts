import { WEB_WORKER_TASKS } from '@/features/background/web-workers/webWorkersEvents'
import { workersKeysNames } from '@/features/background/web-workers/add-new-physical-worker-here'
import { MAIN_THREAD_KEY } from '@/app-config-constants'
import { ClientBrowserIDType } from '@/features/background/socket-client/socket.types'



declare global {
    interface Window {
        [key: string]: unknown | Worker
    }
}


// Types for tasks
//
type Keys = keyof typeof WEB_WORKER_TASKS
export type WorkerTasksName = typeof WEB_WORKER_TASKS[Keys]


// Types of Workers utils
//
export type IWorkerTask = {
    workerTaskName: WorkerTasksName
    complexity?: number
}


export type WorkerNameType = string
export type WorkerFilenameType = string

export type WorkerCalculationType = number


export type NewWorkersJobType = {
    workerName: WorkerNameType,
    lastCalculations: WorkerCalculationType
}

export type NewWorkersJobByIPType = {
    clientBrowserID: ClientBrowserIDType
    data: NewWorkersJobType
}


export type IWorkerKey = {
    workerName: WorkerNameType
    fileName?: WorkerFilenameType
}


type KeyOfWorkersKeysNamesType = keyof typeof workersKeysNames
export type WorkerKeyType = typeof workersKeysNames[KeyOfWorkersKeysNamesType] | IWorkerKey


export type WorkersJobBodyType = {
    results: number[]
    amount: number
}


// eg:
// { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }
//
export type WorkerJobsTypeDTO = Record<WorkerNameType, WorkersJobBodyType>

// eg:
// { '192.168.1.100': { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }}
//
export type WorkerJobsByClientBrowserIDTypeDTO = Record<ClientBrowserIDType, WorkerJobsTypeDTO>


export interface IWorkerReadyState {
    ready: boolean
    listenerActive?: boolean
}


export interface IWorkerErrorState {
    error: boolean
}


export interface IWorkerWorkState {
    working: boolean
}


export interface IWorkerComplexityState {
    complexity: number
}


export interface IWorkerLastCalculation {
    lastCalculations: WorkerCalculationType | null
}


export interface WorkerToSocketDTO<T> {
    keyNames: WorkerKeyType | typeof MAIN_THREAD_KEY
    unknownData: T
}


export interface IWorkerDTO extends IWorkerWorkState, IWorkerLastCalculation {
    timestamp: number
}


export interface IWorkerWorkStateReport extends IWorkerWorkState, IWorkerKey {
}


export type NamedWorkerWorkStatusType = Record<WorkerNameType, IWorkerWorkState>



export interface IWorkerReadyStateReport extends IWorkerReadyState, IWorkerKey {
}


export type NamedWorkerReadyStatusType = Record<WorkerNameType, IWorkerReadyState>



export interface IWorkerErrorStateReport extends IWorkerErrorState, IWorkerKey {
}


export type NamedWorkerErrorStatusType = Record<WorkerNameType, IWorkerErrorState>



export interface IWorkerComplexityStateReport extends IWorkerComplexityState, IWorkerKey {
}


export type NamedWorkerComplexityStatusType = Record<WorkerNameType, IWorkerComplexityState>



export type WorkersAmountStateType = {
    amount: number
}


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

