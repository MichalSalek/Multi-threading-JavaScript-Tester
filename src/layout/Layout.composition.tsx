import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'
import { Container } from 'semantic-ui-react'

import Navigation from '@/layout/partials/Navigation'
import Footer from '@/layout/partials/Footer'



const LayoutComposition = ({children}: { children: ReactElement<AppProps, JSXElementConstructor<unknown>> }) => {

    return (<nav>
        <Navigation/>
        <main>
            <Container>{children}</Container>
        </main>
        <Footer/>
    </nav>)
}

export default LayoutComposition
