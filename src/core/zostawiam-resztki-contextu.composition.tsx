// import React, {JSXElementConstructor, ReactElement, useEffect} from 'react'
// import {AppProps} from 'next/app'
// import {
// 	selectWholeWorkersWorkState,
// 	selectWorkersAmount
//
// } from '@/features/calculations-page/workersSlice'
// import {useAppSelector} from '@/core/store.core'
// import {fireJustClientSide} from '@/core/utils.core'
// import {constructWorkerNameByOrderIndex, constructCalculationWorkerKeyByName} from '@/features/calculations-page/calculations-utils'
// import {controlAmountOfActiveWorkerInstances, initWorkerSwitch} from '@/features/workers/workers-utils'
// import {WorkerActiveInstanceStatusType, WorkersCurrentAmountStateType} from '@/features/workers/workers.types'
// import {selectSocketIsActive} from '@/features/socket-client/socketSlice'
//
//
// // @TODO Zmienić nazwę
// const WorkersActiveInstancesController = (): JSX.Element => {
//
// 	// Check if connection with backend is active
// 	//
// 	const isSocketActive: boolean = useAppSelector(selectSocketIsActive)
//
// 	// Requested number of workers
// 	//
// 	const workersCurrentAmount: WorkersCurrentAmountStateType = useAppSelector(selectWorkersAmount)
//
// 	// Object with worker names as keys
// 	// Example: { calculationWorker1: {...} }
// 	//
// 	const activeWorkerStatus: WorkerActiveInstanceStatusType = useAppSelector(selectWholeWorkersWorkState)
//
//
// 	useEffect(() => {
// 		fireJustClientSide(() => {
// 			if (!isSocketActive) return undefined
//
// 			console.log('wszedłem:')
//
// 			console.log(Array(workersCurrentAmount.amount).fill(undefined))
//
// 			console.log('zaczynam petle:')
//
// 			controlAmountOfActiveWorkerInstances(workersCurrentAmount)
//
// 			Array(workersCurrentAmount.amount+(workersCurrentAmount.lastAction === WorkerAmountChangeActionEnum.removeLast ? 1 : 0)).fill(undefined).forEach((_,index) => {
// 				const currentWorkerKey = constructCalculationWorkerKeyByName(constructWorkerNameByOrderIndex(index + 1))
//
// 				console.log('wygenerowany worker key: ', currentWorkerKey.name)
//
//
// 				console.log(typeof activeWorkerStatus === 'object')
// 				console.log(activeWorkerStatus?.constructor === Object)
// 				console.log(activeWorkerStatus && activeWorkerStatus[currentWorkerKey.name])
//
// 				if ((typeof activeWorkerStatus === 'object' && activeWorkerStatus?.constructor === Object && activeWorkerStatus[currentWorkerKey.name])) return undefined
//
// 				console.log('******uruchamiam inicjalizację workera (switch)************')
// 				initWorkerSwitch(currentWorkerKey, workersCurrentAmount.lastAction)
// 			})
//
// 		})
// 		return () => undefined
// 	}, [activeWorkerStatus, workersCurrentAmount.amount, isSocketActive])
//
//
// 	// const globalConnectionBody: ConnectionContextType = {
// 	// 	key: [value],
// 	// }
//
// 	// zostawiam obsługę kontekstu gdyby był potrzebny
//
//
// 	return <></>
// }
//
// export default WorkersActiveInstancesController

export default {}
