import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'



const MainAppScreenPage: NextPage = () => {

    const CalculationsWorkersControlsOrganism = dynamic(() =>
        import('@/features/calculation-workers-controls/UI/CalculationsWorkersControls.organism'))

    return (
        <>
            <CalculationsWorkersControlsOrganism/>
        </>
    )
}

export default MainAppScreenPage
