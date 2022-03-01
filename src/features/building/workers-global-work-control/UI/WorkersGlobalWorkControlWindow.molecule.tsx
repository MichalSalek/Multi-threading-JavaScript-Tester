import React, { useCallback, useMemo } from 'react'
import scss from './workersGlobalWorkControl.module.scss'
import { DraggableWindowComposition } from '@/layout/compositions/draggable-window/DraggableWindow.composition'
import { useAppSelector } from '@/core/store.core'
import {
    selectIsAllOfWorkersWorking,
    selectIsAnyWorkerWorking,
    selectWholeWorkersComplexityState
} from '@/features/background/web-workers/webWorkersSlice'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/system-component-visibility/SystemComponentVisibility.composition'
import AppButtonAtom from '@/app-components/AppButton.atom'
import {
    getExistingWorkersKeys,
    queueAllWorkersTask,
    queueWorkerTask
} from '@/features/background/web-workers/webWorkers.api'
import { ButtonGroup } from '@mui/material'
import { IWorkerKey } from '@/features/background/web-workers/webWorkers.types'



const WorkersGlobalWorkControlWindowMolecule = (): JSX.Element => {

    const workersComplexity = useAppSelector(selectWholeWorkersComplexityState)

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isAllOfWorkersWorking = useAppSelector(selectIsAllOfWorkersWorking)


    const handleAllWorkersWorkCommand = useCallback(() => {
        const activeWorkersByNow: IWorkerKey[] = getExistingWorkersKeys()

        activeWorkersByNow.forEach((workerKey: IWorkerKey) => {
            queueWorkerTask(workerKey, {
                workerTaskName: 'task__calculations_on',
                complexity: workersComplexity[workerKey.workerName].complexity
            }, `Turning on a work switch at the "${workerKey.workerName}"`)
        })

    }, [workersComplexity])


    const defaultOnTheScreenPosition = useMemo(() => ({x: 50, y: 70}), [])

    return (
        <SystemComponentVisibilityComposition visibilityOfSystemComponentControl={'workControl'}>
            <DraggableWindowComposition
                componentUITitleBarName={'All workers control'}
                switchVisibilityConfiguration={{name: 'workControl', visibilitySwitchState: false}}
                onTheScreenPosition={defaultOnTheScreenPosition}
                zIndex={1900}
            >
                <section
                    className={`${scss.host} display-inline-block`}>

                    <ButtonGroup>
                        <AppButtonAtom
                            onClick={handleAllWorkersWorkCommand}
                            disabled={isAllOfWorkersWorking}>
                            <span>MAKE THEM ALL WORK</span>
                        </AppButtonAtom>
                        <AppButtonAtom
                            onClick={() => queueAllWorkersTask('calculation-worker.js', {workerTaskName: 'task__calculations_off'})}
                            disabled={!isAnyWorkerWorking}>
                            <span>STOP ALL WORKERS</span>
                        </AppButtonAtom>
                    </ButtonGroup>

                </section>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default WorkersGlobalWorkControlWindowMolecule
