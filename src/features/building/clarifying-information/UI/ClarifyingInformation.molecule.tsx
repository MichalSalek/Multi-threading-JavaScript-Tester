import React from 'react'
import { Typography } from '@mui/material'
import scss from './clarifyingInformation.module.scss'



const ClarifyingInformationMolecule = (): JSX.Element => {

    return <main className={scss.host}>


        <section className={scss.textBlock}>
            <Typography variant="h4"> Multithreading JavaScript tester.</Typography>
            <Typography variant="h6"> This application is used to artificially load the CPU with calculations performed
                by
                JavaScript.</Typography>
            <Typography variant="body1"> Using WebWorkers, you can delegate calculations to other threads, so that the
                page
                you are currently on will run without any loss of smoothness. </Typography>
            <Typography variant="body1">Why? The main thread responsible for drawing
                the GUI will remain unencumbered.</Typography>
        </section>


        <section className={scss.textBlock}>
            <Typography variant="h6"> To understand what is happening,</Typography>
            <Typography variant="body2"> you need to monitor your
                device&apos;s CPU load. </Typography>
            <Typography variant="h6"> Are you a Windows user? Press all these buttons simultaneously:</Typography>
        </section>


        <section className={scss.textBlock}>
            <Typography variant="h6"><i className="fad fa-keyboard"/> CTRL + LEFT SHIFT + ESC</Typography>
            <Typography variant="body2">Then go to second tab - Performance</Typography>
        </section>

    </main>
}

export default ClarifyingInformationMolecule