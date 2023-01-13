import React from 'react'
import { PopoverTitleMolecule } from '@/features/building/popover-title/UI/PopoverTitle.molecule'
import { MAIN_THREAD_KEY } from '@/core/constants.core'
import scss from './mainThreadSwitch.module.scss'
import dynamic from 'next/dynamic'
import {Container} from '@mui/material'



const WorkersWorkSwitchMolecule = dynamic(() =>
    import('@/features/building/workers/work-switch/UI/WorkersWorkSwitch.molecule'), {ssr: false})


const MainThreadSwitchMolecule = (): JSX.Element => {


    return (
        <section className={scss.host}>
            {/*<Container maxWidth={'sm'}>*/}
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
            <WorkersWorkSwitchMolecule workerKey={MAIN_THREAD_KEY}/>
            {/*</Container>*/}
        </section>
    )
}

export default MainThreadSwitchMolecule
