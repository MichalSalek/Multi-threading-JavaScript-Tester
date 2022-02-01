import React from 'react'
import { useMainThreadCalculations } from '@/features/calculation-workers-controls/calculationWorkersControls.hooks'
import AppButtonAtom from '@/app-components/AppButton.atom'



const CalculationWorkersMainThreadWorkSwitchMolecule = (): JSX.Element => {

    const [isMainThreadOn, handleMainThreadSwitchChange] =
        useMainThreadCalculations(120, 80, false)


    return (<>
        <AppButtonAtom onClick={handleMainThreadSwitchChange}
        ><span>Main thread job is: {isMainThreadOn ? <strong>ON</strong> : 'OFF'}</span>
        </AppButtonAtom>
        <br/>
    </>)
}

export default CalculationWorkersMainThreadWorkSwitchMolecule
