import React, {JSXElementConstructor, ReactElement} from 'react'
import Navigation from '@/layout/partials/Navigation'
import Footer from '@/layout/partials/Footer'
import {AppProps} from 'next/app'



const LayoutComposition = ({children}: { children: ReactElement<AppProps, JSXElementConstructor<unknown>> }) => {

    return (<nav>
        <Navigation/>
        <main>{children}</main>
        <Footer/>
    </nav>)
}

export default LayoutComposition
