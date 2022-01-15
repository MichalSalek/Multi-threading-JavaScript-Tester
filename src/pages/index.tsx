import React from 'react'
import Link from 'next/link'
import {NextPage} from 'next'

import {ROUTE_PAGE_CALCULATIONS} from '@/core/routes.core'

const IndexPage: NextPage = () => {

	return (
		<Link passHref href={ROUTE_PAGE_CALCULATIONS}><button>go to {ROUTE_PAGE_CALCULATIONS} page...</button></Link>
	)
}

export default IndexPage
