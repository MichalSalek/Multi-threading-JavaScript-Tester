import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { setStorageItem } from '@/features/background/browser-storage/browserStorage.api'
import { STORAGE_KEY_START_PAGE_SEEN } from '@/core/constants.core'
import NavLinksMolecule from '@/features/building/nav-links/UI/NavLinks.molecule'
import ClarifyingInformationMolecule from '@/features/building/clarifying-information/UI/ClarifyingInformation.molecule'
import { Typography } from '@mui/material'



const StartScreenPage: NextPage = () => {

    useEffect(() => {
        setStorageItem(STORAGE_KEY_START_PAGE_SEEN, 'true')

        return () => undefined
    })

    return <main>

        <ClarifyingInformationMolecule/>

        <NavLinksMolecule/>

        <section className={'lower-opacity'}>
            <Typography variant="h6"> Work in progress - building UI.</Typography>
            <Typography variant="body2"> Come back soon to feel a new look.</Typography>
            <Typography variant="body2"> Best on the desktop.</Typography>
        </section>

    </main>
}

export default StartScreenPage
