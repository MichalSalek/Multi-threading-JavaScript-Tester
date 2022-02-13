import { WebSocketEventTriggersType } from '@/features/background/socket-client/socketEventsEntities'



export type SocketResponseStatusesType = 200 // 200 | xx...

export type ClientBrowserIDType = string

export type UserAgentType = string


export interface AppToSocketDTO<T> {
    status: SocketResponseStatusesType
    data: T
    userAgent: UserAgentType
}


export interface SocketToAppDTO<T> {
    status: SocketResponseStatusesType
    data: T
    clientBrowserID: ClientBrowserIDType
}


export type AppToSocketEmitDTO = <T>(eventName: WebSocketEventTriggersType, dataToSend: AppToSocketDTO<T>) => void