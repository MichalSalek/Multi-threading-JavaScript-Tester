import React from 'react'
import styles from './Header.module.scss'
import scss from './Layout.module.scss'



const Header = () => {

    return (
        <header className={[scss.header, styles.host].join(' ')}>
            <span className={styles.animateIcons}>
                <i className="fad fa-user-robot"/>
                <i className="fad fa-user-robot"/>
                <i className="fad fa-user-robot"/>
                <i className="fad fa-user-robot"/>
            </span>
        </header>
    )
}

export default Header
