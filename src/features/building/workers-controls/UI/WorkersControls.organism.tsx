import React from 'react'
import WorkersSwitchViewContainerMolecule
    from '@/features/building/workers-controls/UI/WorkersSwitchViewContainer.molecule'
import WorkersAmountMolecule from '@/features/building/workers-controls/UI/WorkersAmount.molecule'
import WorkersWorkSwitchMolecule
    from '@/features/building/workers-controls/UI/WorkersWorkSwitch.molecule'
import { MAIN_THREAD_KEY } from '@/app-config-constants'



const WorkersControlsOrganism = (): JSX.Element => {
    return (<>
        <WorkersWorkSwitchMolecule workerKey={MAIN_THREAD_KEY}/>
        <WorkersAmountMolecule/>
        <WorkersSwitchViewContainerMolecule/>
    </>)
}

export default WorkersControlsOrganism
