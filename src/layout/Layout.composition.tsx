import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'

import Header from '@/layout/partials/Header'
import scss from './partials/Layout.module.scss'
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'



const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(48, 54, 48, 0.97)'
        }
    }
})


const LayoutComposition = ({children}: { children: ReactElement<AppProps, JSXElementConstructor<unknown>> }) => {

    return (
        <ThemeProvider theme={theme}>
            <main className={scss.hostMain}>
                <Header/>
                <main className={scss.main}>
                    <Container maxWidth={'xl'}>{children}</Container>
                </main>
                {/*<Footer/>*/}
            </main>
        </ThemeProvider>
    )
}

export default LayoutComposition
