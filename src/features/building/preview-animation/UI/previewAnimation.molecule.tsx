import scss from './previewAnimation.module.scss'
import React from 'react'



const PreviewAnimationMolecule = (): JSX.Element => {

    return <section className={scss.host}>
        <span className={scss.animateIcons}>
            <i className="fad fa-user-robot"/>
            <i className="fad fa-user-robot"/>
            <i className="fad fa-user-robot"/>
            <i className="fad fa-user-robot"/>
        </span>
    </section>
}

export default PreviewAnimationMolecule