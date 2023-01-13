import React, { useMemo, useState } from 'react'
import { ROUTE_MAIN_APP_SCREEN, ROUTE_START_PAGE_SCREEN } from '@/core/routes.core'
import AppButtonAtom from '@/features/shared-components/AppButton.atom'
import { useRouter } from 'next/router'
import { Badge, BadgeProps, ButtonGroup, styled, Tooltip } from '@mui/material'
import scss from './navLinks.module.scss'
import Zoom from '@mui/material/Zoom'



const NavLinksMolecule = (): JSX.Element => {

    const router = useRouter()

    const [disableButtons, setDisableButtons] = useState(false)

    const handleClick = (appRoute: string): void => {
        setDisableButtons(true)
        router.push(appRoute)
    }

    const StyledBadge = useMemo(() => styled(Badge)<BadgeProps>(() => ({
        '& .MuiBadge-badge': {
            right: -22
        }
    })), [])



    return <nav className={scss.host}>

        <ButtonGroup>
            <AppButtonAtom
                size={'small'}
                disabled={disableButtons || router.pathname === ROUTE_START_PAGE_SCREEN}
                onClick={() => handleClick(ROUTE_START_PAGE_SCREEN)}
            >Welcome screen</AppButtonAtom>

            <AppButtonAtom
                size={'small'}
                disabled={disableButtons || router.pathname === ROUTE_MAIN_APP_SCREEN}
                onClick={() => handleClick(ROUTE_MAIN_APP_SCREEN)}
            >Main app page</AppButtonAtom>


            <AppButtonAtom
                size={'small'}
                disabled
            >
                <StyledBadge color={'secondary'} badgeContent={
                    <Tooltip
                        placement={'top-start'}
                        title="Future feature"
                        TransitionComponent={Zoom}
                        arrow
                    >
                        <span> soon</span>
                    </Tooltip>}>
                    
                    Scoreboard
                </StyledBadge>
            </AppButtonAtom>


        </ButtonGroup>
    </nav>
}

export default NavLinksMolecule
