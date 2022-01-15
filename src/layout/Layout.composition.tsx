import React, {JSXElementConstructor} from 'react'
import Navigation from '@/layout/partials/Navigation'
import Footer from '@/layout/partials/Footer'
import {ReactElement} from 'react'
import {AppProps} from 'next/app'


const LayoutComposition = ({children}: {children: ReactElement<AppProps, JSXElementConstructor<unknown>>}) => {

	return(<nav>
		<Navigation/>
		<main>{children}</main>
		<Footer/>
	</nav>)
}

export default LayoutComposition
