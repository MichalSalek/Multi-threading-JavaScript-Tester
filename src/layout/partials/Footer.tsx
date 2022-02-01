import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import scss from './Layout.module.scss'
import { Button } from '@mui/material'



const Footer = () => {

    const router = useRouter()

    const getBackInBrowserHistory = useCallback(
        () => router.back(),
        [router]
    )

    return (
        <footer className={scss.footer}>
            <hr/>
            <span>I&apos;m footer.</span>
            <br/>
            <Button onClick={getBackInBrowserHistory}>Go back</Button>
            <hr/>
        </footer>
    )
}

export default Footer
