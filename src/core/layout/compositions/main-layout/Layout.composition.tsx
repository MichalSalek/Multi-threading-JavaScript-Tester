import React, {ReactNode} from 'react'

import Header from '@/core/layout/partials/Header'
import scss from './Layout.module.scss'
import {Container} from '@mui/material'
import Footer from '@/core/layout/partials/Footer'



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
