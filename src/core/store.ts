import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import loginReducer from '@/features/user-login/loginSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      userLogin: loginReducer
    },
  })
}

const store = makeStore()

// TypeScript types handling
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
