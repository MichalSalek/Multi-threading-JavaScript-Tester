import React from 'react'
import scss from './Layout.module.scss'
import { Typography } from '@mui/material'



const Footer = () => {

    return (
        <footer className={scss.footer}>
            <Typography variant={'body2'}>build version 0.9</Typography>
        </footer>
    )
}

export default Footer
