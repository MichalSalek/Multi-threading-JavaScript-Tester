import React from 'react'
import {NextPage} from 'next'

import CalculationsMainThreadMolecule from '@/features/calculations-components/CalculationsMainThread.molecule'
import CalculationsWorkersGeneratorOrganism
    from '@/features/calculations-components/CalculationsWorkersGenerator.organism'



const CalculationsPage: NextPage = () => {

    return (
        <>
            <CalculationsMainThreadMolecule/>

            <CalculationsWorkersGeneratorOrganism/>
        </>
    )
}

export default CalculationsPage
