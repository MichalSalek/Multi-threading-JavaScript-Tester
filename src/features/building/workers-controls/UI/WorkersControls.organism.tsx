import React from 'react'
import WorkersSwitchesViewContainerMolecule
    from '@/features/building/workers-controls/UI/WorkersSwitchesViewContainer.molecule'
import WorkersAmountMolecule from '@/features/building/workers-controls/UI/WorkersAmount.molecule'
import scss from '@/features/building/workers-controls/UI/WorkersView.module.scss'
import { GlobalComplexitySetMolecule } from '@/features/building/global-complexity-set/UI/GlobalComplexitySet.molecule'



const WorkersControlsOrganism = (): JSX.Element => {

    return (<>

        <section className={scss.marginBottom}>

            <WorkersAmountMolecule/>

            <GlobalComplexitySetMolecule/>

        </section>

        <WorkersSwitchesViewContainerMolecule/>

    </>)
}

export default WorkersControlsOrganism
