import React from 'react'
import scss from './WorkersGlobalWorkControl.module.scss'
import { DraggableWindowComposition } from '@/layout/compositions/draggable-window/DraggableWindow.composition'
import { useAppSelector } from '@/core/store.core'
import {
    selectIsAllOfWorkersWorking,
    selectIsAnyWorkerWorking
} from '@/features/background/web-workers-configuration/webWorkersSlice'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/SystemComponentVisibility/SystemComponentVisibility.composition'
import AppButtonAtom from '@/app-components/AppButton.atom'
import { queueAllWorkersTask } from '@/features/background/web-workers-configuration/webWorkers.api'



const WorkersGlobalWorkControlMolecule = (): JSX.Element => {

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isAllOfWorkersWorking = useAppSelector(selectIsAllOfWorkersWorking)

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

                </section>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default WorkersGlobalWorkControlMolecule
