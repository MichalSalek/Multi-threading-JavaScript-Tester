import { Typography } from '@mui/material'
import { PopoverComposition } from '@/layout/compositions/popover/Popover.composition'
import React from 'react'
import scss from './popoverTitle.module.scss'
import { OverridableStringUnion } from '@mui/types'
import { Variant } from '@mui/material/styles/createTypography'
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography'



interface IProps {
    popoverTextContent: string
    titleTextContent: string
    titleVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}


export const PopoverTitleMolecule = ({
    popoverTextContent,
    titleTextContent,
    titleVariant = 'h6'
}: IProps): JSX.Element => {

    return (
        <Typography
            variant={titleVariant} component={'h2'} className={scss.host}>

            <PopoverComposition
                textContent={popoverTextContent}>
                <i className={['fad fa-info-circle', scss.icon].join(' ')}/>
            </PopoverComposition>

            <span className={scss.title}>{titleTextContent}</span>

        </Typography>
    )
}