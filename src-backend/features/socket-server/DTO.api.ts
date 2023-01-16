import {AppToBackendGenericDTO} from '@/features/background/socket-client/socket.types'
import {getSecuredClientBrowserID} from '../client-browser-id/clientBrowserID.api'
import {DBModel, WorkerJobsTypeDTO} from '../db/db.types'
import {getWholeData} from '../db/db.api'
import {BackendToAppGenericDTO} from './DTO.types'



export const getAllJobsDoneResponse = (request: AppToBackendGenericDTO<unknown>, clientIP: string): BackendToAppGenericDTO<DBModel> => {
    return {
        data: getWholeData(),
        status: 200,
        clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP)
    }
}



export const getClientBrowserIDJobsDoneResponse = (request: AppToBackendGenericDTO<unknown>, clientIP: string): BackendToAppGenericDTO<WorkerJobsTypeDTO> => {
    const clientBrowserDataOnly: WorkerJobsTypeDTO = getWholeData()[getSecuredClientBrowserID(request.userAgent, clientIP)] ?? {}

    return {
        data: clientBrowserDataOnly,
        status: 200,
        clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP)
    }
}



export const getClientBrowserIDResponse = (request: AppToBackendGenericDTO<unknown>, clientIP: string): BackendToAppGenericDTO<string> => {
    return {
        data: getSecuredClientBrowserID(request.userAgent, clientIP),
        status: 200,
        clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP)
    }
}
