import React, {JSXElementConstructor, ReactElement, ReactNode} from 'react'
import { AppProps } from 'next/app'

import Header from '@/layout/partials/Header'
import scss from './Layout.module.scss'
import { Container } from '@mui/material'
import Footer from '@/layout/partials/Footer'

type Props = {
  children: ReactNode
}

const LayoutComposition = ({children}: Props) => {

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
