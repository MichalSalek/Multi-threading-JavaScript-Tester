import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { ROUTE_MAIN_APP_SCREEN } from '@/core/routes.core'
import { Button } from '@mui/material'



const HomeScreenPage: NextPage = () => {

    return (
        <Link passHref href={ROUTE_MAIN_APP_SCREEN}>
            <Button>go to {ROUTE_MAIN_APP_SCREEN} page...</Button>
        </Link>
    )
}

export default HomeScreenPage
