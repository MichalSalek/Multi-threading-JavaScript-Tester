import Fab from '@mui/material/Fab'
import React from 'react'
import {useAppSelector} from '@/application/store/store'
import {selectIsAnyWorkerWorking} from '@/core/features/calculations-workers/calculationsWorkers.slice'
import Zoom from '@mui/material/Zoom'
import Tooltip from '@mui/material/Tooltip'
import {selectRequestedWorkersAmount} from '@/application/workers/workers.slice'


const FloatingWorkersAmountAtom = (): JSX.Element => {

    const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)
    const isAnyWorkerWorking = useAppSelector(selectIsAnyWorkerWorking)

    return <Tooltip
        placement={'right-end'}
        title="Current workers amount."
        TransitionComponent={Zoom}>
        <Fab
            color={'primary'}
            sx={{
                opacity: '0.9',
                fontSize: '19px',
                margin: '0 auto',
                cursor: 'default',
                position: 'fixed',
                right: '30px',
                bottom: '10px',
                color: 'white',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: isAnyWorkerWorking ? '#2eb202' : '#027bde'
            }}

            size={'small'}
        >
            {workerRequestedAmount}
        </Fab>
    </Tooltip>
}

export default FloatingWorkersAmountAtom
