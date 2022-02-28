import React from 'react'
import WorkersSwitchesViewContainerMolecule
    from '@/features/building/workers-controls/UI/WorkersSwitchesViewContainer.molecule'
import WorkersAmountMolecule from '@/features/building/workers-controls/UI/WorkersAmount.molecule'
import MainThreadSwitchMolecule from '@/features/building/main-thread-switch/UI/MainThreadSwitch.molecule'



const WorkersControlsOrganism = (): JSX.Element => {

    return (<>

        <MainThreadSwitchMolecule/>

        <WorkersAmountMolecule/>

        <WorkersSwitchesViewContainerMolecule/>

    </>)
}

export default WorkersControlsOrganism
