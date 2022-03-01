import React, { useEffect } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ROUTE_START_PAGE_SCREEN } from '@/core/routes.core'
import { getStorageItem } from '@/features/background/browser-storage/browserStorage.api'
import { STORAGE_KEY_START_PAGE_SEEN, StorageKeyStartPageEnum } from '@/app-config-constants'
import PreviewAnimationMolecule from '@/features/building/preview-animation/UI/PreviewAnimation.molecule'
import NavLinksMolecule from '@/features/building/nav-links/UI/NavLinks.molecule'
import scss from './index.module.scss'
import MainThreadSwitchMolecule from '@/features/building/main-thread-switch/UI/MainThreadSwitch.molecule'
import WorkersSwitchesViewContainerMolecule
    from '@/features/building/workers-switches-container/UI/WorkersSwitchesViewContainer.molecule'



const MainAppScreenPage: NextPage = () => {

    const CalculationsWorkersControlsOrganism = dynamic(() =>
        import('@/features/building/workers-controls/UI/WorkersControls.organism'), {ssr: false})

    const router = useRouter()

    useEffect(() => {
        const memorizedValue = getStorageItem(STORAGE_KEY_START_PAGE_SEEN)
        if (typeof memorizedValue === 'string') {
            if (memorizedValue !== StorageKeyStartPageEnum.true) router.push(ROUTE_START_PAGE_SCREEN)
        } else {
            router.push(ROUTE_START_PAGE_SCREEN)
        }
        return () => undefined
    }, [router])


    return (
        <main>
            <PreviewAnimationMolecule/>

            <nav className={scss.textCenter}><NavLinksMolecule/></nav>

            <div className={scss.textCenter}><MainThreadSwitchMolecule/></div>

            <CalculationsWorkersControlsOrganism/>

            <WorkersSwitchesViewContainerMolecule/>
            
        </main>
    )
}

export default MainAppScreenPage
