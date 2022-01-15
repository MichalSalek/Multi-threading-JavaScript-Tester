import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {io} from 'socket.io-client'
import store, {AppState} from '@/core/store.core'
import {ROUTE_API_WEB_SOCKET} from '@/core/routes.core'
import {INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES, runInDevEnvOnly} from '@/utils-and-constants.core'
import {WEB_SOCKET_EVENTS_TRIGGERS} from '@/features/socket-client/socketEventsEntities'
import {SocketResponseType} from '@/features/socket-client/socket.types'
import {WorkersJobsType} from '@/features/workers/workers.types'
import {sendTriggerMessageToSocket} from '@/features/socket-client/socket.api'
import {UnknownFunctionType} from '@/core/types.core'





// Przyjmuje obiekt eventów Record<T (=nazwa klucza), D(=alias dla nazwy eventu :string)> a zwraca ten sam obiekt,
// ale odpowiedzi callbacków Record<T, ((response) => ), ((response) => )>
// będzie to serwisik obsługujący łączność z Socketem i ogarniąjący konkretne DTO - dostaje i odbiera całkowicie generyczne informacje
// ale działa i robi robotę - ma konkretne odpowiedzialności i jest w pełni
// samo-wystarczalny (opiera się tylko na wymaganych i najbardziej jak się da - uproszczonych parametrach)
// Response event key name
// type ResponseEventKeyName = string
// type TriggerEventName = string
// export const connectionSocketDomain = async (SOCKET_URL_TO_CONNECT_TO: string, INPUT_DTO: Record<ResponseEventKeyName, TriggerEventName>): Promise<Record<ResponseEventKeyName, UnknownFunctionType<SocketResponseType<unknown>>>> => {
// 	return await new Promise((resolve) => {
// 		fetch(SOCKET_URL_TO_CONNECT_TO).finally(async () => {
// 			const ioSocket = await io().connect()
//
// 			ioSocket.on('connect', () =>
// 				runInDevEnvOnly(() => console.log('Socket-client connected to Socket-server.')))
// 			ioSocket.on('disconnect', () =>
// 				runInDevEnvOnly(() => console.warn('Socket-client disconnected from Socket-server.')))
//
//
//
// 			// Pin socket for an App common usage
// 			//
// 			window.clientSocket = ioSocket
//
//
// 			// Enable listening and passing the last data with all calculation jobs done from Socket to Redux store
// 			//
// 			let timeoutID = 0
// 			ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, (response: SocketResponseType<WorkersJobsType>) => {
//
// 				if (INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES === 0) {
// 					store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))
// 				} else {
// 					if (!timeoutID) {
// 						store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))
// 						timeoutID = window.setTimeout(() => {
//
// 							store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))
// 							timeoutID = 0
//
// 						}, INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES)
// 					}
// 				}
// 			})
//
//
// 			ioSocket.on(WEB_SOCKET_EVENTS_TRIGGERS.wholeSummaryGetOnly, (response: SocketResponseType<string[]>) => {
// 				console.log(response)
// 				console.table(response)
// 			})
//
//
// 			// When listening is enabled - trigger Socket to send last Server data
// 			//
// 			sendTriggerMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, undefined)
//
// 			resolve({isSocketActive: true})
// 		})
//
// 	})
// }


interface IConnectSocketThunkPayload {
	isSocketActive: boolean
}

export const connectSocketThunk = createAsyncThunk('connectSocketThunk', async () => {
	return await new Promise<IConnectSocketThunkPayload>((resolve) => {
		fetch('api/_/socket-io-server').finally(async () => {
			const ioSocket = await io().connect()

			ioSocket.on('connect', () =>
				runInDevEnvOnly(() => console.log('Socket-client connected to Socket-server.')))
			ioSocket.on('disconnect', () =>
				runInDevEnvOnly(() => console.warn('Socket-client disconnected from Socket-server.')))



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
					if (!timeoutID) {
						store.dispatch(socketSlice.actions.handleNewDataReceiveFromSocket(response.data))
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
