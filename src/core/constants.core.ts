import {IWorkerKey} from '@/features/background/workers/workers.types'
import {fireClientSide} from '@/core/low-level-utils/environmentOperations.api'



// Worker limit. Automatic set - window.navigator.hardwareConcurrency
export const MAX_WORKERS_LIMIT = fireClientSide<number>(() => window.navigator.hardwareConcurrency || 4) as number

// WorkerKey entity for main thread. Exceptionally - it is not a Worker :-) But using the same logic and the case is singular.
export const MAIN_THREAD_KEY: IWorkerKey = {workerName: 'mainThread'}

// Debounce freeze time for bundle actions. Check the usage to know more.
export const WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS = 390

// Debounce - Optimal for CPU usage.
// Realtime - The most accurate way to receive data over time.
export const INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES: number | 0 = 0 // 0 means realtime

// Complexity limit. So high values can just crash the browsers (event loop overload).
export const MIN_WORKER_COMPLEXITY_POSSIBILITY = 2
export const MAX_WORKER_COMPLEXITY_POSSIBILITY = 200

// Mobile:
//
export const MIN_DESKTOP_INNER_WIDTH_MEDIA_QUERY = '(min-width:600px)'
