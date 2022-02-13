import {
    WorkerJobsByClientBrowserIDTypeDTO,
    WorkerJobsTypeDTO
} from '@/features/background/web-workers-configuration/webWorkers.types'
import { workersRuntimeData } from './runtimeData'
import { AppToSocketDTO, SocketToAppDTO } from '@/features/background/socket-client/socket.types'
import { getSecuredClientBrowserID } from './features/client-browser-id/clientBrowserID.api'



export const getAllJobsDoneResponse = (request: AppToSocketDTO<unknown>, clientIP: string): SocketToAppDTO<WorkerJobsByClientBrowserIDTypeDTO> => {
    return {
        data: workersRuntimeData,
        status: 200,
        clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP)
    }
}



export const getClientBrowserIDJobsDoneResponse = (request: AppToSocketDTO<unknown>, clientIP: string): SocketToAppDTO<WorkerJobsTypeDTO> => {
    const clientBrowserDataOnly: WorkerJobsTypeDTO = workersRuntimeData[getSecuredClientBrowserID(request.userAgent, clientIP)] ?? {}

    return {
        data: clientBrowserDataOnly,
        status: 200,
        clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP)
    }
}



export const getClientBrowserIDResponse = (request: AppToSocketDTO<unknown>, clientIP: string): SocketToAppDTO<string> => {

    return {
        data: getSecuredClientBrowserID(request.userAgent, clientIP),
        status: 200,
        clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP)
    }
}