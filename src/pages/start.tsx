import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {setStorageItem} from '@/features/background/browser-storage/browserStorage.api'
import NavLinksMolecule from '@/features/building/nav-links/UI/NavLinks.molecule'
import ClarifyingInformationMolecule from '@/features/building/clarifying-information/UI/ClarifyingInformation.molecule'
import {Typography} from '@mui/material'
import {STORAGE_KEY_START_PAGE_SEEN} from '@/features/background/browser-storage/domain/browserStorage.config'



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
