import {IWorkerKey, WorkersAmountStateType} from '@/features/workers/workers.types'
import {useEffect, useMemo, useState} from 'react'
import {useAppSelector} from '@/core/store.core'
import {selectExpectedWorkersAmount} from '@/features/workers/workersSlice'
import {getExistingWorkersKeys} from '@/features/workers/workers.api'

//
//
// // Hook for handling a Worker data receiving.
// //
// export type UseWorkerMessagesListenType = [WorkerDataType]
//
// export const useWorkerMessagesListen = (workerName: WorkerKeyType): UseWorkerMessagesListenType => {
// 	const [workerData, setWorkerData] = useState<WorkerDataType>(undefined)
//
// 	useEffect(() => {
// 		const maybeUnsubscribeFn = listenToWorkerMessages<WorkerDataType>(workerName, (e: WorkerDataType) => setWorkerData(e))
// 		if (typeof maybeUnsubscribeFn === 'undefined') return () => undefined
// 		const workerMessagesUnsubscribe: UnsubscribeFunctionType = maybeUnsubscribeFn
// 		return () => {
// 			workerMessagesUnsubscribe()
// 		}
// 	}, [workerName])
//
// 	return [workerData]
// }
//
//
// // Hook for handling all Workers data receiving - with current Worker name.
// //
// export type UseWorkerMessagesListenReturnType = [WorkerDataType]
//
// export const useAllWorkerMessagesListen = (): UseWorkerMessagesListenReturnType => {
// 	const [workerData, setWorkerData] = useState<WorkerDataType>(undefined)
//
// 	useEffect(() => {
// 		const workerMessagesUnsubscribe: UnsubscribeFunctionsType = listenToAllWorkersMessages<WorkerDataType>((e: WorkerDataType) => setWorkerData(e))
// 		return () => {
// 			workerMessagesUnsubscribe.forEach((unsubscribe: UnsubscribeFunctionType) => unsubscribe())
// 		}
// 	}, [])
//
// 	if (typeof workerData === 'undefined') return [undefined]
// 	return [{keyNames: workerData.keyNames, unknownData: workerData.unknownData}]
// }
//

// type ActiveWorkersState = IWorkerKey[] | undefined
// type ActiveWorkersAmountState = number | undefined
// export type UseActiveWorkerInstancesType = [ActiveWorkersState, ActiveWorkersAmountState]
//
// export const useActiveWorkerInstances = (): UseActiveWorkerInstancesType => {
//
// 	const workerExpectedAmount: WorkersAmountStateType = useAppSelector(selectExpectedWorkersAmount)
//
// 	const [activeWorkersKeys, setActiveWorkersKeys] = useState<ActiveWorkersState>(undefined)
//
// 	useEffect(() => {
// 		setActiveWorkersKeys(getExistingWorkersKeys())
// 		return () => undefined
// 	}, [workerExpectedAmount])
//
//
// 	const activeWorkersAmount: ActiveWorkersAmountState = useMemo(() => activeWorkersKeys?.length, [activeWorkersKeys])
//
// 	return [activeWorkersKeys, activeWorkersAmount]
// }