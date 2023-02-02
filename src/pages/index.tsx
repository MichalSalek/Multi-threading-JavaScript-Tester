import React, {useEffect} from 'react'
import {NextPage} from 'next'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {getStorageItem} from '@/application/browser-storage/browserStorage.api'
import PreviewAnimationMolecule from '@/core/layout/components/atoms-and-molecules/preview-animation/UI/PreviewAnimation.molecule'
import NavLinksMolecule from '@/core/layout/components/atoms-and-molecules/nav-links/UI/NavLinks.molecule'
import scss from '../core/layout/styles/views/index.module.scss'
import MainThreadSwitchMolecule from '@/core/layout/components/atoms-and-molecules/main-thread-switch/UI/MainThreadSwitch.molecule'
import FloatingWorkersAmountAtom from '@/core/layout/components/atoms-and-molecules/workers/floating-amount/FloatingWorkersAmount.atom'
import {Container, Stack} from '@mui/material'
import WorkersMatrixContainerMolecule
    from '@/core/layout/components/atoms-and-molecules/workers/matrix-container/UI/WorkersMatrixContainer.molecule'
import {
    STORAGE_KEY_START_PAGE_SEEN,
    StorageKeyStartPageEnum
} from '@/application/browser-storage/browserStorage.config'
import {getRoute} from '@/application/routing/routing.api'



const MainAppScreenPage: NextPage = () => {

    const CalculationsWorkersControlsOrganism = dynamic(() =>
        import('@/core/layout/components/atoms-and-molecules/workers/controls/UI/WorkersControls.organism'), {ssr: false})

    const router = useRouter()

    useEffect(() => {
        const memorizedValue = getStorageItem(STORAGE_KEY_START_PAGE_SEEN)
        if (typeof memorizedValue === 'string') {
            if (memorizedValue !== StorageKeyStartPageEnum.true) 
                void router.push(getRoute({routeName: 'START_PAGE'}))
        } else {
            void router.push(getRoute({routeName: 'START_PAGE'}))
        }
    }, [router])


    return (
        <main className={scss.host}>

            <Container>

                <Stack alignItems={'center'}><NavLinksMolecule/></Stack>

                <PreviewAnimationMolecule/>


                <Stack maxWidth={'666px'} alignItems={'center'} marginX={'auto'}>
                    <MainThreadSwitchMolecule/>

                    <CalculationsWorkersControlsOrganism/>
                </Stack>


                <WorkersMatrixContainerMolecule/>

                <PreviewAnimationMolecule/>

                <FloatingWorkersAmountAtom/>
            </Container>
        </main>
    )
}

export default MainAppScreenPage
