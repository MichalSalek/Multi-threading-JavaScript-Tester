import React from 'react'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import store from '@/application/store/store'
import LayoutComposition from '@/core/layout/compositions/main-layout/Layout.composition'
import {CssBaseline} from '@mui/material'
import FPSMonitorWindowMolecule from '@/core/layout/components/atoms-and-molecules/fps-monitor/UI/FPSMonitorWindow.molecule'
import dynamic from 'next/dynamic'
import WorkersScoreboardWindowMolecule
    from '@/core/layout/components/atoms-and-molecules/workers/scoreboard/UI/WorkersScoreboardWindow.molecule'
import WorkersGlobalWorkControlWindowMolecule
    from '@/core/layout/components/atoms-and-molecules/workers/global-work-control/UI/WorkersGlobalWorkControlWindow.molecule'
import '@/core/layout/styles/common/variables-and-functions.scss'
import '@/core/layout/styles/common/global-styles.scss'
import {
    CommonControllersHandler
} from '@/application/controllers-handler/CommonControllersHandler.controller'
import {ThemeComposition} from '@/core/layout/compositions/Theme.composition'
import {AppIndexViewPermissionsComposition} from '@/core/layout/compositions/main-view-only-guard/AppIndexViewPermissions.composition'



const ControlPanelMolecule = dynamic(() =>
    import('@/core/layout/components/atoms-and-molecules/control-panel/UI/ControlPanel.molecule'), {ssr: false})


// ***********
// Entry point
// ***********
//
export default function ApplicationComposition({Component, pageProps}: AppProps) {
    return (<ThemeComposition>

        <CssBaseline/>

        {/*<MetaHead/> @TODO create _document */}

        <Provider store={store}>
            <CommonControllersHandler>


                <AppIndexViewPermissionsComposition>
                    <FPSMonitorWindowMolecule/>
                    <WorkersScoreboardWindowMolecule/>
                    <WorkersGlobalWorkControlWindowMolecule/>
                    <ControlPanelMolecule/>
                </AppIndexViewPermissionsComposition>


                <LayoutComposition>
                    <Component {...pageProps} />
                </LayoutComposition>

                
            </CommonControllersHandler>
        </Provider>

    </ThemeComposition>)
}
