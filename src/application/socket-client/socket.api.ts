import { Socket } from 'socket.io-client'
import { WebSocketEventTriggersType } from '@/application/socket-client/socketEventsEntities'
import { AppToBackendGenericDTO, AppToBackedEmitterDTO } from '@/application/socket-client/socket.types'
import { INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES } from '@/core/config.core'
import { addConsoleVerbose } from '@/application/logger/logger.api'
import {BackendToAppGenericDTO} from '../../../src-backend/features/_background-core/socket-server/DTO.types'



export const getSocketInstanceAbsolutely = () => window.clientSocket as Socket



export const sendCommandMessageToSocket: AppToBackedEmitterDTO = <T>(eventName: WebSocketEventTriggersType, data: T): void => {
    const dataToSend: AppToBackendGenericDTO<T> = {
        status: 200,
        data,
        userAgent: navigator.userAgent
    }
    getSocketInstanceAbsolutely().emit(eventName, dataToSend)
}


// Generic socket event listener.
//
export const listenToSocketEventsStream = <T>(
    socketClient: Socket,
    socketEventName: WebSocketEventTriggersType,
    socketEventListenerCallback: ((response: T) => void)): void => {

    let timeoutID = 0

    socketClient.on(socketEventName, (response: BackendToAppGenericDTO<T>) => {

        if (response.status !== 200) addConsoleVerbose('Response status is different than 200.', 'warn')


        if (INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES === 0) {
            socketEventListenerCallback(response.data)

        } else {
            if (timeoutID !== 0) {
                socketEventListenerCallback(response.data)

                window.clearTimeout(timeoutID)

                timeoutID = window.setTimeout(() => {
                    socketEventListenerCallback(response.data)

                    timeoutID = 0

                }, INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES)
            }
        }
    })
}
