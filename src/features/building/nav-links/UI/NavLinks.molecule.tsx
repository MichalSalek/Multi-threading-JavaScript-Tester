import { ROUTE_MAIN_APP_SCREEN, ROUTE_START_PAGE_SCREEN } from '@/core/routes.core'
import AppButtonAtom from '@/app-components/AppButton.atom'
import Link from 'next/link'
import React from 'react'



const NavLinksMolecule = (): JSX.Element => {

    return <nav>
        <Link passHref href={ROUTE_START_PAGE_SCREEN}>
            <AppButtonAtom>go to {ROUTE_START_PAGE_SCREEN} page...</AppButtonAtom>
        </Link>
        <Link passHref href={ROUTE_MAIN_APP_SCREEN}>
            <AppButtonAtom>go to {ROUTE_MAIN_APP_SCREEN} page...</AppButtonAtom>
        </Link>
    </nav>
}

export default NavLinksMolecule
