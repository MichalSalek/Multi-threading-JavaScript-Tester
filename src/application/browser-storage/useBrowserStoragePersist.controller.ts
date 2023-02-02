import {
    useControlPanelSwitchesStoragePersist,
    useWorkersAmountStoragePersist
} from '@/application/browser-storage/browserStorage.hooks'



const useBrowserStoragePersistController = (): void => {

    // Persist amount of ready Workers
    useWorkersAmountStoragePersist()

    // Persist Control Panel switches state
    useControlPanelSwitchesStoragePersist()

}

export default useBrowserStoragePersistController
