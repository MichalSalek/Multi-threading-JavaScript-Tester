import React from 'react'
import { NextPage } from 'next'

import CalculationWorkersMainThreadWorkSwitchMolecule
    from '@/features/calculation-workers-controls/UI/CalculationWorkersMainThreadWorkSwitch.molecule'
import CalculationsWorkersGeneratorOrganism
    from '@/features/calculation-workers-controls/UI/CalculationsWorkersGenerator.organism'



const MainAppScreenPage: NextPage = () => {

    return (
        <>
            <CalculationWorkersMainThreadWorkSwitchMolecule/>

            <CalculationsWorkersGeneratorOrganism/>
        </>
    )
}

export default MainAppScreenPage
