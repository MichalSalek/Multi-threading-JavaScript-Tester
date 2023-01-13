import React, {useEffect} from 'react'
import {NextPage} from 'next'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {ROUTE_START_PAGE_SCREEN} from '@/core/routes.core'
import {getStorageItem} from '@/features/background/browser-storage/browserStorage.api'
import PreviewAnimationMolecule from '@/features/building/preview-animation/UI/PreviewAnimation.molecule'
import NavLinksMolecule from '@/features/building/nav-links/UI/NavLinks.molecule'
import scss from '../pages-styles/index.module.scss'
import MainThreadSwitchMolecule from '@/features/building/main-thread-switch/UI/MainThreadSwitch.molecule'
import FloatingWorkersAmountAtom from '@/features/building/workers/floating-amount/FloatingWorkersAmount.atom'
import {Container, Stack} from '@mui/material'
import WorkersMatrixContainerMolecule
    from '@/features/building/workers/matrix-container/UI/WorkersMatrixContainer.molecule'
import {
    STORAGE_KEY_START_PAGE_SEEN,
    StorageKeyStartPageEnum
} from '@/features/background/browser-storage/browserStorage.config'



const MainAppScreenPage: NextPage = () => {

    const CalculationsWorkersControlsOrganism = dynamic(() =>
        import('@/features/building/workers/controls/UI/WorkersControls.organism'), {ssr: false})

    const router = useRouter()

    useEffect(() => {
        const memorizedValue = getStorageItem(STORAGE_KEY_START_PAGE_SEEN)
        if (typeof memorizedValue === 'string') {
            if (memorizedValue !== StorageKeyStartPageEnum.true) void router.push(ROUTE_START_PAGE_SCREEN)
        } else {
            void router.push(ROUTE_START_PAGE_SCREEN)
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
