// eg:
// { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }
//
import {ClientBrowserIDType} from '@/features/background/socket-client/socket.types'



export type WorkerNameType = string

export type WorkersJobBodyType = {
  results: number[]
  amount: number
}


export type WorkerJobsTypeDTO = Record<WorkerNameType, WorkersJobBodyType>


// eg:
// { '192.168.1.100': { worker1: {
// 	results: [235452,253234,523434]
// 	amount: 3
// },... }}
//
export type DBModel = Record<ClientBrowserIDType, WorkerJobsTypeDTO>
