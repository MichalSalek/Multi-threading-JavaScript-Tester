import { Typography } from '@mui/material'
import { PopoverComposition } from '@/layout/compositions/popover/Popover.composition'
import React from 'react'
import scss from './PopoverTitle.module.scss'



interface IProps {
    popoverTextContent: string
    titleTextContent: string
}


export const PopoverTitleMolecule = ({popoverTextContent, titleTextContent}: IProps): JSX.Element => {

    return (
        <Typography
            variant="h6" component={'h3'}>

            <PopoverComposition
                textContent={popoverTextContent}>
                <i className="fad fa-info-circle fa-sm"/>
            </PopoverComposition>

            <span className={scss.title}>{titleTextContent}</span>

        </Typography>
    )
}