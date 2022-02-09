import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'



const MainAppScreenPage: NextPage = () => {

    const CalculationsWorkersControlsOrganism = dynamic(() =>
        import('@/features/building/workers-controls/UI/WorkersControls.organism'))

    return (
        <>
            <CalculationsWorkersControlsOrganism/>
        </>
    )
}

export default MainAppScreenPage
