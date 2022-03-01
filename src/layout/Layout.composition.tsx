import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'

import Header from '@/layout/partials/Header'
import scss from './partials/Layout.module.scss'
import { Container } from '@mui/material'
import Footer from '@/layout/partials/Footer'



const LayoutComposition = ({children}: { children: ReactElement<AppProps, JSXElementConstructor<unknown>> }) => {

    return (
        <main className={scss.hostMain}>
            <Header/>
            <main className={scss.main}>
                <Container className={scss.globalContainer} maxWidth={'xl'}>{children}</Container>
            </main>
            <Footer/>
        </main>
    )
}

export default LayoutComposition
