import React, { useCallback, useEffect, useState } from 'react'

import scss from './ControlPanel.module.scss'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import {
    handleControlPanelSwitchVisibility,
    ISystemComponentsVisibilities,
    selectSystemComponentsVisibilities
} from '@/features/control-panel/controlPanelSlice'
import { useControlPanelCollapseStateStoragePersist } from '@/features/browser-storage/browserStorage.hooks'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION } from '@/app-config-and-utils'
import { getStorageItem, setStorageItem } from '@/features/browser-storage/browserStorage.api'



const Y_AXIS_STORAGE_KEY = `${STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION}_controlPanelYAxis`

const ControlPanelMolecule = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const nodeRef = React.createRef<HTMLDivElement>()

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    const [isListCollapsed, setIsListCollapsed] = useControlPanelCollapseStateStoragePersist(false)

    const collapseListHandler = () => setIsListCollapsed((prevVal) => !prevVal)

    const getUIEnabledFeatureClassName = useCallback(
        (featureVisibilityState: boolean): string => featureVisibilityState ? scss.enabledControl : scss.disabledControl, [])

    const [isAlreadyDragged, setIsAlreadyDragged] = useState(false)

    const [YAxisPositionOfControlPanel, setYAxisPositionOfControlPanel] = useState(0)

    useEffect(() => {
        const memoizedValue = getStorageItem(Y_AXIS_STORAGE_KEY)
        if (typeof memoizedValue === 'string') {
            setYAxisPositionOfControlPanel(Number(memoizedValue))
        }
        return () => undefined
    }, [])


    const onStopDragHandler = (event: DraggableEvent, data: DraggableData) => {
        setIsAlreadyDragged(false)
        setYAxisPositionOfControlPanel(data.y)
        setStorageItem(Y_AXIS_STORAGE_KEY, String(data.y))
    }

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#moveHandler"
            bounds={'body'}
            axis={'y'}
            position={{x: 0, y: YAxisPositionOfControlPanel}}
            onStart={() => setIsAlreadyDragged(true)}
            onStop={onStopDragHandler}
        >
            <aside ref={nodeRef} className={`${scss.host} turn-on-opacity-animation`}>

                <button id={'moveHandler'}
                    name={'move'}
                    className={[scss.buttonMoveHandler, 'fa-lg', isAlreadyDragged ? scss.buttonMoveHandlerIsEnabled : ''].join(' ')}>
                    <i className="fad fa-arrows-alt-v"/>
                </button>

                <section className={`${scss.hostSection} turn-on-opacity-animation`}>

                    <button name={'collapseSwitch'} onClick={collapseListHandler}
                        className={scss.buttonCollapseHandler}>
                        <section className={isListCollapsed ? 'display-none' : ''}>
                            <i className="fad fa-arrow-alt-from-right"/>
                            <i className="fad fa-arrow-alt-from-right"/>
                            <i className="fad fa-arrow-alt-from-right"/>
                        </section>

                        <section className={!isListCollapsed ? 'display-none' : ''}>
                            <i className="fad fa-arrow-alt-to-right"/>
                            <i className="fad fa-arrow-alt-to-right"/>
                            <i className="fad fa-arrow-alt-to-right"/>
                        </section>
                    </button>


                    <ul className={[scss.controlsList, (() => isListCollapsed ? scss.collapsedControlsList : scss.expandedControlsList)()].join(' ')}>
                        <li className={[scss.listItem, getUIEnabledFeatureClassName(systemComponentsVisibilities.FPSMonitor)].join(' ')}>
                            <button onClick={() => dispatch(handleControlPanelSwitchVisibility({name: 'FPSMonitor'}))}>
                                <span>Hide/show FPS MONITOR</span>
                                <i className="fad fa-tachometer-alt"/>
                            </button>
                        </li>
                        <li className={[scss.listItem, getUIEnabledFeatureClassName(systemComponentsVisibilities.scoreboard)].join(' ')}>
                            <button onClick={() => dispatch(handleControlPanelSwitchVisibility({name: 'scoreboard'}))}>
                                <span>Hide/show SCOREBOARD</span>
                                <i className="fad fa-tasks-alt"/>
                            </button>
                        </li>
                    </ul>

                </section>
            </aside>
        </Draggable>
    )

}

export default ControlPanelMolecule