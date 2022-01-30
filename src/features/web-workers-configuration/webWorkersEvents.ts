import { CALCULATION_WORKER_TASKS } from '@/features/calculation-workers-configuration/calculationWorkersEvents'



export const WEB_WORKER_TASKS = (() => Object.freeze({

    // Core tasks
    triggerActivationMessage: 'task__trigger_activation',
    killWorker: 'task__close',

    // Other business tasks
    ...CALCULATION_WORKER_TASKS

} as const))()

