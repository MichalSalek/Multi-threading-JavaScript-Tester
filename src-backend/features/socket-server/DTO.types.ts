import {ClientBrowserIDType, SocketResponseStatusesType} from '@/features/background/socket-client/socket.types'



export interface BackendToAppGenericDTO<T> {
    status: SocketResponseStatusesType
    data: T
    clientBrowserID: ClientBrowserIDType
}
