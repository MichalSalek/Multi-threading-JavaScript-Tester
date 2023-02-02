// eg:
// { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }
//
import {ClientBrowserIDType} from '@/application/socket-client/socket.types'
import {WorkerName} from '@/application/workers/workers.types'





export type WorkersJobBodyType = {
  results: number[]
  amount: number
}


export type WorkerJobsTypeDTO = Record<WorkerName, WorkersJobBodyType>


// eg:
// { '192.168.1.100': { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }}
//
export type DBModel = Record<ClientBrowserIDType, WorkerJobsTypeDTO>
