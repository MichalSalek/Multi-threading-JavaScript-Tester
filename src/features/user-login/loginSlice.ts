import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AppState} from "@/core/store";


export interface ILoginState {
	isUserLogIn: boolean;
}

const initialState: ILoginState = {
	isUserLogIn: true,
}

type TLoginPayloadAction = 'login' | 'logout';

export const loginSlice = createSlice({
	name: 'loginSlice',
	initialState,
	reducers: {
		logIn: state => {
			state.isUserLogIn = true
		},
		logOut: state => {
			state.isUserLogIn = false
		},
		handleLogin: (state, action: PayloadAction<TLoginPayloadAction>) => {
			action.payload === 'login' && (state.isUserLogIn = true)
			action.payload === 'logout' && (state.isUserLogIn = false)
		}
	}
})

export const {logIn, logOut, handleLogin} = loginSlice.actions

export const selectIsUserLogIn = (state: AppState): boolean => state.userLogin.isUserLogIn

export default loginSlice.reducer

// Logowanie będzie trzeba przerobić na akcje asynchroniczne
// Póki co obsługa jest fejkowa