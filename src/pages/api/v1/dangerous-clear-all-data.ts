import {setClearRuntimeData} from '@/core/backend-src/runtimeData.api'
import {ResponseType} from '@/core/backend-src/types'
import {IWorkerDTO} from '@/features/workers/workers.types'

export default function handler(_:null, response:ResponseType<IWorkerDTO>) {
	setClearRuntimeData() && response.sendStatus(201).json('All app storage data was cleared!')
}
