import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'

// Load all globals here:
import '@/styles/globals.scss'
import '@/features/service-workers/service-workers-configuration'


import store from '@/core/store'
import Layout from "@/layout/Layout"
import MetaHeader from "@/layout/partials/MetaHeader"
import RedirectByLogin from "@/features/user-login/RedirectByLogin"


export default function MyApp({Component, pageProps}: AppProps) {

	return (
		<Provider store={store}>
			<RedirectByLogin>
				<MetaHeader/>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RedirectByLogin>
		</Provider>
	)
}
