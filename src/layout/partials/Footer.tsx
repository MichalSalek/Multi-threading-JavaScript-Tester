import React from 'react'
import {useRouter} from 'next/router'

const Footer = () => {

	const router = useRouter()

	return (<>
		<hr/>
		<span>I&apos;m footer.</span>
		<br/>
		<button onClick={() => router.back()}>Go back</button>
		<hr/>
	</>)
}

export default Footer
