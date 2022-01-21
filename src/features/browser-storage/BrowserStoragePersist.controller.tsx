import React from 'react'
import {
    useControlPanelSwitchesStoragePersist,
    useWorkersAmountStoragePersist
} from '@/features/browser-storage/browserStorage.hooks'



const BrowserStoragePersistController = (): JSX.Element => {

    // Persist amount of ready Workers (how many workers should be existing)
    useWorkersAmountStoragePersist()

    // Persist Control Panel switches state (what's on, what's off)
    useControlPanelSwitchesStoragePersist()

    return <></>
}

export default BrowserStoragePersistController
