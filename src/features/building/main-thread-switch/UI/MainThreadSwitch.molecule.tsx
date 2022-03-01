import React from 'react'
import { PopoverTitleMolecule } from '@/features/building/popover-title/UI/PopoverTitle.molecule'
import { MAIN_THREAD_KEY } from '@/app-config-constants'
import scss from './mainThreadSwitch.module.scss'
import dynamic from 'next/dynamic'



const WorkersWorkSwitchMolecule = dynamic(() =>
    import('@/features/building/workers-controls/UI/WorkersWorkSwitch.molecule'), {ssr: false})


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
                titleVariant={'h5'}
            />

            <WorkersWorkSwitchMolecule workerKey={MAIN_THREAD_KEY}/>
        </section>
    )
}

export default MainThreadSwitchMolecule
