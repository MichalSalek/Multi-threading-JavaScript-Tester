import { Socket } from 'socket.io-client'
import { SocketEmitType } from '@/features/technical/socket-client/socket.types'
import { WebSocketEventTriggersType } from '@/features/technical/socket-client/socketEventsEntities'
import { ISocketDTO, IWorkerDTO } from '@/features/technical/web-workers-configuration/webWorkers.types'



export const getSocketInstanceAbsolutely = () => window.clientSocket as Socket

export const sendTriggerMessageToSocket: SocketEmitType = (eventName: WebSocketEventTriggersType, data: ISocketDTO<IWorkerDTO> | undefined): void => {
    getSocketInstanceAbsolutely().emit(eventName, data)
}
