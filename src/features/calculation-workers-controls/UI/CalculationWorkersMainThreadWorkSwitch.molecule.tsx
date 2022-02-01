import React from 'react'
import { useMainThreadCalculations } from '@/features/calculation-workers-controls/calculationWorkersControls.hooks'
import { Button } from '@mui/material'



const CalculationWorkersMainThreadWorkSwitchMolecule = (): JSX.Element => {

    const [isMainThreadOn, handleMainThreadSwitchChange] =
        useMainThreadCalculations(120, 80, false)


    return (<>
        <Button onClick={handleMainThreadSwitchChange}
        ><span>Main thread job is: {isMainThreadOn ? <strong>ON</strong> : 'OFF'}</span>
        </Button>
        <br/>
    </>)
}

export default CalculationWorkersMainThreadWorkSwitchMolecule
