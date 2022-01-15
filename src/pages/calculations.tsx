import React from 'react'
import {NextPage} from 'next'
import GridLayout from 'react-grid-layout'

import CalculationsMainThreadMolecule from '@/features/calculations-page/CalculationsMainThread.molecule'
import CalculationsWorkersGeneratorOrganism from '@/features/calculations-page/CalculationsWorkersGenerator.organism'



const CalculationsPage: NextPage = () => {

	return (
		<>
			<GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
				<CalculationsMainThreadMolecule key="a" data-grid={{x: 0, y: 0, w: 1, h: 2}}/>

				<CalculationsWorkersGeneratorOrganism key="b" data-grid={{x: 4, y: 0, w: 1, h: 2}}/>
			</GridLayout>
		</>
	)
}

export default CalculationsPage
