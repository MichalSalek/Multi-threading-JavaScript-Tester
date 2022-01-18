import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '@/core/store.core'



export interface ISystemComponentsVisibilities {
    FPSMonitor: boolean
    scoreboard: boolean
}


interface IControlPanelState {
    visibilitySwitches: ISystemComponentsVisibilities
}


const initialState: IControlPanelState = {
    visibilitySwitches: {
        FPSMonitor: true,
        scoreboard: true
    }
} as const

export type VisibilityOfSystemComponentType = keyof typeof initialState.visibilitySwitches

export const controlPanelSlice = createSlice({
    name: 'controlPanelSlice',
    initialState,
    reducers: {

        handleFPSMonitorVisibility: (state, action: PayloadAction<boolean | undefined>) => {
            const existingSwitchValue = state.visibilitySwitches.FPSMonitor
            const newSwitchValue = action.payload

            state.visibilitySwitches.FPSMonitor = (typeof newSwitchValue === 'undefined') ? !existingSwitchValue : newSwitchValue
        },
        handleScoreboardVisibility: (state, action: PayloadAction<boolean | undefined>) => {
            const existingSwitchValue = state.visibilitySwitches.scoreboard
            const newSwitchValue = action.payload

            state.visibilitySwitches.scoreboard = (typeof newSwitchValue === 'undefined') ? !existingSwitchValue : newSwitchValue
        }
    }
})


export const selectSystemComponentsVisibilities = (state: AppState): ISystemComponentsVisibilities => state.controlPanelSlice.visibilitySwitches

export const {
    handleFPSMonitorVisibility,
    handleScoreboardVisibility
} = controlPanelSlice.actions

export default controlPanelSlice.reducer
