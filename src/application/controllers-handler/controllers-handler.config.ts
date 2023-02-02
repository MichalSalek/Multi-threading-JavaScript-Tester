import useIconPackController from '@/application/icon-pack/useIconPack.controller'
import useSocketConnectionAndListeningController
    from '@/application/socket-client/useSocketConnectionAndListening.controller'
import useBrowserStoragePersistController
    from '@/application/browser-storage/useBrowserStoragePersist.controller'
import useBorderColorChangeController from '@/core/features/border-color-change/useBorderColorChange.controller'
import useWorkersActiveInstancesAndCommunicationController
    from '@/core/features/calculations-workers/useWorkersActiveInstancesAndCommunication.controller'
import {
    ControllersWithJSX,
    VoidControllers
} from '@/application/controllers-handler/CommonControllersHandler.controller'


// ****************************
// Paste a new controller below:
// ****************************



// NOT returning JSX
//
const voidControllers: VoidControllers = [

    useIconPackController,
    useSocketConnectionAndListeningController,
    useBrowserStoragePersistController,
    useBorderColorChangeController,
    useWorkersActiveInstancesAndCommunicationController

]




// Returning JSX
//
const JSXControllers: ControllersWithJSX = [

    // e.g. AppLoaderController

]




export {voidControllers, JSXControllers}
