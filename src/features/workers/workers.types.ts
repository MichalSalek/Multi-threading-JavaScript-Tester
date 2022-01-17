import { WEB_WORKER_TASKS } from '@/features/workers/workersEvents'
import { UnknownFunctionType } from '@/core/types.core'
import { workersKeysNames } from '@/features/workers/add-new-physical-worker-here'
import { MAIN_THREAD_KEY } from '@/utils-and-constants.core'



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
export interface IWorkerTask {
    workerTaskName: WorkerTasksName
    complexity?: number
}


export type WorkerNameType = string

export type WorkerCalculationType = number


export type NewWorkerJobType = { workerName: WorkerNameType, lastCalculations: WorkerCalculationType }


export interface IWorkerKey {
    fileName?: string,
    workerName: WorkerNameType
}


type KeyOfWorkersKeysNamesType = keyof typeof workersKeysNames
export type WorkerKeyType = typeof workersKeysNames[KeyOfWorkersKeysNamesType] | IWorkerKey


export interface IWorkersJobsBody {
    results: number[]
    amount: number
}


// Workers job object types, eg:
// { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }
//
export type WorkersJobsType = Record<WorkerNameType, IWorkersJobsBody>


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


export interface IWorkerLastCalculation {
    lastCalculations: WorkerCalculationType | null
}


export interface IWorkerDTO extends IWorkerWorkState, IWorkerLastCalculation {
    timestamp: number
}


export interface IWorkerWorkStateReport extends IWorkerWorkState, IWorkerKey {
}


export interface IWorkerReadyStateReport extends IWorkerReadyState, IWorkerKey {
}


export interface IWorkerErrorStateReport extends IWorkerErrorState, IWorkerKey {
}


export type NamedWorkerWorkStatusType = Record<WorkerNameType, IWorkerWorkState>

export type NamedWorkerReadyStatusType = Record<WorkerNameType, IWorkerReadyState>

export type NamedWorkerErrorStatusType = Record<WorkerNameType, IWorkerErrorState>

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


export type SocketResponseStatusesType = 201


export interface ISocketToAppCalculationDataDTO {
    data: WorkersJobsType
    status: SocketResponseStatusesType
}


export interface ISocketDTO<T> {
    keyNames: WorkerKeyType | typeof MAIN_THREAD_KEY
    unknownData: T
}


export type UnsubscribeFunctionType = UnknownFunctionType
