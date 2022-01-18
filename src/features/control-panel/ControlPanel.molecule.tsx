import React, { useState } from 'react'

import scss from './ControlPanel.molecule.module.scss'
import { useAppDispatch } from '@/core/store.core'
import { handleFPSMonitorVisibility, handleScoreboardVisibility } from '@/features/control-panel/controlPanelSlice'



export const ControlPanelMolecule = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const [isListCollapsed, setIsListCollapsed] = useState(false)

    const collapseListHandler = () => setIsListCollapsed((prevVal) => !prevVal)

    return (
        <section className={scss.host}>

            <button onClick={collapseListHandler} className={scss.buttonSupportsCollapse}>
                <section className={isListCollapsed ? 'display-none' : ''}>
                    <i className="fad fa-arrow-alt-to-right"/>
                    <i className="fad fa-arrow-alt-to-right"/>
                    <i className="fad fa-arrow-alt-to-right"/>
                </section>

                <section className={!isListCollapsed ? 'display-none' : ''}>
                    <i className="fad fa-arrow-alt-to-left"/>
                    <i className="fad fa-arrow-alt-to-left"/>
                    <i className="fad fa-arrow-alt-to-left"/>
                </section>
            </button>


            <ul className={[scss.controlsList, (() => isListCollapsed ? scss.collapsedControlsList : scss.expandedControlsList)()].join(' ')}>
                <li className={scss.listItem}>
                    <button onClick={() => dispatch(handleFPSMonitorVisibility())}>
                        <span>Hide/show FPS</span>
                        <i className="fad fa-tachometer-alt"/>
                    </button>
                </li>
                <li className={scss.listItem}>
                    <button onClick={() => dispatch(handleScoreboardVisibility())}>
                        <span>Hide/show scoreboard</span>
                        <i className="fad fa-tasks-alt"/>
                    </button>
                </li>
            </ul>

        </section>
    )

}

