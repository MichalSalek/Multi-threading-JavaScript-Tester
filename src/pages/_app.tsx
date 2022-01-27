import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'

import '@/global-styles/global-styles.scss'

import store from '@/core/store.core'

import LayoutComposition from '@/layout/Layout.composition'
import MetaHeader from '@/layout/partials/MetaHeader'
import FPSMonitorFloatingMolecule from '@/features/fps-monitor/FPSMonitorFloating.molecule'
import CalculationScoreboardFloatingMolecule
    from '@/features/calculations-components/calculation-scoreboard/CalculationScoreboardFloating.molecule'
import { ControlPanelMolecule } from '@/features/control-panel/ControlPanel.molecule'

// Controllers with no return body below:
//
import WorkersActiveInstancesAndCommunicationController
    from '@/features/workers/WorkersActiveInstancesAndCommunication.controller'
import SocketConnectionAndListeningController from '@/features/socket-client/SocketConnectionAndListening.controller'
import BrowserStoragePersistController from '@/features/browser-storage/BrowserStoragePersist.controller'
import FontAwesomeController from '@/features/font-awesome/FontAwesome.controller'



// Main application component.
// Includes app layout as well as realtime controllers
//
export default function MyApp({Component, pageProps}: AppProps) {
    return (<>
        <MetaHeader/>
        <Provider store={store}>

            {/* Controllers required for keeping the proper functionality of some the application parts.
			With them, operating the each others APIs they served, at a different app's nooks becomes simple and DECLARATIVE. */}
            <FontAwesomeController/>
            <SocketConnectionAndListeningController/>
            <WorkersActiveInstancesAndCommunicationController/>
            <BrowserStoragePersistController/>


            {/* Whole app runtime components - above all pages during a whole app life. */}
            <FPSMonitorFloatingMolecule/>
            <CalculationScoreboardFloatingMolecule/>

            <ControlPanelMolecule/>


            <LayoutComposition>
                <Component {...pageProps} />
            </LayoutComposition>

        </Provider>
    </>)
}

