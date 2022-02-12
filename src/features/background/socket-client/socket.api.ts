import { Socket } from 'socket.io-client'
import { WebSocketEventTriggersType } from '@/features/background/socket-client/socketEventsEntities'
import { AppToSocketDTO, AppToSocketEmitDTO } from '@/features/background/socket-client/socket.types'



export const getSocketInstanceAbsolutely = () => window.clientSocket as Socket

export const sendTriggerMessageToSocket: AppToSocketEmitDTO = <T>(eventName: WebSocketEventTriggersType, data: AppToSocketDTO<T> | undefined): void => {
    getSocketInstanceAbsolutely().emit(eventName, data)
}
