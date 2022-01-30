import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'

import '@/global-styles/global-styles.scss'

import store from '@/core/store.core'

import LayoutComposition from '@/layout/Layout.composition'
import MetaHeader from '@/layout/partials/MetaHeader'
import FPSMonitorAtomFloatingMolecule from '@/features/fps-monitor/UI/FPSMonitorAtomFloating.molecule'
import CalculationWorkersScoreboardFloatingMolecule
    from '@/features/calculation-workers-scoreboard/UI/CalculationWorkersScoreboardFloating.molecule'
import { ControlPanelMolecule } from '@/features/control-panel/UI/ControlPanel.molecule'

// Controllers with no return body below:
//
import WorkersActiveInstancesAndCommunicationController
    from '@/features/web-workers-configuration/WorkersActiveInstancesAndCommunication.controller'
import SocketConnectionAndListeningController from '@/features/socket-client/SocketConnectionAndListening.controller'
import BrowserStoragePersistController from '@/features/browser-storage/BrowserStoragePersist.controller'
import IconPackController from '@/features/icon-pack/IconPack.controller'



// Main application component.
// Includes app layout as well as realtime controllers
//
export default function ApplicationComposition({Component, pageProps}: AppProps) {
    return (<>
        <MetaHeader/>
        <Provider store={store}>

            {/* Controllers required for keeping the proper functionality of some the application parts.
			With them, operating the each others APIs they served, at a different app's nooks becomes simple and DECLARATIVE. */}
            <IconPackController/>
            <SocketConnectionAndListeningController/>
            <WorkersActiveInstancesAndCommunicationController/>
            <BrowserStoragePersistController/>


            {/* Whole app runtime components - above all pages during a whole app life. */}
            <FPSMonitorAtomFloatingMolecule/>
            <CalculationWorkersScoreboardFloatingMolecule/>

            <ControlPanelMolecule/>


            <LayoutComposition>
                <Component {...pageProps} />
            </LayoutComposition>

        </Provider>
    </>)
}

