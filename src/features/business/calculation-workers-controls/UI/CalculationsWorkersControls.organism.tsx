import React from 'react'
import CalculationsWorkersViewMolecule
    from '@/features/business/calculation-workers-controls/UI/CalculationsWorkersView.molecule'
import CalculationsWorkersAmountMolecule
    from '@/features/business/calculation-workers-controls/UI/CalculationsWorkersAmount.molecule'
import CalculationWorkersWorkSwitchMolecule
    from '@/features/business/calculation-workers-controls/UI/CalculationWorkersWorkSwitch.molecule'
import { MAIN_THREAD_KEY } from '@/app-config-constants'



const CalculationsWorkersControlsOrganism = (): JSX.Element => {
    return (<>
        <CalculationWorkersWorkSwitchMolecule workerKey={MAIN_THREAD_KEY}/>
        <CalculationsWorkersAmountMolecule/>
        <CalculationsWorkersViewMolecule/>
    </>)
}

export default CalculationsWorkersControlsOrganism
