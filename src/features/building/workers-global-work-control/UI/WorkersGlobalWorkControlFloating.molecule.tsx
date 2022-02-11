import React from 'react'
import scss from './WorkersGlobalWorkControl.module.scss'
import { DraggableWindowComposition } from '@/layout/compositions/draggable-window/DraggableWindow.composition'
import { useAppSelector } from '@/core/store.core'
import {
    selectIsAllOfWorkersWorking,
    selectIsAnyWorkerWorking
} from '@/features/background/web-workers-configuration/webWorkersSlice'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/system-component-visibility/SystemComponentVisibility.composition'
import AppButtonAtom from '@/app-components/AppButton.atom'
import { queueAllWorkersTask } from '@/features/background/web-workers-configuration/webWorkers.api'
import { ButtonGroup } from '@mui/material'



const WorkersGlobalWorkControlFloatingMolecule = (): JSX.Element => {

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isAllOfWorkersWorking = useAppSelector(selectIsAllOfWorkersWorking)

    return (
        <SystemComponentVisibilityComposition visibilityOfSystemComponentControl={'workControl'}>
            <DraggableWindowComposition
                componentUITitleBarName={'All workers control'}
                switchVisibilityConfiguration={{name: 'workControl', visibilitySwitchState: false}}
                onTheScreenPosition={{x: 50, y: 70}}
                zIndex={1900}
            >
                <section
                    className={`${scss.host} display-inline-block`}>

                    <ButtonGroup>
                        <AppButtonAtom
                            onClick={() => queueAllWorkersTask({workerTaskName: 'task__calculations_on'})}
                            disabled={isAllOfWorkersWorking}>
                            <span>MAKE THEM ALL WORK</span>
                        </AppButtonAtom>
                        <AppButtonAtom
                            onClick={() => queueAllWorkersTask({workerTaskName: 'task__calculations_off'})}
                            disabled={!isAnyWorkerWorking}>
                            <span>STOP ALL WORKERS</span>
                        </AppButtonAtom>
                    </ButtonGroup>

                </section>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default WorkersGlobalWorkControlFloatingMolecule
