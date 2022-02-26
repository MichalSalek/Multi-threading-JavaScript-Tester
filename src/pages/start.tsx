import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { ROUTE_MAIN_APP_SCREEN } from '@/core/routes.core'
import { setStorageItem } from '@/features/background/browser-storage/browserStorage.api'
import { STORAGE_KEY_START_PAGE_SEEN } from '@/app-config-constants'
import AppButtonAtom from '@/app-components/AppButton.atom'



const StartScreenPage: NextPage = () => {

    useEffect(() => {
        setStorageItem(STORAGE_KEY_START_PAGE_SEEN, 'true')

        return () => undefined
    })

    return (
        <Link passHref href={ROUTE_MAIN_APP_SCREEN}>
            <AppButtonAtom>go to {ROUTE_MAIN_APP_SCREEN} page...</AppButtonAtom>
        </Link>
    )
}

export default StartScreenPage
