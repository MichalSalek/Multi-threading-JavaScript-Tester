import React from 'react'
import { useMainThreadCalculations } from '@/features/calculation-workers-controls/calculationWorkersControls.hooks'



const CalculationWorkersMainThreadWorkSwitchMolecule = (): JSX.Element => {

    const [isMainThreadOn, handleMainThreadSwitchChange] =
        useMainThreadCalculations(120, 80, false)


    return (<>
        <button onClick={handleMainThreadSwitchChange}
        ><span>Main thread job is: {isMainThreadOn ? <strong>ON</strong> : 'OFF'}</span>
        </button>
        <br/>
    </>)
}

export default CalculationWorkersMainThreadWorkSwitchMolecule
