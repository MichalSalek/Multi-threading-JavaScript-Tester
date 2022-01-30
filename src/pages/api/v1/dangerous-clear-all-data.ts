import { setClearRuntimeData } from '@/backend-src/runtimeData.api'
import { ResponseType } from '@/backend-src/types'
import { IWorkerDTO } from '@/features/web-workers-configuration/webWorkers.types'



export default function handler(_: null, response: ResponseType<IWorkerDTO>) {
    setClearRuntimeData() && response.sendStatus(201).json('All app storage data was cleared!')
}
