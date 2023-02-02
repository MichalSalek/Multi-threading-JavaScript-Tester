import scss from './previewAnimation.module.scss'
import React from 'react'
import {Paper, Typography} from '@mui/material'



const PreviewAnimationMolecule = (): JSX.Element => {

    return <section className={scss.host}>
        <Paper variant={'outlined'} sx={{padding: '10px 15px 15px 15px'}}>
            <Typography variant={'body2'} sx={{fontSize: '10px'}} className={'lower-opacity'}>Preview animation:</Typography>
            <Paper elevation={3} className={scss.iconSection}>
                <span className={scss.animateIcons}>
                    <i className="fad fa-user-robot"/>
                    <i className="fad fa-user-robot"/>
                    <i className="fad fa-user-robot"/>
                    <i className="fad fa-user-robot"/>
                </span>
            </Paper>
        </Paper>
    </section>
}

export default PreviewAnimationMolecule