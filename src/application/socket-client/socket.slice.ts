import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {io} from 'socket.io-client'
import store, {AppState} from '@/application/store/store'
import {WEB_SOCKET_EVENTS_TRIGGERS} from '@/application/socket-client/socketEventsEntities'
import {ClientBrowserIDType} from '@/application/socket-client/socket.types'
import {listenToSocketEventsStream, sendCommandMessageToSocket} from '@/application/socket-client/socket.api'
import {addConsoleVerbose} from '@/application/logger/logger.api'
import {DBModel, WorkerJobsTypeDTO} from '../../../src-backend/features/db/db.types'
import {getRoute} from '@/application/routing/routing.api'



interface IConnectSocketThunkPayload {
  isSocketActive: boolean
}


export const connectSocketThunk = createAsyncThunk('connectSocketThunk', async () => {
    return await new Promise<IConnectSocketThunkPayload>((resolve) => {
        fetch(getRoute({routeName: 'API_WEB_SOCKET'})).finally(async () => {
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
            listenToSocketEventsStream(ioSocket, WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone,
                (response: DBModel) => {
                    store.dispatch(socketSlice.actions.handleNewAnyWorkersJobDataReceiveFromSocket(response))
                })


            // with just client's browser calculation jobs done only
            //
            listenToSocketEventsStream(ioSocket, WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone,
                (response: WorkerJobsTypeDTO) => {
                    store.dispatch(socketSlice.actions.handleNewClientBrowserWorkersJobDataReceiveFromSocket(response))
                })


            // with client's browser ID
            //
            listenToSocketEventsStream(ioSocket, WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID,
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
  lastReceivedAnyWorkerJobsData: DBModel
  lastReceivedClientBrowserWorkerJobsData: WorkerJobsTypeDTO
  clientBrowserID: ClientBrowserIDType | null
}


const initialState: ISocketState = {
    active: false,
    lastReceivedAnyWorkerJobsData: {},
    lastReceivedClientBrowserWorkerJobsData: {},
    clientBrowserID: null
} as const

export const socketSlice = createSlice({
    name: 'socketSlice',
    initialState,

    reducers: {

        handleNewAnyWorkersJobDataReceiveFromSocket: (state, action: PayloadAction<DBModel>) => {
            state.lastReceivedAnyWorkerJobsData = action.payload
        },
        handleNewClientBrowserWorkersJobDataReceiveFromSocket: (state, action: PayloadAction<WorkerJobsTypeDTO>) => {
            state.lastReceivedClientBrowserWorkerJobsData = action.payload
        },
        handleNewClientBrowserID: (state, action: PayloadAction<ClientBrowserIDType>) => {
            if (typeof state.clientBrowserID === 'string') return void undefined
            state.clientBrowserID = action.payload
            return state
        }
    },

    extraReducers: (builder: ActionReducerMapBuilder<ISocketState>) => {

        builder.addCase(connectSocketThunk.fulfilled, (state, action: PayloadAction<IConnectSocketThunkPayload>) => {
            if (state) {
                state.active = action.payload.isSocketActive
            }
        })
    }
})


export const selectSocketIsActive = (state: AppState): boolean => state.socketSlice.active
export const selectLastReceivedAnyWorkerJobsData = (state: AppState): DBModel => state.socketSlice.lastReceivedAnyWorkerJobsData
export const selectLastReceivedClientBrowserWorkerJobsData = (state: AppState): WorkerJobsTypeDTO => state.socketSlice.lastReceivedClientBrowserWorkerJobsData

export default socketSlice.reducer
