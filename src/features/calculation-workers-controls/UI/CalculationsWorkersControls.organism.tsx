import React from 'react'
import CalculationsWorkersViewMolecule
    from '@/features/calculation-workers-controls/UI/CalculationsWorkersView.molecule'
import CalculationsWorkersAmountMolecule
    from '@/features/calculation-workers-controls/UI/CalculationsWorkersAmount.molecule'
import CalculationWorkersWorkSwitchMolecule
    from '@/features/calculation-workers-controls/UI/CalculationWorkersWorkSwitch.molecule'
import { MAIN_THREAD_KEY } from '@/app-config-and-utils'



const CalculationsWorkersControlsOrganism = (): JSX.Element => {
    return (<>
        <CalculationWorkersWorkSwitchMolecule workerKey={MAIN_THREAD_KEY}/>
        <CalculationsWorkersAmountMolecule/>
        <CalculationsWorkersViewMolecule/>
    </>)
}

export default CalculationsWorkersControlsOrganism
