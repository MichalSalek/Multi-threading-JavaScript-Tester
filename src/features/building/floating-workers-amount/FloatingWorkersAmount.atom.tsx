import Fab from '@mui/material/Fab'
import React from 'react'
import {useAppSelector} from '@/core/store.core'
import {selectIsAnyWorkerWorking, selectRequestedWorkersAmount} from '@/features/background/web-workers/webWorkersSlice'
import Zoom from '@mui/material/Zoom'
import Tooltip from '@mui/material/Tooltip'


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
            {workerRequestedAmount.amount}
        </Fab>
    </Tooltip>
}

export default FloatingWorkersAmountAtom
