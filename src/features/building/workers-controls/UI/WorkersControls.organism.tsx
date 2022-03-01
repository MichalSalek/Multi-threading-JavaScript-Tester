import React from 'react'
import WorkersAmountMolecule from '@/features/building/workers-amount/UI/WorkersAmount.molecule'
import scss from './workersControls.module.scss'
import { GlobalComplexitySetMolecule } from '@/features/building/global-complexity-set/UI/GlobalComplexitySet.molecule'



const WorkersControlsOrganism = (): JSX.Element => {

    return (<section className={scss.host}>

        <WorkersAmountMolecule/>

        <GlobalComplexitySetMolecule/>

    </section>)
}

export default WorkersControlsOrganism
