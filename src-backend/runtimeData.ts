import { WorkerJobsByClientBrowserIDTypeDTO } from '@/features/background/web-workers-configuration/webWorkers.types'

//
// It's a pseudo-DB for the app presentation and fast start dev env.
// Instead of real DB -
// to avoid a boilerplate code overhead with additional configurations.
//
//////////////////////////////////////////////////////////////////
// Runtime data
// 'some-id': { worker1: {
// // 	results: [235452,253234,523434]
// // 	amount: 3
// // }, worker2: {...}}}
//
export const workersRuntimeData: WorkerJobsByClientBrowserIDTypeDTO = {}
//
//
//////////////////////////////////////////////////////////////////
