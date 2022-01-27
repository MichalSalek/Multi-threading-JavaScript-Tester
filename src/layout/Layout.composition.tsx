import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'
import { Container } from 'semantic-ui-react'

import Header from '@/layout/partials/Header'
import Footer from '@/layout/partials/Footer'
import scss from './partials/Layout.composition.module.scss'



const LayoutComposition = ({children}: { children: ReactElement<AppProps, JSXElementConstructor<unknown>> }) => {

    return (
        <main className={scss.hostMain}>
            <Header/>
            <main className={scss.main}>
                <Container>{children}</Container>
            </main>
            <Footer/>
        </main>
    )
}

export default LayoutComposition
