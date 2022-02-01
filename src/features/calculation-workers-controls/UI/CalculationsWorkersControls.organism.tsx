import React from 'react'
import CalculationWorkersMainThreadWorkSwitchMolecule
    from '@/features/calculation-workers-controls/UI/CalculationWorkersMainThreadWorkSwitch.molecule'
import CalculationsWorkersViewMolecule
    from '@/features/calculation-workers-controls/UI/CalculationsWorkersView.molecule'
import CalculationsWorkersAmountMolecule
    from '@/features/calculation-workers-controls/UI/CalculationsWorkersAmount.molecule'



const CalculationsWorkersControlsOrganism = (): JSX.Element => {
    return (<>
        <CalculationWorkersMainThreadWorkSwitchMolecule/>
        <CalculationsWorkersAmountMolecule/>
        <CalculationsWorkersViewMolecule/>
    </>)
}

export default CalculationsWorkersControlsOrganism
