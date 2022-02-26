import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { ROUTE_MAIN_APP_SCREEN } from '@/core/routes.core'
import { setStorageItem } from '@/features/background/browser-storage/browserStorage.api'
import { STORAGE_KEY_START_PAGE_SEEN } from '@/app-config-constants'
import AppButtonAtom from '@/app-components/AppButton.atom'
import { Typography } from '@mui/material'



const StartScreenPage: NextPage = () => {

    useEffect(() => {
        setStorageItem(STORAGE_KEY_START_PAGE_SEEN, 'true')

        return () => undefined
    })

    return (<main>

        <br/>

        <Typography variant="h5"> Work in progress: Building application UI.</Typography>
        <Typography variant="h6" component="p"> Please come back soon to feel a new look.</Typography>

        <br/>

        <Link passHref href={ROUTE_MAIN_APP_SCREEN}>
            <AppButtonAtom>Go to main app page – this way</AppButtonAtom>
        </Link>

    </main>)
}

export default StartScreenPage
