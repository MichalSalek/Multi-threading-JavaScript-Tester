export const WEB_WORKER_TASKS = (() => Object.freeze({

    // Core tasks
    triggerActivationMessage: 'task__trigger_activation',
    killWorker: 'task__close',

    // Other building tasks
    turnOnCalculations: 'task__calculations_on',
    turnOffCalculations: 'task__calculations_off'

} as const))()

