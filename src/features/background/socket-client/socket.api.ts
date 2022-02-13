import { Socket } from 'socket.io-client'
import { WebSocketEventTriggersType } from '@/features/background/socket-client/socketEventsEntities'
import { AppToSocketDTO, AppToSocketEmitDTO, SocketToAppDTO } from '@/features/background/socket-client/socket.types'
import { INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES } from '@/app-config-constants'
import { addConsoleVerbose } from '@/features/background/verbose-logs/verboseLogs.api'



export const getSocketInstanceAbsolutely = () => window.clientSocket as Socket



export const sendTriggerMessageToSocket: AppToSocketEmitDTO = <T>(eventName: WebSocketEventTriggersType, data: AppToSocketDTO<T> | undefined): void => {
    getSocketInstanceAbsolutely().emit(eventName, data)
}


// Generic socket event listener, but only for a wide range of Application.
// It is strongly recommended to use it.
//
export const listenToSocketEventWithDebounce = <T>(
    socketClient: Socket,
    socketEventName: WebSocketEventTriggersType,
    socketEventListenerCallback: ((response: T) => void)): void => {

    let timeoutID = 0


    console.log('socketEventName:')
    console.log(socketEventName)

    socketClient.on(socketEventName, (response: SocketToAppDTO<T>) => {

        console.log('response:')
        console.log(response)

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
