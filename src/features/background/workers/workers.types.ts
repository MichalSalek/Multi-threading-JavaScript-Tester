import { WEB_WORKER_TASKS } from '@/features/background/workers/workersEvents'
import { workersKeysNames } from '@/features/background/workers/add-new-worker-file-here'
import { MAIN_THREAD_KEY } from '@/core/constants.core'
import { ClientBrowserIDType } from '@/features/background/socket-client/socket.types'
import {WorkerNameType} from '../../../../src-backend/features/db/db.types'



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

export type WorkersGlobalComplexityType = { amount: number | undefined | 'NaN' }

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

