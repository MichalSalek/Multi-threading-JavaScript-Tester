import React, {useCallback, useEffect, useMemo, useState} from 'react'
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
import AppButtonAtom from '@/features/building/_shared-components/AppButton.atom'
import {
    getExistingWorkersKeys,
    queueAllWorkersTask,
    queueWorkerTask
} from '@/features/background/web-workers/webWorkers.api'
import {ButtonGroup, CircularProgress, Stack, Typography} from '@mui/material'
import { IWorkerKey } from '@/features/background/web-workers/webWorkers.types'



const WorkersGlobalWorkControlWindowMolecule = (): JSX.Element => {

    const workersComplexity = useAppSelector(selectWholeWorkersComplexityState)

    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    const isAllOfWorkersWorking = useAppSelector(selectIsAllOfWorkersWorking)


    const [workCommandLoader, setWorkCommandLoader] = useState(false)
    const [stopCommandLoader, setStopCommandLoader] = useState(false)

    useEffect(() => {
        isAllOfWorkersWorking && setWorkCommandLoader(false)
        !isAnyWorkerWorking && setStopCommandLoader(false)
    }, [setWorkCommandLoader, setStopCommandLoader, isAllOfWorkersWorking, isAnyWorkerWorking])


    const handleAllWorkersWorkCommand = useCallback(() => {
        const activeWorkersByNow: IWorkerKey[] = getExistingWorkersKeys()

        setWorkCommandLoader(true)

        activeWorkersByNow.forEach((workerKey: IWorkerKey) => {
            queueWorkerTask(workerKey, {
                workerTaskName: 'task__calculations_on',
                complexity: workersComplexity[workerKey.workerName].complexity
            }, `Turning on a work switch at the "${workerKey.workerName}"`)
        })

    }, [workersComplexity])

    const handleAllWorkersStopCommand = useCallback(() => {

        setStopCommandLoader(true)

        queueAllWorkersTask('calculation-worker.js', {workerTaskName: 'task__calculations_off'})
    }, [])


    const defaultOnTheScreenPosition = useMemo(() => ({x: 50, y: 70}), [])

    return (
        <SystemComponentVisibilityComposition visibilityOfSystemComponentControl={'workControl'}>
            <DraggableWindowComposition
                componentUITitleBarName={'All workers control'}
                switchVisibilityConfiguration={{name: 'workControl', visibilitySwitchState: false}}
                onTheScreenPosition={defaultOnTheScreenPosition}
                zIndex={1900}
            >
                <Stack
                    minWidth={'300px'}
                    className={`${scss.host} display-inline-block`}>

                    <Typography variant={'body2'} paddingBottom={1}>
                        Global control switch:
                    </Typography>

                    <ButtonGroup fullWidth={true} size={'small'}>
                        <AppButtonAtom
                            color={'success'}
                            onClick={handleAllWorkersWorkCommand}
                            disabled={isAllOfWorkersWorking}>
                            {workCommandLoader ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            ) : <span>START ALL</span>}
                        </AppButtonAtom>
                        <AppButtonAtom
                            color={'warning'}
                            onClick={handleAllWorkersStopCommand}
                            disabled={!isAnyWorkerWorking}>
                            {stopCommandLoader ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            ) : <span>STOP ALL</span>}
                        </AppButtonAtom>
                    </ButtonGroup>

                </Stack>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default WorkersGlobalWorkControlWindowMolecule
