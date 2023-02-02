import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {setStorageItem} from '@/application/browser-storage/browserStorage.api'
import NavLinksMolecule from '@/core/layout/components/atoms-and-molecules/nav-links/UI/NavLinks.molecule'
import ClarifyingInformationMolecule from '@/core/layout/components/atoms-and-molecules/clarifying-information/UI/ClarifyingInformation.molecule'
import {Typography} from '@mui/material'
import {STORAGE_KEY_START_PAGE_SEEN} from '@/application/browser-storage/browserStorage.config'



const StartScreenPage: NextPage = () => {

    useEffect(() => {
        setStorageItem(STORAGE_KEY_START_PAGE_SEEN, 'true')
    }, [])

    return <main>

        <ClarifyingInformationMolecule/>

        <NavLinksMolecule/>

        <section className={'lower-opacity'}>
            <Typography variant="body2">The best user experience is on the desktop.</Typography>
        </section>

    </main>
}

export default StartScreenPage
