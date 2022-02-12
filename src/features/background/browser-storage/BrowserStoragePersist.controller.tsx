import React from 'react'
import {
    useControlPanelSwitchesStoragePersist,
    useWorkersAmountStoragePersist
} from '@/features/background/browser-storage/browserStorage.hooks'



const BrowserStoragePersistController = (): JSX.Element => {

    // Persist amount of ready Workers
    useWorkersAmountStoragePersist()

    // Persist Control Panel switches state
    useControlPanelSwitchesStoragePersist()

    return <></>
}

export default BrowserStoragePersistController
