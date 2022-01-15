
export const WEB_WORKER_TASKS = (() => Object.freeze( {
	triggerActivationMessage: 'task__trigger_activation',
	turnOnCalculations: 'task__calculations_on',
	turnOffCalculations: 'task__calculations_off',
	killWorker: 'task__close'
} as const))()

