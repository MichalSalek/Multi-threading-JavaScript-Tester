import {Socket} from 'socket.io-client'
import {SocketEmitType} from '@/features/socket-client/socket.types'
import {WebSocketEventTriggersType} from '@/features/socket-client/socketEventsEntities'
import {ISocketDTO, IWorkerDTO} from '@/features/workers/workers.types'



export const getSocketInstanceAbsolutely = () => window.clientSocket as Socket

export const sendTriggerMessageToSocket: SocketEmitType = (eventName: WebSocketEventTriggersType, data: ISocketDTO<IWorkerDTO> | undefined): void => {
    getSocketInstanceAbsolutely().emit(eventName, data)
}
