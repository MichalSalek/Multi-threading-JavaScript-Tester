//
// To configure a new worker:
// Add 'file-public-name.js' of worker here with friendlyName for an app usage.
//
export const WORKERS_KEYS = Object.freeze({
    calculationWorker: {workerName: 'calculationsWorker', fileName: 'calculation-worker.js'}
} as const)

