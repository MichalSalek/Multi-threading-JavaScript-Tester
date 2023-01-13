import React from 'react'
import {
    useControlPanelSwitchesStoragePersist,
    useWorkersAmountStoragePersist
} from '@/features/background/browser-storage/domain/browserStorage.hooks'



const useBrowserStoragePersistController = (): void => {

    // Persist amount of ready Workers
    useWorkersAmountStoragePersist()

    // Persist Control Panel switches state
    useControlPanelSwitchesStoragePersist()

}

export default useBrowserStoragePersistController
