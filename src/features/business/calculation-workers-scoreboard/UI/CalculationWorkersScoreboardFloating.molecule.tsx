import React, { useState } from 'react'
import scss from './CalculationWorkersScoreboard.module.scss'
import {
    NamedWorkerReadyStatusType,
    NamedWorkerWorkStatusType,
    WorkerNameType,
    WorkersAmountStateType,
    WorkersJobsType
} from '@/features/technical/web-workers-configuration/webWorkers.types'
import { DraggableWindowComposition } from '@/layout/compositions/draggable-window/DraggableWindow.composition'
import { useAppSelector } from '@/core/store.core'
import {
    selectActuallyWorkingWorkersAmount,
    selectRequestedWorkersAmount,
    selectWholeWorkersReadyState,
    selectWholeWorkersWorkState
} from '@/features/technical/web-workers-configuration/webWorkersSlice'
import { selectLastSocketResponseData } from '@/features/technical/socket-client/socketSlice'
import { MAIN_THREAD_KEY } from '@/app-config-constants'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/SystemComponentVisibility/SystemComponentVisibility.composition'



const CalculationWorkersScoreboardFloatingMolecule = (): JSX.Element => {

    // Instant get a requested amount of web-workers-configuration
    //
    const workerRequestedAmount: WorkersAmountStateType = useAppSelector(selectRequestedWorkersAmount)


    // Listening to worker's READY state
    //
    const allWorkersReadyStatuses: NamedWorkerReadyStatusType = useAppSelector(selectWholeWorkersReadyState)


    // Listening to worker's WORK state
    //
    const allWorkersWorkStatuses: NamedWorkerWorkStatusType = useAppSelector(selectWholeWorkersWorkState)
    const allActuallyWorkWorkersAmount: WorkersAmountStateType = useAppSelector(selectActuallyWorkingWorkersAmount)


    // Listening to messages stream from a Socket
    //
    const receivedSocketResponse: WorkersJobsType = useAppSelector(selectLastSocketResponseData)


    const [shouldShowDeactivated, setShouldShowDeactivated] = useState(false)


    const workerHasResponseData = (workerName: WorkerNameType) => receivedSocketResponse && receivedSocketResponse[workerName]


    return (
        <SystemComponentVisibilityComposition visibilityOfSystemComponentControl={'scoreboard'}>
            <DraggableWindowComposition
                componentUITitleBarName={'Scoreboard'}
                switchVisibilityConfiguration={{name: 'scoreboard', visibilitySwitchState: false}}
                onTheScreenPosition={{x: 50, y: 70}}
                zIndex={1900}
            >
                <section
                    className={`${scss.host} display-inline-block`}>
                    <h4>Calculation results:</h4> <span>Show all, even currently deactivated: </span><input
                        type={'checkbox'} checked={shouldShowDeactivated}
                        onChange={(event => setShouldShowDeactivated(event.currentTarget.checked))}/>


                    <p className={scss.mainThread}>
                        <span>{MAIN_THREAD_KEY.workerName}:</span>

                        <span>{
                            Object.keys(receivedSocketResponse)
                                .map((workerName: WorkerNameType) =>
                                    workerName === MAIN_THREAD_KEY.workerName && String(receivedSocketResponse[workerName].amount))
                        }</span>

                    </p>

                    <h3>Required number of workers: {workerRequestedAmount.amount}</h3>

                    <h5>Workers who actually work: {allActuallyWorkWorkersAmount.amount}</h5>

                    <ol className={[scss.listGrid, (() => (shouldShowDeactivated || workerRequestedAmount.amount > 0) ? '' : 'display-none')()].join(' ')}>

                        {Object.keys(allWorkersReadyStatuses)
                            .filter((workerName: WorkerNameType) => { // showDeactivated checkbox handling here
                                if (shouldShowDeactivated) {
                                    return true
                                } else {
                                    return allWorkersReadyStatuses[workerName].ready
                                }
                            })
                            .map((workerName: WorkerNameType, index) =>
                                <li key={index} className={[scss.worker].join(' ')}>

                                    <span className={scss.smallAndBoldHeading}>

                                        <span className={scss.labelInfo}>
                                            {workerName} {allWorkersReadyStatuses[workerName].ready ?
                                                <strong>Ready!</strong> :
                                                <span>OFF</span>
                                            }
                                        </span>

                                    </span>


                                    <ul className={scss.listReset}>
                                        <li className={(() => allWorkersWorkStatuses[workerName]?.working ? '' : scss.labelInfo)()}>

                                            {workerHasResponseData(workerName) &&
                                            <strong>[{String(receivedSocketResponse[workerName].amount)}] </strong>
                                            }

                                            <span>
                                                {!workerHasResponseData(workerName) ?
                                                    'No work yet' :
                                                    'Already made'
                                                }
                                            </span>

                                        </li>

                                    </ul>
                                </li>
                            )}

                    </ol>
                </section>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default CalculationWorkersScoreboardFloatingMolecule
