import React from 'react'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'

import 'semantic-ui-css/semantic.min.css'
import '@/global-styles.scss'

import store from '@/core/store.core'

import LayoutComposition from '@/layout/Layout.composition'
import MetaHeader from '@/layout/partials/MetaHeader'
import FPSMonitorFloatingMolecule from '@/features/fps-monitor/FPSMonitorFloating.molecule'
import CalculationResultsFloatingMolecule from '@/features/calculations-components/calculation-results/CalculationResultsFloating.molecule'

// Controllers with no return body below:
//
import WorkersActiveInstancesAndCommunicationController from '@/features/workers/WorkersActiveInstancesAndCommunication.controller'
import SocketConnectionAndListeningController from '@/features/socket-client/SocketConnectionAndListening.controller'



// Main application component.
// Includes app layout as well as realtime controllers
//
export default function MyApp({Component, pageProps}: AppProps) {
	return (<>
		<MetaHeader/>
		<Provider store={store}>

			{/*
			Controllers required for keeping the proper functionality of some the application parts.
			With them, operating the each others APIs they served, at a different app's nooks becomes simple and declarative.
			*/}
			<SocketConnectionAndListeningController/>
			<WorkersActiveInstancesAndCommunicationController/>


			{/* Free floating components */}
			<FPSMonitorFloatingMolecule/>
			<CalculationResultsFloatingMolecule/>


			<LayoutComposition>
				<Component {...pageProps} />
			</LayoutComposition>

		</Provider>
	</>)
}

