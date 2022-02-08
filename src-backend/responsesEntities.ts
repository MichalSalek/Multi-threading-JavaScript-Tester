import { ISocketToAppCalculationDataDTO } from '@/features/technical/web-workers-configuration/webWorkers.types'
import { workersRuntimeData } from './runtimeData.api'



export const wholeDataResponse: ISocketToAppCalculationDataDTO = {
    data: workersRuntimeData,
    status: 201
}
