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
} from '@/features/background/web-workers-configuration/webWorkers.types'
import { getValidatedPassedAmount } from '@/features/background/web-workers-configuration/webWorkers.api'
import { MAX_WORKERS_LIMIT } from '@/app-config-constants'



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

        handleWorkerAmountChange: (state, action: PayloadAction<{ amountChangeCommand: WorkerAmountChangeActionEnum, amount?: number }>) => {
            switch (action.payload.amountChangeCommand) {
            case WorkerAmountChangeActionEnum.setAmount:
                if (typeof action.payload.amount === 'undefined') break
                state.requestedAmount.amount = getValidatedPassedAmount(action.payload.amount, 0, MAX_WORKERS_LIMIT)
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

export const selectRequestedWorkersAmount = ({calculationsWorkersSlice}: AppState): WorkersAmountStateType => calculationsWorkersSlice.requestedAmount
export const selectWholeWorkersReadyState = ({calculationsWorkersSlice}: AppState): NamedWorkerReadyStatusType => calculationsWorkersSlice.readyStatuses
export const selectWholeWorkersWorkState = ({calculationsWorkersSlice}: AppState): NamedWorkerWorkStatusType => calculationsWorkersSlice.workStatuses
export const selectActuallyWorkingWorkersAmount = ({calculationsWorkersSlice}: AppState): WorkersAmountStateType => calculationsWorkersSlice.actuallyWorks
export const selectWholeWorkersErrorState = ({calculationsWorkersSlice}: AppState): NamedWorkerErrorStatusType => calculationsWorkersSlice.errorStatuses // @TODO worker error handling

export const selectIsAnyWorkerWorking = ({calculationsWorkersSlice}: AppState): boolean => calculationsWorkersSlice.actuallyWorks.amount > 0
export const selectIsAllOfWorkersWorking = ({calculationsWorkersSlice}: AppState): boolean => calculationsWorkersSlice.actuallyWorks.amount === calculationsWorkersSlice.requestedAmount.amount
export const selectIsNoWorkerActive = ({calculationsWorkersSlice}: AppState): boolean => calculationsWorkersSlice.requestedAmount.amount === 0

export default webWorkersSlice.reducer
