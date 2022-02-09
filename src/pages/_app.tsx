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
    from '@/features/background/web-workers-configuration/WorkersActiveInstancesAndCommunication.controller'
import MetaHead from '@/layout/partials/MetaHead'
import { CssBaseline } from '@mui/material'
import FPSMonitorFloatingMolecule from '@/features/building/fps-monitor/UI/FPSMonitorFloating.molecule'
import WorkersScoreboardFloatingMolecule
    from '@/features/building/workers-scoreboard/UI/WorkersScoreboardFloating.molecule'
import ControlPanelMolecule from '@/features/building/control-panel/UI/ControlPanel.molecule'
import IconPackController from '@/features/background/icon-pack/IconPack.controller'
import BorderColorChangeController from '@/features/background/border-color-change/BorderColorChange.controller'


// Main application component.
// Includes app layout as well as realtime controllers
//
export default function ApplicationComposition({Component, pageProps}: AppProps) {
    return (<>

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
            <FPSMonitorFloatingMolecule/>
            <WorkersScoreboardFloatingMolecule/>


            <ControlPanelMolecule/>


            <LayoutComposition>
                <Component {...pageProps} />
            </LayoutComposition>

        </Provider>
    </>)
}

