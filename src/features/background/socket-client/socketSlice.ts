import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import store, { AppState } from '@/core/store.core'
import { INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES } from '@/app-config-constants'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import { SocketResponseType } from '@/features/background/socket-client/socket.types'
import { WorkersJobsType } from '@/features/background/web-workers-configuration/webWorkers.types'
import { sendTriggerMessageToSocket } from '@/features/background/socket-client/socket.api'
import { ROUTE_API_WEB_SOCKET } from '@/core/routes.core'
import { addConsoleVerbose } from '@/features/background/verbose-logs/verboseLogs.api'



interface IConnectSocketThunkPayload {
    isSocketActive: boolean
}


export const connectSocketThunk = createAsyncThunk('connectSocketThunk', async () => {
    return await new Promise<IConnectSocketThunkPayload>((resolve) => {
        fetch(ROUTE_API_WEB_SOCKET).finally(async () => {
            const ioSocket = await io().connect()

            ioSocket.on('connect', () =>
                addConsoleVerbose('Socket-client connected to Socket-server.'))
            ioSocket.on('disconnect', () =>
                addConsoleVerbose('Socket-client disconnected from Socket-server.'))


            // Pin socket for an App common usage
            //
            window.clientSocket = ioSocket


            // Enable listening and passing the last data with all calculation jobs done from Socket to Redux store
            //
            let timeoutID = 0
            ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, (response: SocketResponseType<WorkersJobsType>) => {

                if (INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES === 0) {
                    store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))
                } else {
                    if (timeoutID !== 0) {
                        store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))

                        window.clearTimeout(timeoutID)

                        timeoutID = window.setTimeout(() => {

                            store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))
                            timeoutID = 0

                        }, INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES)
                    }
                }
            })


            ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.wholeSummaryGetOnly, (response: SocketResponseType<string[]>) => {
                console.log(response)
                console.table(response)
            })


            // When listening is enabled - trigger Socket to send last Server data
            //
            sendTriggerMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, undefined)

            resolve({isSocketActive: true})
        })
    })
})


interface ISocketState {
    active: boolean
    lastReceivedData: WorkersJobsType
}


const initialState: ISocketState = {
    active: false,
    lastReceivedData: {}
}

export const socketSlice = createSlice({
    name: 'socketSlice',
    initialState,
    reducers: {

        handleNewDataReceiveFromSocket: (state, action: PayloadAction<WorkersJobsType>) => {
            state.lastReceivedData = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(connectSocketThunk.fulfilled, (state, action: PayloadAction<IConnectSocketThunkPayload>) => {
            state.active = action.payload.isSocketActive
        })
    }
})


export const selectSocketIsActive = (state: AppState): boolean => state.socketSlice.active
export const selectLastSocketResponseData = (state: AppState): WorkersJobsType => state.socketSlice.lastReceivedData


export default socketSlice.reducer
