import { WebSocketEventTriggersType } from '@/features/background/socket-client/socketEventsEntities'



export type SocketResponseStatusesType = 200 // 200 | xx...

export type ClientBrowserIDType = string

export type UserAgentType = string


export type AppToBackendGenericDTO<T> = {
    status: SocketResponseStatusesType
    data: T
    userAgent: UserAgentType
}



export type AppToBackedEmitterDTO = <T>(eventName: WebSocketEventTriggersType, dataToSend: T) => void
