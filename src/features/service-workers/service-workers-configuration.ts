import {fireJustClientSide} from "@/core/global-utils";
import serviceWorkersHandler from "@/features/service-workers/service-workers-handler";
import {workersFileNames, workersKeysNames} from "@/features/service-workers/add-new-worker-here";


// Worker tasks names with a naming logic
//
export type TWorkerTasks = 'calculations_on'|'calculations_off'|'some_other_thing_to_do'

const workerTaskPrefix = 'task__' // <- important, using is workers also
const generateWorkerCommandNameClosure = (taskName: TWorkerTasks) => {
	return workerTaskPrefix + taskName
}
export const getWorkerTaskCommand = (taskName: TWorkerTasks) => generateWorkerCommandNameClosure(taskName)


// Types and rest of Workers utils
//
export type TWorkerKeyNames = typeof workersKeysNames[number]
export type TWorkersFileNames = typeof workersFileNames[number]


(() => {
	// fireJustClientSide(() => workersKeysNames.forEach((workerName) => window[workerName] = window[workerName] || undefined))

	const checkNamesConfigConformity = () => new Promise((resolve) => workersKeysNames.length === workersFileNames.length && resolve(true))

	checkNamesConfigConformity().then(() => serviceWorkersHandler())
})()