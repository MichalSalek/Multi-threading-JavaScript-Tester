import {WebSocketEventTriggersType} from '@/features/socket-client/socketEventsEntities'
import {ISocketDTO, IWorkerDTO} from '@/features/workers/workers.types'



export type SocketResponseType<T> = {
	status: number;
	data: T
}

export interface ISocketEmitEvent<T = unknown> {
	eventName: WebSocketEventTriggersType,
	dataToSend: T
}

export type SocketEmitType = (eventName: WebSocketEventTriggersType, dataToSend: ISocketDTO<IWorkerDTO> | undefined) => void
