import React from 'react'
import { PopoverTitleMolecule } from '@/features/building/popover-title/UI/PopoverTitle.molecule'
import WorkersWorkSwitchMolecule from '@/features/building/workers-controls/UI/WorkersWorkSwitch.molecule'
import { MAIN_THREAD_KEY } from '@/app-config-constants'
import scss from './MainThreadSwitch.module.scss'



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
                titleTextContent={'The main thread of the browser'}
            />

            <WorkersWorkSwitchMolecule workerKey={MAIN_THREAD_KEY}/>
        </section>
    )
}

export default MainThreadSwitchMolecule
