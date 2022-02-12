import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import store, { AppState } from '@/core/store.core'
import { INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES } from '@/app-config-constants'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import { ClientBrowserIDType, SocketToAppDTO } from '@/features/background/socket-client/socket.types'
import {
    WorkerJobsByClientBrowserIDTypeDTO,
    WorkerJobsTypeDTO
} from '@/features/background/web-workers-configuration/webWorkers.types'
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
            let timeoutID1 = 0
            ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, (request: SocketToAppDTO<WorkerJobsByClientBrowserIDTypeDTO>) => {
                console.log(request)
                if (INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES === 0) {
                    store.dispatch(socketSlice.actions.handleNewAnyWorkersJobDataReceiveFromSocket(request.data))
                } else {
                    if (timeoutID1 !== 0) {
                        store.dispatch(socketSlice.actions.handleNewAnyWorkersJobDataReceiveFromSocket(request.data))

                        window.clearTimeout(timeoutID1)

                        timeoutID1 = window.setTimeout(() => {

                            store.dispatch(socketSlice.actions.handleNewAnyWorkersJobDataReceiveFromSocket(request.data))
                            timeoutID1 = 0

                        }, INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES)
                    }
                }
            })


            // Enable listening and passing the last data with just client's browser calculation jobs done from Socket to Redux store
            //
            let timeoutID2 = 0
            ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone, (request: SocketToAppDTO<WorkerJobsTypeDTO>) => {

                console.log(request)
                if (INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES === 0) {
                    store.dispatch(socketSlice.actions.handleNewClientBrowserWorkersJobDataReceiveFromSocket(request.data))
                } else {
                    if (timeoutID2 !== 0) {
                        store.dispatch(socketSlice.actions.handleNewClientBrowserWorkersJobDataReceiveFromSocket(request.data))

                        window.clearTimeout(timeoutID2)

                        timeoutID2 = window.setTimeout(() => {

                            store.dispatch(socketSlice.actions.handleNewClientBrowserWorkersJobDataReceiveFromSocket(request.data))
                            timeoutID2 = 0

                        }, INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES)
                    }
                }
            })


            ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, (request: SocketToAppDTO<ClientBrowserIDType>) => {
                store.dispatch(socketSlice.actions.handleNewClientBrowserID(request.clientBrowserID))
            })

            // When listening is enabled - trigger Socket to send last Server data
            //
            sendTriggerMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, {
                data: undefined,
                userAgent: navigator.userAgent,
                status: 201
            })


            // @TODO table handling
            // ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.wholeSummaryGetOnly, (response: SocketToAppDTO<string[]>) => {
            //     console.log(response)
            //     console.table(response)
            // })


            resolve({isSocketActive: true})
        })
    })
})


type ISocketState = {
    active: boolean
    lastReceivedAnyWorkerJobsData: WorkerJobsByClientBrowserIDTypeDTO
    lastReceivedClientBrowserWorkerJobsData: WorkerJobsTypeDTO
    clientBrowserID: ClientBrowserIDType | null
}


const initialState: ISocketState = {
    active: false,
    lastReceivedAnyWorkerJobsData: {},
    lastReceivedClientBrowserWorkerJobsData: {},
    clientBrowserID: null
}

export const socketSlice = createSlice({
    name: 'socketSlice',
    initialState,

    reducers: {
        handleNewAnyWorkersJobDataReceiveFromSocket: (state, action: PayloadAction<WorkerJobsByClientBrowserIDTypeDTO>) => {
            state.lastReceivedAnyWorkerJobsData = action.payload
        },
        handleNewClientBrowserWorkersJobDataReceiveFromSocket: (state, action: PayloadAction<WorkerJobsTypeDTO>) => {
            state.lastReceivedClientBrowserWorkerJobsData = action.payload
        },
        handleNewClientBrowserID: (state, action: PayloadAction<ClientBrowserIDType>) => {
            console.log(action.payload)
            if (typeof state.clientBrowserID === 'string') return void undefined

            state.clientBrowserID = action.payload
        }
    },

    extraReducers: (builder) => {

        builder.addCase(connectSocketThunk.fulfilled, (state, action: PayloadAction<IConnectSocketThunkPayload>) => {
            state.active = action.payload.isSocketActive
        })
    }
})


export const selectSocketIsActive = (state: AppState): boolean => state.socketSlice.active
export const selectLastReceivedAnyWorkerJobsData = (state: AppState): WorkerJobsByClientBrowserIDTypeDTO => state.socketSlice.lastReceivedAnyWorkerJobsData
export const selectLastReceivedClientBrowserWorkerJobsData = (state: AppState): WorkerJobsTypeDTO => state.socketSlice.lastReceivedClientBrowserWorkerJobsData

export default socketSlice.reducer
