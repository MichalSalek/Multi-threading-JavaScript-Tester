import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/types/types-external'
import { AppState } from '@/core/store.core'
import {
    IWorkerErrorStateReport,
    IWorkerReadyStateReport,
    IWorkerWorkState,
    IWorkerWorkStateReport,
    NamedWorkerErrorStatusType,
    NamedWorkerReadyStatusType,
    NamedWorkerWorkStatusType,
    WorkerAmountChangeActionEnum,
    WorkersAmountStateType
} from '@/features/web-workers-configuration/webWorkers.types'
import { getValidatedAndCorrectRequestedWorkersAmount } from '@/features/web-workers-configuration/webWorkers.api'



export const dispatchActuallyWorkingWorkersAmount = (workerSlice: WritableDraft<IWorkersSlice>): void => {
    workerSlice.actuallyWorks = {
        amount: Object.values(workerSlice.workStatuses)
            .filter((someWorkerWorkState: IWorkerWorkState) => someWorkerWorkState.working).length
    }
}


export interface IWorkersSlice {
    requestedAmount: WorkersAmountStateType
    actuallyWorks: WorkersAmountStateType
    readyStatuses: NamedWorkerReadyStatusType
    workStatuses: NamedWorkerWorkStatusType
    errorStatuses: NamedWorkerErrorStatusType
}


const initialState: IWorkersSlice = {
    requestedAmount: {
        amount: 0
    },
    actuallyWorks: {
        amount: 0
    },
    readyStatuses: {},
    workStatuses: {},
    errorStatuses: {}
}


export const webWorkersSlice = createSlice({
    name: 'calculationsWorkersSlice',
    initialState,
    reducers: {

        handleWorkerAmountChange: (state, action: PayloadAction<{ amountChangeAction: WorkerAmountChangeActionEnum, amount?: number }>) => {
            switch (action.payload.amountChangeAction) {
            case WorkerAmountChangeActionEnum.setAmount:
                if (typeof action.payload.amount === 'undefined') break
                state.requestedAmount.amount = getValidatedAndCorrectRequestedWorkersAmount(action.payload.amount)
                break
            case WorkerAmountChangeActionEnum.addOne:
                state.requestedAmount.amount += 1
                break
            case WorkerAmountChangeActionEnum.removeLast:
                state.requestedAmount.amount -= 1
            }
        },

        handleWorkerReadyStateReport: (state, action: PayloadAction<IWorkerReadyStateReport>) => {
            const {workerName, ready} = action.payload

            const namedWorkerReadyStatus: NamedWorkerReadyStatusType = {
                [workerName]: {ready}
            }

            if (state.readyStatuses[workerName]) {
                state.readyStatuses[workerName].ready = ready
            } else {
                state.readyStatuses = {...state.readyStatuses, ...namedWorkerReadyStatus}
            }
        },

        handleWorkerWorkStateReport: (state, action: PayloadAction<IWorkerWorkStateReport>) => {
            const {workerName, working} = action.payload

            const namedWorkerWorkStatus: NamedWorkerWorkStatusType = {
                [workerName]: {working}
            }
            if (state.workStatuses[workerName]) {
                state.workStatuses[workerName].working = working
            } else {
                state.workStatuses = {...state.workStatuses, ...namedWorkerWorkStatus}
            }

            dispatchActuallyWorkingWorkersAmount(state)
        },

        handleWorkerErrorStateReport: (state, action: PayloadAction<IWorkerErrorStateReport>) => {
            const {workerName, error} = action.payload

            const namedWorkerErrorStatus: NamedWorkerErrorStatusType = {
                [workerName]: {error}
            }
            if (state.errorStatuses[workerName]) {
                state.errorStatuses[workerName].error = error
            } else {
                state.errorStatuses = {...state.errorStatuses, ...namedWorkerErrorStatus}
            }
        }
    }
})

export const {
    handleWorkerAmountChange,
    handleWorkerReadyStateReport,
    handleWorkerWorkStateReport,
    handleWorkerErrorStateReport
} = webWorkersSlice.actions

export const selectRequestedWorkersAmount = (state: AppState): WorkersAmountStateType => state.calculationsWorkersSlice.requestedAmount
export const selectWholeWorkersReadyState = (state: AppState): NamedWorkerReadyStatusType => state.calculationsWorkersSlice.readyStatuses
export const selectWholeWorkersWorkState = (state: AppState): NamedWorkerWorkStatusType => state.calculationsWorkersSlice.workStatuses
export const selectActuallyWorkingWorkersAmount = (state: AppState): WorkersAmountStateType => state.calculationsWorkersSlice.actuallyWorks
export const selectWholeWorkersErrorState = (state: AppState): NamedWorkerErrorStatusType => state.calculationsWorkersSlice.errorStatuses // można zrobić mechanizm randomowych errorów i dodać obsługę błędów workerów

export default webWorkersSlice.reducer
