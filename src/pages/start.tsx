import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { setStorageItem } from '@/features/background/browser-storage/browserStorage.api'
import { STORAGE_KEY_START_PAGE_SEEN } from '@/app-config-constants'
import { Typography } from '@mui/material'
import NavLinksMolecule from '@/features/building/nav-links/UI/NavLinks.molecule'



const StartScreenPage: NextPage = () => {

    useEffect(() => {
        setStorageItem(STORAGE_KEY_START_PAGE_SEEN, 'true')

        return () => undefined
    })

    return (<main>

        <br/>

        <Typography variant="h6"> Work in progress: Building application UI.</Typography>
        <Typography variant="body2"> Please come back soon to feel a new look.</Typography>
        <Typography variant="body2"> Best on the desktop.</Typography>

        <br/>

        <Typography variant="h5"> This application is used to artificially load the CPU with calculations performed by
            JavaScript.</Typography>
        <Typography variant="body1"> Using WebWorkers, you can delegate calculations to other threads, so that the page
            you are currently on will run without any loss of smoothness. </Typography>
        <Typography variant="body1">Why? The main thread responsible for drawing
            the GUI will remain unencumbered.</Typography>


        <br/>

        <br/>

        <NavLinksMolecule/>

    </main>)
}

export default StartScreenPage
