import React from 'react'
import {useMainThreadCalculations} from '@/features/calculations-page/mainThreadCalculationsHook'



const CalculationsMainThreadMolecule = (): JSX.Element => {

	const [isMainThreadOn, handleMainThreadSwitchChange] =
		useMainThreadCalculations(120, 80, false)


	return (<>
		<button onClick={handleMainThreadSwitchChange}
		> <span>Main thread job is: {isMainThreadOn ? <strong>ON</strong> : 'OFF'}</span>
		</button>
		<br/>
	</>)
}

export default CalculationsMainThreadMolecule
