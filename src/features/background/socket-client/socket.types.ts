import { WebSocketEventTriggersType } from '@/features/background/socket-client/socketEventsEntities'
import { ISocketDTO, IWorkerDTO } from '@/features/background/web-workers-configuration/webWorkers.types'



export type SocketResponseType<T> = {
    status: number;
    data: T
}


export interface ISocketEmitEvent<T = unknown> {
    eventName: WebSocketEventTriggersType,
    dataToSend: T
}


export type SocketEmitType = (eventName: WebSocketEventTriggersType, dataToSend: ISocketDTO<IWorkerDTO> | undefined) => void
