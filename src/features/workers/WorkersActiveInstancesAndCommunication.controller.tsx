import React, {useEffect, useRef} from 'react'
import {
	constructCalculationWorkerKeyByName,
	constructWorkerJobSocketDTO,
	constructWorkerNameByOrderIndex,
	flagIfWorkerHasError,
	updateWorkerIsReadyState,
	flagIfWorkerIsWorking,
	getExistingWorkersKeys,
	getWorkerInstanceAbsolutely,
	getWorkerRealActivityStatus,
	queueWorkerTask
} from '@/features/workers/workers.api'
import {
	ISocketDTO,
	IWorkerDTO,
	IWorkerKey,
	WorkerKeyType,
	WorkerLifeSwitchCommandEnum,
	WorkerNameType,
	WorkersAmountStateType,
	WorkerTriggerMessageCommandEnum
} from '@/features/workers/workers.types'
import {
	fireJustClientSide,
	isUndefinedType,
	MAX_WORKERS_LIMIT,
	runInDevEnvOnly,
	WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS
} from '@/utils-and-constants.core'
import store, {useAppSelector} from '@/core/store.core'
import {IWorkersSlice, selectExpectedWorkersAmount} from '@/features/workers/workersSlice'
import {selectSocketIsActive} from '@/features/socket-client/socketSlice'
import {WEB_WORKER_TASKS} from '@/features/workers/workers-events'
import {WEB_SOCKET_EVENTS_TRIGGERS} from '@/features/socket-client/socketEventsEntities'
import {sendTriggerMessageToSocket} from '@/features/socket-client/socket.api'



const captureAndProcessPureWorkerMessage = (event: MessageEvent<IWorkerDTO>, workerKey: WorkerKeyType) => {
	flagIfWorkerIsWorking(workerKey, event.data.working)

	const dataToEmit: ISocketDTO<IWorkerDTO> = constructWorkerJobSocketDTO<IWorkerDTO>(event, workerKey)
	sendTriggerMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, dataToEmit)
}


const sendTriggerMessageToWorker = (workerKey: WorkerKeyType, command: WorkerTriggerMessageCommandEnum): void => {
	const currentWorker = getWorkerInstanceAbsolutely(workerKey)

	if (command === WorkerTriggerMessageCommandEnum.activate) {

		currentWorker ?
			queueWorkerTask(workerKey, {workerTaskName: WEB_WORKER_TASKS.triggerActivationMessage},
				`Sending an activation message to: "${workerKey.workerName}"...`) :
			runInDevEnvOnly(() => console.error(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`))


	} else if (command === WorkerTriggerMessageCommandEnum.kill) {

		currentWorker ?
			queueWorkerTask(workerKey, {workerTaskName: WEB_WORKER_TASKS.killWorker},
				`Sending a kill trigger message to: "${workerKey.workerName}"...`) :
			runInDevEnvOnly(() => console.error(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`))
	}
}


// Absolutely addOne or removeLast selected worker.
//
const workerLifeSwitch = (workerKey: WorkerKeyType, command: WorkerLifeSwitchCommandEnum): Promise<void> => new Promise<void>((resolve, reject) => {

	if (command === WorkerLifeSwitchCommandEnum.install) {
		runInDevEnvOnly(() =>
			console.log(`Installing worker "${workerKey.fileName}" and pinning it to "window.${workerKey.workerName}"...`))

		if (!workerKey.fileName)
			runInDevEnvOnly(() => console.error('Missing filename for installation attempt of: ', workerKey))

		const install = () => {
			window[workerKey.workerName] = new Worker(`/${workerKey.fileName}`)
			sendTriggerMessageToWorker(workerKey, WorkerTriggerMessageCommandEnum.activate)
			getWorkerInstanceAbsolutely(workerKey).addEventListener('message', (event: MessageEvent<IWorkerDTO>) =>
				captureAndProcessPureWorkerMessage(event, workerKey))
		}
		install()

		// Finally, check the Worker's actual status to be assured, then confirm it back.
		getWorkerRealActivityStatus(workerKey.workerName) ? resolve() : reject({
			name: workerKey.workerName,
			message: 'Installation failed.'
		})


	} else if (command === WorkerLifeSwitchCommandEnum.uninstall) {
		runInDevEnvOnly(() => console.log(`Deleting worker "window.${workerKey.workerName}"...`))

		const uninstall = () => {
			sendTriggerMessageToWorker(workerKey, WorkerTriggerMessageCommandEnum.kill)
			getWorkerInstanceAbsolutely(workerKey).removeEventListener('message', (event: MessageEvent<IWorkerDTO>) =>
				captureAndProcessPureWorkerMessage(event, workerKey))
			getWorkerInstanceAbsolutely(workerKey).terminate() // To avoid memory leaks caused of a time intervals.
			delete window[workerKey.workerName]
		}
		uninstall()

		// Finally, check the Worker's actual status to be assured, then confirm it back.
		!getWorkerRealActivityStatus(workerKey.workerName) ? resolve() : reject({
			name: workerKey.workerName,
			message: 'Uninstallation failed.'
		})
	}
})


const controlAmountOfActiveWorkerInstances = (expectedNumberOfWorkers: WorkersAmountStateType): void => {
	const existingWorkersKeyNames: IWorkerKey[] = getExistingWorkersKeys()


	// If expected workers amount:
	//
	if (expectedNumberOfWorkers.amount > existingWorkersKeyNames.length) {
		// ...is higher - increase a real workers amount by adding more instances.

		for (let index = 0; index < expectedNumberOfWorkers.amount; index++) {
			const workerKeyOfExpectedWorker = constructCalculationWorkerKeyByName(constructWorkerNameByOrderIndex(index + 1))

			if (!existingWorkersKeyNames.length || !(existingWorkersKeyNames.some((existingWorkerKey: IWorkerKey) => {
				return workerKeyOfExpectedWorker.workerName === existingWorkerKey.workerName
			}))) {

				workerLifeSwitch(workerKeyOfExpectedWorker, WorkerLifeSwitchCommandEnum.install)
					.then(() => updateWorkerIsReadyState(workerKeyOfExpectedWorker) && flagIfWorkerHasError(workerKeyOfExpectedWorker, false))
					.catch((error: Error) => flagIfWorkerHasError(workerKeyOfExpectedWorker, true, error))
			}

		}

	} else if (expectedNumberOfWorkers.amount < existingWorkersKeyNames.length) {
		// ...is lower - removeLast one or few last instances.

		for (let index = existingWorkersKeyNames.length; expectedNumberOfWorkers.amount < index; index--) {
			const workerKeyOfExpectedWorker = constructCalculationWorkerKeyByName(constructWorkerNameByOrderIndex(index))

			workerLifeSwitch(workerKeyOfExpectedWorker, WorkerLifeSwitchCommandEnum.uninstall)
				.then(() => updateWorkerIsReadyState(workerKeyOfExpectedWorker) && flagIfWorkerHasError(workerKeyOfExpectedWorker, false) && flagIfWorkerIsWorking(workerKeyOfExpectedWorker, false))
				.catch((error: Error) => flagIfWorkerHasError(workerKeyOfExpectedWorker, true, error))
		}
	}

	// If both amounts (expected with a real one) are equals - nothing to do here - it's fine.
	return void undefined
}


const setReduxDefaultValuesForWorker = (workerKey: WorkerKeyType): void => {
	const workersSlice: IWorkersSlice = store.getState().calculationsWorkersSlice

	console.log('wykonanie: setReduxDefaultValuesForWorker')

	isUndefinedType(workersSlice.readyStatuses[workerKey.workerName]?.ready) && updateWorkerIsReadyState(workerKey)
	isUndefinedType(workersSlice.workStatuses[workerKey.workerName]?.working) && flagIfWorkerIsWorking(workerKey, false)
	isUndefinedType(workersSlice.errorStatuses[workerKey.workerName]?.error) && flagIfWorkerHasError(workerKey, false)
}


// Single dependency controller - just the quantity requested.
//
const WorkersActiveInstancesAndCommunicationController = (): JSX.Element => {

	// Check is socket connection is OK
	//
	const isSocketActive: boolean = useAppSelector(selectSocketIsActive)

	// Requested from UI, a number of workers
	//
	const expectedNumberOfWorkers: WorkersAmountStateType = useAppSelector(selectExpectedWorkersAmount)

	// Interval ID var - for debounce
	//
	const intervalID = useRef<number>(0)


	useEffect(() => {
		if (!isSocketActive) return () => undefined

		fireJustClientSide(() => {

			window.clearTimeout(intervalID.current)
			intervalID.current = window.setTimeout(() =>
				controlAmountOfActiveWorkerInstances(expectedNumberOfWorkers)
			, WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS)

		})
		return () => undefined
	}, [isSocketActive, expectedNumberOfWorkers])


	useEffect(() => {
		if (!isSocketActive) return () => undefined

		const fillReduxStoreWithDefaultMaxWorkersAmount = () => {
			for (let index = 1; index <= MAX_WORKERS_LIMIT; index++) {
				const workerName: WorkerNameType = constructWorkerNameByOrderIndex(index)
				const workerKey: WorkerKeyType = constructCalculationWorkerKeyByName(workerName)

				setReduxDefaultValuesForWorker(workerKey)
			}
		}
		fillReduxStoreWithDefaultMaxWorkersAmount()

		return () => undefined
	}, [isSocketActive])


	return <></>
}

export default WorkersActiveInstancesAndCommunicationController
