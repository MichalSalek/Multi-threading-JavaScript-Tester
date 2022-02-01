import React from 'react'
import styles from './Header.module.scss'
import scss from './Layout.module.scss'



const Header = () => {

    return (
        <header className={scss.header}>
            <p className={styles.text}>Transform</p>
            <p className={styles.text2}>Left</p>
        </header>
    )
}

export default Header
