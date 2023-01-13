import useIconPackController from '@/features/background/icon-pack/useIconPack.controller'
import useSocketConnectionAndListeningController
    from '@/features/background/socket-client/useSocketConnectionAndListening.controller'
import useBrowserStoragePersistController
    from '@/features/background/browser-storage/domain/useBrowserStoragePersist.controller'
import useBorderColorChangeController from '@/features/background/border-color-change/useBorderColorChange.controller'
import useWorkersActiveInstancesAndCommunicationController
    from '@/features/background/web-workers/useWorkersActiveInstancesAndCommunication.controller'



export const useControllersHandler = (): void => {
    useIconPackController()
    useSocketConnectionAndListeningController()
    useBrowserStoragePersistController()
    useBorderColorChangeController()
    useWorkersActiveInstancesAndCommunicationController()
}
