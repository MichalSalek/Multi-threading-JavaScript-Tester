import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '@/global-styles/global-styles.scss'

import store from '@/core/store.core'

import LayoutComposition from '@/layout/Layout.composition'
import BrowserStoragePersistController from '@/features/background/browser-storage/BrowserStoragePersist.controller'
import SocketConnectionAndListeningController
    from '@/features/background/socket-client/SocketConnectionAndListening.controller'
import WorkersActiveInstancesAndCommunicationController
    from '@/features/background/web-workers/WorkersActiveInstancesAndCommunication.controller'
import MetaHead from '@/layout/partials/MetaHead'
import { CssBaseline, ThemeProvider } from '@mui/material'
import FPSMonitorWindowMolecule from '@/features/building/fps-monitor/UI/FPSMonitorWindow.molecule'
import IconPackController from '@/features/background/icon-pack/IconPack.controller'
import BorderColorChangeController from '@/features/background/border-color-change/BorderColorChange.controller'

import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ROUTE_START_PAGE_SCREEN } from '@/core/routes.core'
import WorkersScoreboardWindowMolecule from '@/features/building/workers-scoreboard/UI/WorkersScoreboardWindow.molecule'
import WorkersGlobalWorkControlWindowMolecule
    from '@/features/building/workers-global-work-control/UI/WorkersGlobalWorkControlWindow.molecule'



const ControlPanelMolecule = dynamic(() =>
    import('@/features/building/control-panel/UI/ControlPanel.molecule'), {ssr: false})



// Main application component.
// Includes app layout as well as realtime controllers
//
export default function ApplicationComposition({Component, pageProps}: AppProps) {

    const router = useRouter()


    const isTheStartPageActually = (): boolean => router.route === ROUTE_START_PAGE_SCREEN

    const theme = createTheme({
        palette: {
            primary: {
                main: grey[900]
            }
        }
    })

    return (<ThemeProvider theme={theme}>

        <MetaHead/>

        <CssBaseline/>

        <Provider store={store}>

            {/* Controllers required for keeping the proper functionality of some the application parts.
			With them, operating the each others APIs they served, at a different app's nooks becomes simple and DECLARATIVE. */}
            <IconPackController/>
            <SocketConnectionAndListeningController/>
            <WorkersActiveInstancesAndCommunicationController/>
            <BrowserStoragePersistController/>
            <BorderColorChangeController/>


            {/* Whole app runtime components - above all pages during a whole app life. */}
            {isTheStartPageActually() ? <></> : (<>
                <FPSMonitorWindowMolecule/>
                <WorkersScoreboardWindowMolecule/>
                <WorkersGlobalWorkControlWindowMolecule/>
                <ControlPanelMolecule/>
            </>)}


            <LayoutComposition>
                <Component {...pageProps} />
            </LayoutComposition>

        </Provider>
    </ThemeProvider>)
}

