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

// All visibility switch control possibilities - no enums, no hard-typed strings.
// You can use it to handle some crazy logic - without data turnouts (single source of truth).
//
export type VisibilityOfSystemComponentNameType = keyof typeof initialState.visibilitySwitches

export const possibleControlPanelSwitchesNames = Object.keys(initialState.visibilitySwitches) as VisibilityOfSystemComponentNameType[]

type ControlPanelSwitchVisibilityType = { name: VisibilityOfSystemComponentNameType; switchState?: boolean | undefined }

export const controlPanelSlice = createSlice({
    name: 'controlPanelSlice',
    initialState,
    reducers: {

        handleControlPanelSwitchVisibility: (state, action: PayloadAction<ControlPanelSwitchVisibilityType>) => {
            const actionSwitchName = action.payload.name
            const newSwitchValue = action.payload.switchState

            const existingSwitchValues = state.visibilitySwitches
            
            state.visibilitySwitches[actionSwitchName] = (typeof newSwitchValue === 'undefined') ? !existingSwitchValues[actionSwitchName] : newSwitchValue
        }
    }
})

// Listen to changes at the visibility of whole system components
//
export const selectSystemComponentsVisibilities = (state: AppState): ISystemComponentsVisibilities => state.controlPanelSlice.visibilitySwitches

export const {
    handleControlPanelSwitchVisibility
} = controlPanelSlice.actions

export default controlPanelSlice.reducer
