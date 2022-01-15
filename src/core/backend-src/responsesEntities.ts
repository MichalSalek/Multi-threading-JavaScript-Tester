import {ISocketToAppCalculationDataDTO} from '@/features/workers/workers.types'
import workerRuntimeData from '@/core/backend-src/runtimeData.api'


export const wholeDataResponse: ISocketToAppCalculationDataDTO = {
	data: workerRuntimeData,
	status: 201
}
