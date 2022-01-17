import React from 'react'

import scss from './ControlPanel.molecule.module.scss'



export const ControlPanelMolecule = (): JSX.Element => {


    return (
        <section className={scss.host}>
            <ul>
                <li className={scss.listItem}>
                    <button>Hide/show FPS</button>
                    <i className="fad fa-tachometer-alt"/>
                </li>
                <li className={scss.listItem}>
                    <button>Hide/show scoreboard</button>
                </li>
            </ul>
        </section>
    )

}

