
import { workersRuntimeData } from '../db/ram-db'
import { AppToSocketDTO, SocketToAppDTO } from '@/features/background/socket-client/socket.types'
import { getSecuredClientBrowserID } from '../client-browser-id/clientBrowserID.api'
import {DBModel, WorkerJobsTypeDTO} from '../db/db.types'
import {getAllJobsDone} from '../db/db.api'



export const getAllJobsDoneResponse = (request: AppToSocketDTO<unknown>, clientIP: string): SocketToAppDTO<DBModel> => {
    return {
        data: getAllJobsDone(),
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