import React, { useState } from 'react'
import { ROUTE_MAIN_APP_SCREEN, ROUTE_START_PAGE_SCREEN } from '@/core/routes.core'
import AppButtonAtom from '@/app-components/AppButton.atom'
import { useRouter } from 'next/router'
import { ButtonGroup } from '@mui/material'
import scss from './NavLinks.module.scss'



const NavLinksMolecule = (): JSX.Element => {

    const router = useRouter()

    const [disableButtons, setDisableButtons] = useState(false)

    const handleClick = (appRoute: string): void => {
        setDisableButtons(true)
        router.push(appRoute)
    }



    return <nav className={scss.host}>

        <ButtonGroup>
            <AppButtonAtom
                disabled={disableButtons || router.pathname === ROUTE_START_PAGE_SCREEN}
                onClick={() => handleClick(ROUTE_START_PAGE_SCREEN)}
            >Welcome screen</AppButtonAtom>

            <AppButtonAtom
                disabled={disableButtons || router.pathname === ROUTE_MAIN_APP_SCREEN}
                onClick={() => handleClick(ROUTE_MAIN_APP_SCREEN)}
            >Main app page</AppButtonAtom>
        </ButtonGroup>
    </nav>
}

export default NavLinksMolecule
