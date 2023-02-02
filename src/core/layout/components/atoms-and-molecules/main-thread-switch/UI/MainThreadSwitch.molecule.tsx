import React from 'react'
import {PopoverTitleMolecule} from '@/core/layout/components/atoms-and-molecules/popover-title/UI/PopoverTitle.molecule'
import scss from './mainThreadSwitch.module.scss'
import dynamic from 'next/dynamic'
import {WorkersPolicy} from '../../../../../../../shared-policies/workers.policy'



const WorkersWorkSwitchMolecule = dynamic(() =>
    import('@/core/layout/components/atoms-and-molecules/workers/work-switch/UI/WorkersWorkSwitch.molecule'), {ssr: false})


const MainThreadSwitchMolecule = (): JSX.Element => {


    return (
        <section className={scss.host}>

            <PopoverTitleMolecule
                popoverTextContent={'Control the use of the main, standard thread. In this case, no Worker\n' +
          '                        will\n' +
          '                        be\n' +
          '                        used.' + 'Causes loss of GUI smoothness. Animations may be slowed down. Try to\n' +
          '                        start\n' +
          '                        with\n' +
          '                        a low values.'}
                titleTextContent={'Main browser\'s thread:'}
            />
            <WorkersWorkSwitchMolecule workerKey={WorkersPolicy.MAIN_THREAD_KEY}/>

        </section>
    )
}

export default MainThreadSwitchMolecule
