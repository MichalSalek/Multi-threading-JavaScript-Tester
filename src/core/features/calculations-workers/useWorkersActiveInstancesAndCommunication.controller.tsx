import {useEffect, useRef} from 'react'
import {
    flagIfWorkerIsWorking,
    getCalculationWorkerKeyByName,
    getCalculationWorkerNameByOrderIndex,
    getReadyStatesCalculationWorkersKeys
} from '@/core/features/calculations-workers/calculationsWorkers.api'
import {CalculationWorkerDTO, WorkerToSocketDTO} from '@/core/features/calculations-workers/calculationsWorkers.types'
import {WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS} from '@/core/config.core'
import store, {useAppSelector} from '@/application/store/store'
import {CalculationWorkersSlice} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {selectSocketIsActive} from '@/application/socket-client/socket.slice'
import {WEB_SOCKET_EVENTS_TRIGGERS} from '@/application/socket-client/socketEventsEntities'
import {fireClientSide} from '@/utils/environmentOperations.api'
import {isUndefinedType} from '@/utils/typeOperations.api'
import {addConsoleVerbose} from '@/application/logger/logger.api'
import {sendCommandMessageToSocket} from '@/application/socket-client/socket.api'
import {WorkersPolicy} from '../../../../shared-policies/workers.policy'
import {
    WorkerKey,
    WorkerKeyType,
    WorkerLifeSwitchCommandEnum,
    WorkerName,
    WorkersAmount,
    WorkerTriggerMessageCommandEnum
} from '@/application/workers/workers.types'
import {
    constructWorkerJobToSocketDTO,
    flagIfWorkerHasError,
    getWorkerInstanceAbsolutely,
    getWorkerRealActivityStatus,
    queueWorkerTask,
    updateWorkerIsReadyState
} from '@/application/workers/workers.api'
import {selectRequestedWorkersAmount, WorkersSlice} from '@/application/workers/workers.slice'
import {WORKER_COMMANDS} from '@/application/workers/workersCommandsList'



const captureAndProcessPureWorkerMessage = (event: MessageEvent<CalculationWorkerDTO>, workerKey: WorkerKeyType) => {
    flagIfWorkerIsWorking(workerKey, event.data.working)

    const dataToEmit: WorkerToSocketDTO<CalculationWorkerDTO> = constructWorkerJobToSocketDTO<CalculationWorkerDTO>(event, workerKey)

    sendCommandMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, dataToEmit)
}



const sendTriggerMessageToWorker = (workerKey: WorkerKeyType, command: WorkerTriggerMessageCommandEnum): void => {
    const currentWorker = getWorkerInstanceAbsolutely(workerKey)

    if (command === WorkerTriggerMessageCommandEnum.activate) {

        currentWorker ?
            queueWorkerTask(workerKey, {workerTaskName: WORKER_COMMANDS.triggerActivationMessage},
                `Sending an activation message to: "${workerKey.workerName}"...`) :
            addConsoleVerbose(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`, 'error')


    } else if (command === WorkerTriggerMessageCommandEnum.kill) {

        currentWorker ?
            queueWorkerTask(workerKey, {workerTaskName: WORKER_COMMANDS.killWorker},
                `Sending a kill trigger message to: "${workerKey.workerName}"...`) :
            addConsoleVerbose(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`, 'error')
    }
}



// Absolutely addOne or removeLast selected worker.
//
const workerLifeSwitch = (workerKey: WorkerKeyType, command: WorkerLifeSwitchCommandEnum): Promise<void> => new Promise<void>((resolve, reject) => {

    if (command === WorkerLifeSwitchCommandEnum.install) {
        addConsoleVerbose(`Installing worker "${workerKey.fileName}" and pinning it to "window.${workerKey.workerName}"...`)


        if (!workerKey.fileName)
            addConsoleVerbose('Missing filename for installation attempt of: ' + workerKey, 'error')

        const install = () => {
            window[workerKey.workerName] = new Worker(`/${workerKey.fileName}`)
            sendTriggerMessageToWorker(workerKey, WorkerTriggerMessageCommandEnum.activate)
            getWorkerInstanceAbsolutely(workerKey).addEventListener('message', (event: MessageEvent<CalculationWorkerDTO>) =>
                captureAndProcessPureWorkerMessage(event, workerKey))
        }
        install()

        // Finally, check the Worker's actual status to be assured, then confirm it back.
        getWorkerRealActivityStatus(workerKey.workerName) ? resolve() : reject({
            name: workerKey.workerName,
            message: 'Installation failed.'
        })


    } else if (command === WorkerLifeSwitchCommandEnum.uninstall) {
        addConsoleVerbose(`Deleting worker "window.${workerKey.workerName}"...`)

        const uninstall = () => {
            sendTriggerMessageToWorker(workerKey, WorkerTriggerMessageCommandEnum.kill)
            getWorkerInstanceAbsolutely(workerKey).removeEventListener('message', (event: MessageEvent<CalculationWorkerDTO>) =>
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



const controlAmountOfActiveWorkerInstances = (requestedNumberOfWorkers: WorkersAmount): void => {
    const existingWorkersKeyNames: WorkerKey[] = getReadyStatesCalculationWorkersKeys()


    // If requested calculations-workers amount:
    //
    if (requestedNumberOfWorkers > existingWorkersKeyNames.length) {
    // ...is higher - increase a real calculations-workers amount by adding more instances.

        for (let index = 0; index < requestedNumberOfWorkers; index++) {
            const workerKeyOfRequestedWorker = getCalculationWorkerKeyByName(getCalculationWorkerNameByOrderIndex(index + 1))

            if (!existingWorkersKeyNames.length || !(existingWorkersKeyNames.some((existingWorkerKey: WorkerKey) => {
                return workerKeyOfRequestedWorker.workerName === existingWorkerKey.workerName
            }))) {

                workerLifeSwitch(workerKeyOfRequestedWorker, WorkerLifeSwitchCommandEnum.install)
                    .then(() => updateWorkerIsReadyState(workerKeyOfRequestedWorker) && flagIfWorkerHasError(workerKeyOfRequestedWorker, false))
                    .catch((error: Error) => flagIfWorkerHasError(workerKeyOfRequestedWorker, true, error))
            }

        }

    } else if (requestedNumberOfWorkers < existingWorkersKeyNames.length) {
    // ...is lower - removeLast one or few last instances.

        for (let index = existingWorkersKeyNames.length; requestedNumberOfWorkers < index; index--) {
            const workerKeyOfRequestedWorker = getCalculationWorkerKeyByName(getCalculationWorkerNameByOrderIndex(index))

            workerLifeSwitch(workerKeyOfRequestedWorker, WorkerLifeSwitchCommandEnum.uninstall)
                .then(() => updateWorkerIsReadyState(workerKeyOfRequestedWorker)
          && flagIfWorkerHasError(workerKeyOfRequestedWorker, false)
          && flagIfWorkerIsWorking(workerKeyOfRequestedWorker, false))
                .catch((error: Error) => flagIfWorkerHasError(workerKeyOfRequestedWorker, true, error))
        }
    }

    // If both amounts (requested with a real one) are equals - nothing to do here - it's fine.
    return void undefined
}



const setReduxDefaultValuesForWorker = (workerKey: WorkerKeyType): void => {

    const calculationWorkersSlice: CalculationWorkersSlice = store.getState().calculationWorkersSlice
    const workersSlice: WorkersSlice = store.getState().workersSlice

    isUndefinedType(workersSlice.readyStatuses[workerKey.workerName]?.ready) && updateWorkerIsReadyState(workerKey)
    isUndefinedType(calculationWorkersSlice.workStatuses[workerKey.workerName]?.working) && flagIfWorkerIsWorking(workerKey, false)
    isUndefinedType(workersSlice.errorStatuses[workerKey.workerName]?.error) && flagIfWorkerHasError(workerKey, false)
}



// Single dependency controller - just the quantity requested.
//
const useWorkersActiveInstancesAndCommunicationController = (): void => {

    // Check is socket connection is OK
    //
    const isSocketActive: boolean = useAppSelector(selectSocketIsActive)

    // Requested from components, a number of calculations-workers
    //
    const requestedNumberOfWorkers: WorkersAmount = useAppSelector(selectRequestedWorkersAmount)

    // Interval ID var - for debounce
    //
    const intervalID = useRef<number>(0)


    useEffect(() => {
        if (!isSocketActive) return () => undefined

        fireClientSide(() => {

            window.clearTimeout(intervalID.current)
            intervalID.current = window.setTimeout(() =>
                controlAmountOfActiveWorkerInstances(requestedNumberOfWorkers)
            , WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS)

        })
    }, [isSocketActive, requestedNumberOfWorkers])


    useEffect(() => {
        if (!isSocketActive) return () => undefined

        const fillReduxStoreWithDefaultMaxWorkersAmount = () => {
            for (let index = 1; index <= WorkersPolicy.MAX_WORKERS_LIMIT; index++) {
                const workerName: WorkerName = getCalculationWorkerNameByOrderIndex(index)
                const workerKey: WorkerKeyType = getCalculationWorkerKeyByName(workerName)

                setReduxDefaultValuesForWorker(workerKey)
            }
        }
        fillReduxStoreWithDefaultMaxWorkersAmount()

    }, [isSocketActive])
}

export default useWorkersActiveInstancesAndCommunicationController
