import React from 'react'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import store from '@/core/store.core'
import LayoutComposition from '@/layout/compositions/main-layout/Layout.composition'
import {CssBaseline} from '@mui/material'
import FPSMonitorWindowMolecule from '@/features/building/fps-monitor/UI/FPSMonitorWindow.molecule'
import dynamic from 'next/dynamic'
import WorkersScoreboardWindowMolecule from '@/features/building/workers-scoreboard/UI/WorkersScoreboardWindow.molecule'
import WorkersGlobalWorkControlWindowMolecule
    from '@/features/building/workers-global-work-control/UI/WorkersGlobalWorkControlWindow.molecule'
import '@/global-styles/variables-and-functions.scss'
import '@/global-styles/global-styles.scss'
import {useControllersHandler} from '@/features/background/controllers-handler/useControllersHandler.controller'
import {ThemeComposition} from '@/features/building/_shared-components/Theme.composition'
import {MainViewOnlyGuardComposition} from '@/layout/compositions/main-view-only-guard/MainViewOnlyGuard.composition'



const ControlPanelMolecule = dynamic(() =>
    import('@/features/building/control-panel/UI/ControlPanel.molecule'), {ssr: false})



// Main application component.
// Includes app layout as well as realtime controllers
//
export default function ApplicationComposition({Component, pageProps}: AppProps) {


    useControllersHandler()

    return (<ThemeComposition>

        <CssBaseline/>

        {/*<MetaHead/> @TODO create _document */}

        <Provider store={store}>

            <MainViewOnlyGuardComposition>
                <FPSMonitorWindowMolecule/>
                <WorkersScoreboardWindowMolecule/>
                <WorkersGlobalWorkControlWindowMolecule/>
                <ControlPanelMolecule/>
            </MainViewOnlyGuardComposition>


            <LayoutComposition>
                <Component {...pageProps} />
            </LayoutComposition>

        </Provider>

    </ThemeComposition>)
}
