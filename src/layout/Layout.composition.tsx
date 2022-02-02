import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'

import Header from '@/layout/partials/Header'
import scss from './partials/Layout.module.scss'
import { Container } from '@mui/material'



const LayoutComposition = ({children}: { children: ReactElement<AppProps, JSXElementConstructor<unknown>> }) => {

    return (
        <main className={scss.hostMain}>
            <Header/>
            <main className={scss.main}>
                <Container>{children}</Container>
            </main>
            {/*<Footer/>*/}
        </main>
    )
}

export default LayoutComposition
