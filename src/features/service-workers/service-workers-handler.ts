import {
	getWorkerTaskCommand,
	TWorkerKeyNames,
	TWorkersFileNames,
	TWorkerTasks
} from "@/features/service-workers/service-workers-configuration";
import {fireJustClientSide, runInDevEnvOnly} from "@/core/global-utils";
import {workersFileNames, workersKeysNames} from "@/features/service-workers/add-new-worker-here";
import {ThisExpression} from "@babel/types";


const isTheWorkerEnvCorrect = (): boolean => 'serviceWorker' in window.navigator ? true : runInDevEnvOnly(() => console.error('Service workers are not supported.'))

const checkIsWorkerRunSuccessfully = (workerName: TWorkerKeyNames): void => window[workerName].postMessage(`Test message to [ ${workerName} ].`)

const registerWorker = (workerName: TWorkerKeyNames = 'correctnessWorker', fileName: TWorkersFileNames = 'correctness-of-serviceability-worker.js') => {
	runInDevEnvOnly(() => console.log('Trying to install: ' + fileName))

	navigator.serviceWorker.register(`/${fileName}`)
		.then(function (registration: ServiceWorkerRegistration) {
			registration.addEventListener('updatefound', function () {
				// If updatefound is fired, it means that there's
				// a new service worker being installed.
				const installingWorker = registration.installing;

				runInDevEnvOnly(() => console.log('A new service worker is being installed: ' + installingWorker.scriptURL))


				// You can listen for changes to the installing service worker's
				// state via installingWorker.onstatechange
			});
		})
		.catch((error) => {
			runInDevEnvOnly(() => console.error('Service worker registration failed: ' + error))
		});

	window[workerName] = new Worker(`/${fileName}`)
}

const receiveWorkerMessages = (workerName: TWorkerKeyNames) => {
	runInDevEnvOnly(() => console.log(`Worker [ ${workerName} ]: Activating a messages subscription...`))
	window[workerName].addEventListener('message', ({data}) => {
		// temp
		// console.log("PRZYSZłO Z SW DO HANDLERA: ", data)
	})
}

export const subscribeWorkerMessages = (workerName: TWorkerKeyNames, callback: Function) => {
	window[workerName].addEventListener('message', callback)
	return () => window[workerName].removeEventListener('message', callback)
}

const initAllWorkers = () => workersKeysNames.forEach((workerName: TWorkerKeyNames, i: number): void => {
	fireJustClientSide(() => {

		if (!isTheWorkerEnvCorrect()) return null
		registerWorker(workerName, workersFileNames[i])
		// receiveWorkerMessages(workerName)
		checkIsWorkerRunSuccessfully(workerName)
	})
})

export const queueWorkerTask = (workerKeyName: TWorkerKeyNames, workerTaskName: TWorkerTasks, context: ThisExpression, msgForConsoleLog: string = '') => {
	window[workerKeyName].postMessage(getWorkerTaskCommand(workerTaskName))
	return runInDevEnvOnly(() => console.log.bind(context, `*dev log* Worker command queued: [ ${workerTaskName} ]. ${!!msgForConsoleLog ? msgForConsoleLog : ''}`))
}


export default initAllWorkers
