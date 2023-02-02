import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppState} from '@/application/store/store'
import {WorkersPolicy} from '../../../shared-policies/workers.policy'
import {
    NamedWorkerErrorStatusType,
    NamedWorkerReadyStatusType,
    WorkerAmountChangeActionEnum,
    WorkerErrorStateReport,
    WorkerReadyStateReport,
    WorkersAmount
} from '@/application/workers/workers.types'
import {getValidatedPassedAmount} from '@/application/workers/workers.api'



export type WorkersSlice = {
  requestedAmount: WorkersAmount
  readyStatuses: NamedWorkerReadyStatusType
  errorStatuses: NamedWorkerErrorStatusType
}


const initialState: WorkersSlice = {
    requestedAmount: 0,
    readyStatuses: {},
    errorStatuses: {}
}


export const workersSlice = createSlice({
    name: 'workersSlice',
    initialState,
    reducers: {

        handleWorkerAmountChange: (state, action: PayloadAction<{ amountChangeCommand: WorkerAmountChangeActionEnum, amount?: WorkersAmount }>) => {
            switch (action.payload.amountChangeCommand) {
            case WorkerAmountChangeActionEnum.setAmount:
                if (typeof action.payload.amount === 'undefined') break
                state.requestedAmount = getValidatedPassedAmount(action.payload.amount, 0, WorkersPolicy.MAX_WORKERS_LIMIT)
                break
            case WorkerAmountChangeActionEnum.addOne:
                state.requestedAmount += 1
                break
            case WorkerAmountChangeActionEnum.removeLast:
                state.requestedAmount -= 1
            }
        },


        handleWorkerReadyStateReport: (state, action: PayloadAction<WorkerReadyStateReport>) => {
            const {workerName, ready} = action.payload

            const namedWorkerStatus: NamedWorkerReadyStatusType = {
                [workerName]: {ready}
            }

            if (state.readyStatuses[workerName]) {
                state.readyStatuses[workerName].ready = ready
            } else {
                state.readyStatuses = {...state.readyStatuses, ...namedWorkerStatus}
            }
        },


        handleWorkerErrorStateReport: (state, action: PayloadAction<WorkerErrorStateReport>) => {
            const {workerName, error} = action.payload

            const namedWorkerStatus: NamedWorkerErrorStatusType = {
                [workerName]: {error}
            }
            if (state.errorStatuses[workerName]) {
                state.errorStatuses[workerName].error = error
            } else {
                state.errorStatuses = {...state.errorStatuses, ...namedWorkerStatus}
            }
        }

    }
})

export const {
    handleWorkerAmountChange,
    handleWorkerReadyStateReport,
    handleWorkerErrorStateReport
} = workersSlice.actions

export const selectRequestedWorkersAmount = ({workersSlice}: AppState): WorkersAmount => workersSlice.requestedAmount

export const selectWholeWorkersReadyState = ({workersSlice}: AppState): NamedWorkerReadyStatusType => workersSlice.readyStatuses

export const selectWholeWorkersErrorState = ({workersSlice}: AppState): NamedWorkerErrorStatusType => workersSlice.errorStatuses // @TODO worker error handling

export const selectIsNoWorkerActive = ({workersSlice}: AppState): boolean => workersSlice.requestedAmount === 0

export default workersSlice.reducer
