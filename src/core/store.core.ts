import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {workersSlice} from '@/features/workers/workersSlice'
import {socketSlice} from '@/features/socket-client/socketSlice'



export function makeStore() {
	return configureStore({
		reducer: {
			calculationsWorkersSlice: workersSlice.reducer,
			socketSlice: socketSlice.reducer
		},
	})
}

const store = makeStore()

// TypeScript types handling
//
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// Redux store hooks.
// Typed.
//
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
