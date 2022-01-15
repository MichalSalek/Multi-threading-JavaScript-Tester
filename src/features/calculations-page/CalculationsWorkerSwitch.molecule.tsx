import React, {useEffect, useState} from 'react'
import {queueWorkerTask} from '@/features/workers/workers.api'
import {WEB_WORKER_TASKS} from '@/features/workers/workers-events'
import {
	IWorkerReadyState,
	IWorkerWorkState,
	NamedWorkerReadyStatusType,
	NamedWorkerWorkStatusType,
	WorkerKeyType
} from '@/features/workers/workers.types'
import {useAppSelector} from '@/core/store.core'
import {selectWholeWorkersReadyState, selectWholeWorkersWorkState} from '@/features/workers/workersSlice'



interface IProps {
	workerKey: WorkerKeyType
}


const CalculationsWorkerSwitchMolecule = ({workerKey}: IProps): JSX.Element => {

	// @TODO to poniżej mozna wydzielić elegancko do hooków
	//
	//

	// Listening to worker's ready state
	//
	const allWorkersReadyStatuses: NamedWorkerReadyStatusType = useAppSelector(selectWholeWorkersReadyState)
	const [isActive, setIsActive] = useState(false)
	useEffect(() => {
		// console.log(allWorkersReadyStatuses[workerKey.workerName])
		if (!allWorkersReadyStatuses || !allWorkersReadyStatuses[workerKey.workerName]) return () => undefined

		const thisWorkerReadyState: IWorkerReadyState = allWorkersReadyStatuses[workerKey.workerName]
		setIsActive(thisWorkerReadyState.ready)

		return () => undefined
	}, [allWorkersReadyStatuses, workerKey.workerName])



	// Listening to worker's work state
	//
	const allWorkersWorkStatuses: NamedWorkerWorkStatusType = useAppSelector(selectWholeWorkersWorkState)
	const [isWorking, setIsWorking] = useState(false)
	useEffect(() => {
		if (!allWorkersWorkStatuses || !allWorkersWorkStatuses[workerKey.workerName]) return () => undefined

		const thisWorkerWorkState: IWorkerWorkState = allWorkersWorkStatuses[workerKey.workerName]
		setIsWorking(thisWorkerWorkState.working)

		return () => undefined
	}, [allWorkersWorkStatuses, workerKey.workerName])



	const [userInputComplexity, setUserInputComplexity] = useState(25)


	if (!isActive) return <section><span>Loading {workerKey.workerName}...<br/><br/></span></section>
	return (
		<section>

			<input
				disabled={isWorking}
				type={'number'}
				value={userInputComplexity}
				min={2}
				max={200}
				onInput={(e) => setUserInputComplexity(Number(e.currentTarget.value))}
			/>

			<button onClick={() => {
				queueWorkerTask(workerKey, !isWorking ?
					{workerTaskName: WEB_WORKER_TASKS.turnOnCalculations, complexity: userInputComplexity}
					: {workerTaskName: WEB_WORKER_TASKS.turnOffCalculations},
				`Triggering a switch at the "${workerKey.workerName}"`)
			}}
			> Worker {workerKey.workerName} {isWorking ? <strong>ON</strong> : 'OFF'}
			</button>
			<br/>
			{/*<button onClick={() => workerLifeSwitch(workerKey, WorkerLifeSwitchCommandEnum.uninstall)}>Remove this Worker -</button>*/}
			<br/>

		</section>
	)
}

export default CalculationsWorkerSwitchMolecule
