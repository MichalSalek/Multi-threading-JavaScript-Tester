import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppState} from '@/application/store/store'
import {
    CalculationWorkerComplexityStateReport,
    CalculationWorkerWorkState,
    CalculationWorkerWorkStateReport,
    NamedWorkerComplexityStatusType,
    NamedWorkerWorkStatusType,
    CalculationWorkersGlobalComplexityType
} from '@/core/features/calculations-workers/calculationsWorkers.types'
import {WorkersAmount} from '@/application/workers/workers.types'



export type CalculationWorkersSlice = {
  actuallyWorks: WorkersAmount
  globalComplexity: CalculationWorkersGlobalComplexityType
  workStatuses: NamedWorkerWorkStatusType
  complexityStatuses: NamedWorkerComplexityStatusType
}


const initialState: CalculationWorkersSlice = {
    actuallyWorks: 0,
    globalComplexity: undefined,
    workStatuses: {},
    complexityStatuses: {}
}


export const calculationWorkersSlice = createSlice({
    name: 'calculationWorkersSlice',
    initialState,
    reducers: {


        handleGlobalComplexityChange: (state, action: PayloadAction<CalculationWorkersGlobalComplexityType>) => {
            state.globalComplexity = action.payload
        },


        handleWorkerWorkStateReport: (state, action: PayloadAction<CalculationWorkerWorkStateReport>) => {
            const {workerName, working} = action.payload

            const namedWorkerStatus: NamedWorkerWorkStatusType = {
                [workerName]: {working}
            }
            if (state.workStatuses[workerName]) {
                state.workStatuses[workerName].working = working
            } else {
                state.workStatuses = {...state.workStatuses, ...namedWorkerStatus}
            }

            state.actuallyWorks = Object.values(state.workStatuses)
                .filter((someWorkerWorkState: CalculationWorkerWorkState) => someWorkerWorkState.working).length
        },


        handleWorkerComplexityStateReport: (state, action: PayloadAction<CalculationWorkerComplexityStateReport>) => {
            const {workerName, complexity} = action.payload

            const namedWorkerStatus: NamedWorkerComplexityStatusType = {
                [workerName]: {complexity}
            }
            if (state.complexityStatuses[workerName]) {
                state.complexityStatuses[workerName].complexity = complexity
            } else {
                state.complexityStatuses = {...state.complexityStatuses, ...namedWorkerStatus}
            }
        }
    }
})

export const {
    handleGlobalComplexityChange,
    handleWorkerWorkStateReport,
    handleWorkerComplexityStateReport
} = calculationWorkersSlice.actions


export const selectWholeWorkersWorkState = ({calculationWorkersSlice}: AppState): NamedWorkerWorkStatusType => calculationWorkersSlice.workStatuses
export const selectActuallyWorkingWorkersAmount = ({calculationWorkersSlice}: AppState): WorkersAmount => calculationWorkersSlice.actuallyWorks
export const selectWholeWorkersComplexityState = ({calculationWorkersSlice}: AppState): NamedWorkerComplexityStatusType => calculationWorkersSlice.complexityStatuses
export const selectGlobalComplexityAmount = ({calculationWorkersSlice}: AppState): CalculationWorkersGlobalComplexityType => calculationWorkersSlice.globalComplexity
export const selectIsAllOfWorkersWorking = ({workersSlice, calculationWorkersSlice}: AppState): boolean => calculationWorkersSlice.actuallyWorks === workersSlice.requestedAmount
export const selectIsAnyWorkerWorking = ({calculationWorkersSlice}: AppState): boolean => calculationWorkersSlice.actuallyWorks > 0


export default calculationWorkersSlice.reducer
