import React, {useMemo, useState} from 'react'
import scss from './workersScoreboard.module.scss'
import {
    NamedWorkerWorkStatusType
} from '@/core/features/calculations-workers/calculationsWorkers.types'
import {DraggableWindowComposition} from '@/core/layout/compositions/draggable-window/DraggableWindow.composition'
import {useAppSelector} from '@/application/store/store'
import {
    selectActuallyWorkingWorkersAmount,
    selectWholeWorkersWorkState
} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {selectLastReceivedClientBrowserWorkerJobsData} from '@/application/socket-client/socket.slice'
import SystemComponentVisibilityComposition
    from '@/core/layout/compositions/system-component-visibility/SystemComponentVisibility.composition'
import {Switch} from '@mui/material'
import {WorkerJobsTypeDTO} from '../../../../../../../../src-backend/features/db/db.types'
import {WorkersPolicy} from '../../../../../../../../shared-policies/workers.policy'
import {selectRequestedWorkersAmount, selectWholeWorkersReadyState} from '@/application/workers/workers.slice'
import {NamedWorkerReadyStatusType, WorkerName, WorkersAmount} from '@/application/workers/workers.types'



const WorkersScoreboardWindowMolecule = (): JSX.Element => {

    // Instant get a requested amount of calculations-workers
    //
    const workerRequestedAmount: WorkersAmount = useAppSelector(selectRequestedWorkersAmount)


    // Listening to worker's READY state
    //
    const allWorkersReadyStatuses: NamedWorkerReadyStatusType = useAppSelector(selectWholeWorkersReadyState)


    // Listening to worker's WORK state
    //
    const allWorkersWorkStatuses: NamedWorkerWorkStatusType = useAppSelector(selectWholeWorkersWorkState)
    const allActuallyWorkWorkersAmount: WorkersAmount = useAppSelector(selectActuallyWorkingWorkersAmount)


    // Listening to messages stream from a Socket
    //
    const receivedSocketResponse: WorkerJobsTypeDTO = useAppSelector(selectLastReceivedClientBrowserWorkerJobsData)


    const [shouldShowDeactivated, setShouldShowDeactivated] = useState(false)


    const workerHasResponseData = (workerName: WorkerName) => receivedSocketResponse && receivedSocketResponse[workerName]


    const defaultOnTheScreenPosition = useMemo(() => ({x: 50, y: 160}), [])

    return (
        <SystemComponentVisibilityComposition
            visibilityOfSystemComponentControl={'scoreboard'}>
            <DraggableWindowComposition
                componentUITitleBarName={'Calculation results'}
                switchVisibilityConfiguration={{name: 'scoreboard', visibilitySwitchState: false}}
                onTheScreenPosition={defaultOnTheScreenPosition}
                zIndex={1900}
            >
                <section
                    className={`${scss.host} display-inline-block`}>

                    <span>Show all, even currently deactivated: </span>


                    <Switch
                        size={'small'}
                        color={'warning'}
                        checked={shouldShowDeactivated}
                        onChange={(event => setShouldShowDeactivated(event.currentTarget.checked))}
                        inputProps={{'aria-label': 'controlled'}}
                    />

                    <p>
                        <span>{WorkersPolicy.MAIN_THREAD_KEY.workerName} done: </span>

                        <span>{
                            Object.keys(receivedSocketResponse)
                                .map((workerName: WorkerName) =>
                                    workerName === WorkersPolicy.MAIN_THREAD_KEY.workerName && String(receivedSocketResponse[workerName]))
                        }</span>

                    </p>

                    <p>Required number of workers: {workerRequestedAmount}</p>

                    <p>Workers who actually work: {allActuallyWorkWorkersAmount}</p>

                    <ul
                        className={[scss.listGrid, (() => (shouldShowDeactivated || workerRequestedAmount > 0) ? '' : 'display-none')()].join(' ')}>

                        {Object.keys(allWorkersReadyStatuses)

                            .filter((workerName: WorkerName) => {
                                if (shouldShowDeactivated) {
                                    return true
                                } else {
                                    return allWorkersReadyStatuses[workerName].ready
                                }
                            })

                            .map((workerName: WorkerName, index) =>
                                <li key={index} className={[scss.worker].join(' ')}>

                                    <ul>
                                        <li className={[
                                            scss.labelInfo,
                                            (() => allWorkersWorkStatuses[workerName].working ? scss.activeLabel : '')()].join(' ')}>


                                            <span>[{index + 1} - {allWorkersReadyStatuses[workerName].ready ?
                                                <strong>{allWorkersWorkStatuses[workerName].working ? 'Working' : 'Ready!'}</strong> :
                                                <span>OFF</span>
                                            }]</span>

                                        </li>

                                    </ul>

                                    <span className={scss.smallAndBoldHeading}>


                                        <span>
                                            {!workerHasResponseData(workerName) ?
                                                'No work yet ' :
                                                'Already done: '
                                            }
                                        </span>


                                        {workerHasResponseData(workerName) &&
                      <strong>{String(receivedSocketResponse[workerName])} </strong>
                                        }

                                    </span>


                                </li>
                            )}

                    </ul>
                </section>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default WorkersScoreboardWindowMolecule
