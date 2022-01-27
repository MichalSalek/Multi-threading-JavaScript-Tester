import React from 'react'
import { useRouter } from 'next/router'
import scss from './Layout.composition.module.scss'



const Footer = () => {

    const router = useRouter()

    return (
        <footer className={scss.footer}>
            <hr/>
            <span>I&apos;m footer.</span>
            <br/>
            <button onClick={() => router.back()}>Go back</button>
            <hr/>
        </footer>
    )
}

export default Footer
