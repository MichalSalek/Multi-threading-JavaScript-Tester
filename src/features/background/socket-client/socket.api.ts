import { Socket } from 'socket.io-client'
import { SocketEmitType } from '@/features/background/socket-client/socket.types'
import { WebSocketEventTriggersType } from '@/features/background/socket-client/socketEventsEntities'
import { ISocketDTO, IWorkerDTO } from '@/features/background/web-workers-configuration/webWorkers.types'



export const getSocketInstanceAbsolutely = () => window.clientSocket as Socket

export const sendTriggerMessageToSocket: SocketEmitType = (eventName: WebSocketEventTriggersType, data: ISocketDTO<IWorkerDTO> | undefined): void => {
    getSocketInstanceAbsolutely().emit(eventName, data)
}
