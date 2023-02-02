import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {getReducersReference} from '@/core/store.config'



export function makeStore() {
    return configureStore({...getReducersReference})
}

const store = makeStore()

// TypeScript types handling
//
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  AppState,
  unknown,
  Action<string>>

// Redux store hooks.
// Typed.
//
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
