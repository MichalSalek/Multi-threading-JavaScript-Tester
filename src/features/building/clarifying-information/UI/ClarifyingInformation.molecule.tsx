import React from 'react'
import { Typography } from '@mui/material'
import scss from './clarifyingInformation.module.scss'



const ClarifyingInformationMolecule = (): JSX.Element => {

    return <main className={scss.host}>


        <section className={scss.textBlock}>
            <Typography variant="h4">

                Multithreading JavaScript tester.

            </Typography>
            <Typography variant="h6">

                This application is used to artificially load the CPU with calculations performed by JavaScript.

            </Typography>
            <Typography variant="body1">

                In general, using a WebWorkers you can delegate heavy tasks to other
                threads

            </Typography>
            <Typography variant="body1">

                What does means? Instead of using your server resources and user client transfer
                - you can do it instantly within the user browser - but without slowing down the user interface.

            </Typography>
            <Typography variant="body1">

                The page you are currently on will run without any loss of smoothness.

            </Typography>
            <Typography variant="body1">

                Why? The main thread responsible for drawing the GUI will remain unencumbered.

            </Typography>
        </section>


        <section className={scss.textBlock}>
            <Typography variant="h6">

                To understand what is happening,

            </Typography>
            <Typography variant="body2">

                you need to monitor your device&apos;s CPU load.

            </Typography>
        </section>


        <section className={scss.textBlock}>
            <Typography variant="h5">

                Are you a Microsoft Windows user?

            </Typography>
            <Typography variant="body2">

                Press all these buttons simultaneously:

            </Typography>
            <Typography variant="h6">

                CTRL <strong>+</strong> LEFT SHIFT <strong>+</strong> ESC
                <i className="fad fa-keyboard"/>

            </Typography>
            <Typography variant="body2">

                Then go to second tab - Performance

            </Typography>
        </section>


        <section className={scss.textBlock}>
            <Typography variant="h5">

                Using smartphone?

            </Typography>
            <Typography variant="body2">

                Find an app like CPU monitor in the app store.

            </Typography>
        </section>

    </main>
}

export default ClarifyingInformationMolecule