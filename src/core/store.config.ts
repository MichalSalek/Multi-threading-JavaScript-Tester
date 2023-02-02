import {socketSlice} from '@/application/socket-client/socket.slice'
import {controlPanelSlice} from '@/core/layout/components/atoms-and-molecules/control-panel/controlPanel.slice'
import {workersSlice} from '@/application/workers/workers.slice'
import {calculationWorkersSlice} from '@/core/features/calculations-workers/calculationsWorkers.slice'



export const getReducersReference = {
    reducer: {

        // ***
        //
        workersSlice: workersSlice.reducer,
        calculationWorkersSlice: calculationWorkersSlice.reducer,
        socketSlice: socketSlice.reducer,
        controlPanelSlice: controlPanelSlice.reducer


    }
}
