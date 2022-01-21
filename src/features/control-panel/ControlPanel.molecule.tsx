import React, { useCallback } from 'react'

import scss from './ControlPanel.molecule.module.scss'
import { useAppDispatch, useAppSelector } from '@/core/store.core'
import {
    handleControlPanelSwitchVisibility,
    ISystemComponentsVisibilities,
    selectSystemComponentsVisibilities
} from '@/features/control-panel/controlPanelSlice'
import { useControlPanelCollapseStateStoragePersist } from '@/features/browser-storage/browserStorage.hooks'



export const ControlPanelMolecule = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    const [isListCollapsed, setIsListCollapsed] = useControlPanelCollapseStateStoragePersist(false)

    const collapseListHandler = () => setIsListCollapsed((prevVal) => !prevVal)

    const getUIEnabledFeatureClassName = useCallback(
        (featureVisibilityState: boolean): string => featureVisibilityState ? scss.enabledControl : scss.disabledControl, [])



    return (
        <section className={scss.host}>

            <button onClick={collapseListHandler} className={scss.buttonCollapseHandler}>
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
                        <span>Hide/show FPS</span>
                        <i className="fad fa-tachometer-alt"/>
                    </button>
                </li>
                <li className={[scss.listItem, getUIEnabledFeatureClassName(systemComponentsVisibilities.scoreboard)].join(' ')}>
                    <button onClick={() => dispatch(handleControlPanelSwitchVisibility({name: 'scoreboard'}))}>
                        <span>Hide/show scoreboard</span>
                        <i className="fad fa-tasks-alt"/>
                    </button>
                </li>
            </ul>

        </section>
    )

}

