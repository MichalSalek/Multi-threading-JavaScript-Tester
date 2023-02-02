import React, { useMemo, useState } from 'react'
import AppButtonAtom from '@/core/layout/components/common/AppButton.atom'
import { useRouter } from 'next/router'
import { Badge, BadgeProps, ButtonGroup, styled, Tooltip } from '@mui/material'
import scss from './navLinks.module.scss'
import Zoom from '@mui/material/Zoom'
import {getRoute} from '@/application/routing/routing.api'



const NavLinksMolecule = (): JSX.Element => {

    const router = useRouter()

    const [disableButtons, setDisableButtons] = useState(false)

    const handleClick = (appRoute: string): void => {
        setDisableButtons(true)
        void router.push(appRoute)
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
                disabled={disableButtons || router.pathname === getRoute({routeName: 'START_PAGE'})}
                onClick={() => handleClick(getRoute({routeName: 'START_PAGE'}))}
            >Welcome screen</AppButtonAtom>

            <AppButtonAtom
                size={'small'}
                disabled={disableButtons || router.pathname === getRoute({routeName: 'APP_INDEX'})}
                onClick={() => handleClick(getRoute({routeName: 'APP_INDEX'}))}
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
