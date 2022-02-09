import React, { useEffect, useRef } from 'react'
import {
    constructCalculationWorkerKeyByName,
    constructWorkerJobSocketDTO,
    constructWorkerNameByOrderIndex,
    flagIfWorkerHasError,
    flagIfWorkerIsWorking,
    getExistingWorkersKeys,
    getWorkerInstanceAbsolutely,
    getWorkerRealActivityStatus,
    queueWorkerTask,
    updateWorkerIsReadyState
} from '@/features/background/web-workers-configuration/webWorkers.api'
import {
    ISocketDTO,
    IWorkerDTO,
    IWorkerKey,
    WorkerKeyType,
    WorkerLifeSwitchCommandEnum,
    WorkerNameType,
    WorkersAmountStateType,
    WorkerTriggerMessageCommandEnum
} from '@/features/background/web-workers-configuration/webWorkers.types'
import { MAX_WORKERS_LIMIT, WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS } from '@/app-config-constants'
import store, { useAppSelector } from '@/core/store.core'
import {
    IWorkersSlice,
    selectRequestedWorkersAmount
} from '@/features/background/web-workers-configuration/webWorkersSlice'
import { WEB_WORKER_TASKS } from '@/features/background/web-workers-configuration/webWorkersEvents'
import { selectSocketIsActive } from '@/features/background/socket-client/socketSlice'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'
import { isUndefinedType } from '@/coding-utils/typeOperations.api'
import { addConsoleVerbose } from '@/features/background/verbose-logs/verboseLogs.api'
import { sendTriggerMessageToSocket } from '@/features/background/socket-client/socket.api'



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
            addConsoleVerbose(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`, 'error')


    } else if (command === WorkerTriggerMessageCommandEnum.kill) {

        currentWorker ?
            queueWorkerTask(workerKey, {workerTaskName: WEB_WORKER_TASKS.killWorker},
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
        addConsoleVerbose(`Deleting worker "window.${workerKey.workerName}"...`)

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



const controlAmountOfActiveWorkerInstances = (requestedNumberOfWorkers: WorkersAmountStateType): void => {
    const existingWorkersKeyNames: IWorkerKey[] = getExistingWorkersKeys()


    // If requested web-workers-configuration amount:
    //
    if (requestedNumberOfWorkers.amount > existingWorkersKeyNames.length) {
        // ...is higher - increase a real web-workers-configuration amount by adding more instances.

        for (let index = 0; index < requestedNumberOfWorkers.amount; index++) {
            const workerKeyOfRequestedWorker = constructCalculationWorkerKeyByName(constructWorkerNameByOrderIndex(index + 1))

            if (!existingWorkersKeyNames.length || !(existingWorkersKeyNames.some((existingWorkerKey: IWorkerKey) => {
                return workerKeyOfRequestedWorker.workerName === existingWorkerKey.workerName
            }))) {

                workerLifeSwitch(workerKeyOfRequestedWorker, WorkerLifeSwitchCommandEnum.install)
                    .then(() => updateWorkerIsReadyState(workerKeyOfRequestedWorker) && flagIfWorkerHasError(workerKeyOfRequestedWorker, false))
                    .catch((error: Error) => flagIfWorkerHasError(workerKeyOfRequestedWorker, true, error))
            }

        }

    } else if (requestedNumberOfWorkers.amount < existingWorkersKeyNames.length) {
        // ...is lower - removeLast one or few last instances.

        for (let index = existingWorkersKeyNames.length; requestedNumberOfWorkers.amount < index; index--) {
            const workerKeyOfRequestedWorker = constructCalculationWorkerKeyByName(constructWorkerNameByOrderIndex(index))

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

    const workersSlice: IWorkersSlice = store.getState().calculationsWorkersSlice

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

    // Requested from building, a number of web-workers-configuration
    //
    const requestedNumberOfWorkers: WorkersAmountStateType = useAppSelector(selectRequestedWorkersAmount)

    // Interval ID var - for debounce
    //
    const intervalID = useRef<number>(0)


    useEffect(() => {
        if (!isSocketActive) return () => undefined

        fireJustClientSide(() => {

            window.clearTimeout(intervalID.current)
            intervalID.current = window.setTimeout(() =>
                controlAmountOfActiveWorkerInstances(requestedNumberOfWorkers)
            , WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS)

        })
        return () => undefined
    }, [isSocketActive, requestedNumberOfWorkers])


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
