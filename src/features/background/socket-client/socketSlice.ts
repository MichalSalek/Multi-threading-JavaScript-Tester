import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import store, { AppState } from '@/core/store.core'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import { ClientBrowserIDType } from '@/features/background/socket-client/socket.types'
import {
    WorkerJobsByClientBrowserIDTypeDTO,
    WorkerJobsTypeDTO
} from '@/features/background/web-workers/webWorkers.types'
import {
    listenToSocketEventWithDebounce,
    sendCommandMessageToSocket
} from '@/features/background/socket-client/socket.api'
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



            //
            //
            // Enable listening and passing the last data:
            //


            // with all calculation jobs done
            //
            listenToSocketEventWithDebounce(ioSocket, WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone,
                (response: WorkerJobsByClientBrowserIDTypeDTO) => {
                    store.dispatch(socketSlice.actions.handleNewAnyWorkersJobDataReceiveFromSocket(response))
                })


            // with just client's browser calculation jobs done only
            //
            listenToSocketEventWithDebounce(ioSocket, WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone,
                (response: WorkerJobsTypeDTO) => {
                    store.dispatch(socketSlice.actions.handleNewClientBrowserWorkersJobDataReceiveFromSocket(response))
                })


            // with client's browser ID
            //
            listenToSocketEventWithDebounce(ioSocket, WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID,
                (response: ClientBrowserIDType) => {
                    store.dispatch(socketSlice.actions.handleNewClientBrowserID(response))
                })


            // When listening is enabled - trigger Socket to send current browser client ID
            //
            sendCommandMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, undefined)


            // The end of thunk
            //
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
