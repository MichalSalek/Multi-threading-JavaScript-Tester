import { ISocketToAppCalculationDataDTO } from '@/features/web-workers-configuration/webWorkers.types'
import workerRuntimeData from '@/backend-src/runtimeData.api'



export const wholeDataResponse: ISocketToAppCalculationDataDTO = {
    data: workerRuntimeData,
    status: 201
}
