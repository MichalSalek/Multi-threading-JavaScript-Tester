import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { ROUTE_PAGE_CALCULATIONS } from '@/core/routes.core'
import { Button } from '@mui/material'



const HomeScreenPage: NextPage = () => {

    return (
        <Link passHref href={ROUTE_PAGE_CALCULATIONS}>
            <Button>go to {ROUTE_PAGE_CALCULATIONS} page...</Button>
        </Link>
    )
}

export default HomeScreenPage
