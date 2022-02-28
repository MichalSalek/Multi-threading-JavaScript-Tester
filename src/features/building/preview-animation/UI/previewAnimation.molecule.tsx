import scss from './previewAnimation.module.scss'
import React from 'react'
import { Paper } from '@mui/material'



const PreviewAnimationMolecule = (): JSX.Element => {

    return <section className={scss.host}>
        <Paper elevation={3} className={scss.iconSection}>
            <span className={scss.animateIcons}>
                <i className="fad fa-user-robot"/>
                <i className="fad fa-user-robot"/>
                <i className="fad fa-user-robot"/>
                <i className="fad fa-user-robot"/>
            </span>
        </Paper>
    </section>
}

export default PreviewAnimationMolecule