import React from 'react'
import WorkersAmountMolecule from '@/core/layout/components/atoms-and-molecules/workers/amount/UI/WorkersAmount.molecule'
import scss from './workersControls.module.scss'
import { GlobalComplexitySetMolecule } from '@/core/layout/components/atoms-and-molecules/workers/global-complexity-set/UI/GlobalComplexitySet.molecule'



const WorkersControlsOrganism = (): JSX.Element => {

    return (<section className={scss.host}>

        <WorkersAmountMolecule/>

        <GlobalComplexitySetMolecule/>

    </section>)
}

export default WorkersControlsOrganism
