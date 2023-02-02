import {ClientBrowserIDType, SocketResponseStatusesType} from '@/application/socket-client/socket.types'



export interface BackendToAppGenericDTO<T> {
    status: SocketResponseStatusesType
    data: T
    clientBrowserID: ClientBrowserIDType
}
