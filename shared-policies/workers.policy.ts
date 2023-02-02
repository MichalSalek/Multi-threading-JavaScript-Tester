import {fireClientSide} from '@/utils/environmentOperations.api'
import {WorkerKey} from '@/application/workers/workers.types'



export const WorkersPolicy = {

    // Worker limit. Automatic set - default.
    MAX_WORKERS_LIMIT: fireClientSide<number>(() => window.navigator.hardwareConcurrency || 4) as number,

    // WorkerKey name of main thread.
    MAIN_THREAD_KEY: (():WorkerKey => ({workerName: 'mainThread'}))(),

    // Complexity limit. So high values can just crash the browsers (event loop overload).
    MIN_WORKER_COMPLEXITY_POSSIBILITY: 2,
    MAX_WORKER_COMPLEXITY_POSSIBILITY: 200,


}
