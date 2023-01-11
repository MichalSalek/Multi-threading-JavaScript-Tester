import React, {useMemo, useState} from 'react'
import scss from './workersScoreboard.module.scss'
import {
    NamedWorkerReadyStatusType,
    NamedWorkerWorkStatusType,
    WorkerJobsTypeDTO,
    WorkerNameType,
    WorkersAmountStateType
} from '@/features/background/web-workers/webWorkers.types'
import {DraggableWindowComposition} from '@/layout/compositions/draggable-window/DraggableWindow.composition'
import {useAppSelector} from '@/core/store.core'
import {
    selectActuallyWorkingWorkersAmount, selectIsAnyWorkerWorking,
    selectRequestedWorkersAmount,
    selectWholeWorkersReadyState,
    selectWholeWorkersWorkState
} from '@/features/background/web-workers/webWorkersSlice'
import {selectLastReceivedClientBrowserWorkerJobsData} from '@/features/background/socket-client/socketSlice'
import {MAIN_THREAD_KEY} from '@/core/constants.core'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/system-component-visibility/SystemComponentVisibility.composition'
import {Switch} from '@mui/material'



const WorkersScoreboardWindowMolecule = (): JSX.Element => {

    // Instant get a requested amount of web-workers
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
    const receivedSocketResponse: WorkerJobsTypeDTO = useAppSelector(selectLastReceivedClientBrowserWorkerJobsData)


    const [shouldShowDeactivated, setShouldShowDeactivated] = useState(false)


    const workerHasResponseData = (workerName: WorkerNameType) => receivedSocketResponse && receivedSocketResponse[workerName]


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
                        <span>{MAIN_THREAD_KEY.workerName} done: </span>

                        <span>{
                            Object.keys(receivedSocketResponse)
                                .map((workerName: WorkerNameType) =>
                                    workerName === MAIN_THREAD_KEY.workerName && String(receivedSocketResponse[workerName].amount))
                        }</span>

                    </p>

                    <p>Required number of workers: {workerRequestedAmount.amount}</p>

                    <p>Workers who actually work: {allActuallyWorkWorkersAmount.amount}</p>

                    <ul
                        className={[scss.listGrid, (() => (shouldShowDeactivated || workerRequestedAmount.amount > 0) ? '' : 'display-none')()].join(' ')}>

                        {Object.keys(allWorkersReadyStatuses)

                            .filter((workerName: WorkerNameType) => {
                                if (shouldShowDeactivated) {
                                    return true
                                } else {
                                    return allWorkersReadyStatuses[workerName].ready
                                }
                            })

                            .map((workerName: WorkerNameType, index) =>
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
                      <strong>{String(receivedSocketResponse[workerName].amount)} </strong>
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
