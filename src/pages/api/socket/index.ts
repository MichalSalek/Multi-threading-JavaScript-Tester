import {Server} from 'socket.io'
import {NextApiRequest, NextApiResponse} from 'next'
import requestedIP from 'request-ip'

import {WEB_SOCKET_EVENTS_TRIGGERS} from '@/application/socket-client/socketEventsEntities'
import {CalculationWorkerDTO, WorkerToSocketDTO} from '@/core/features/calculations-workers/calculationsWorkers.types'

import {setNewJobDone} from '../../../../src-backend/features/db/db.api'
import {
    getAllJobsDoneResponse,
    getClientBrowserIDJobsDoneResponse,
    getClientBrowserIDResponse
} from '../../../../src-backend/features/_background-core/socket-server/DTO.api'
import {addServerConsoleVerbose, logToFile} from '../../../../src-backend/features/server-logs/serverLogs.api'
import {AppToBackendGenericDTO} from '@/application/socket-client/socket.types'
import {getSecuredClientBrowserID} from '../../../../src-backend/features/client-browser-id/clientBrowserID.api'
import {WorkerKeyType} from '@/application/workers/workers.types'



const ioHandler = (req: NextApiRequest, res: NextApiResponse & any) => {


    const clientIP: string = requestedIP.getClientIp(req) ?? '0.0.0.0'
    addServerConsoleVerbose(`New IP connected: ${clientIP}`)


    if (!(res?.socket?.server?.io) && res?.socket?.server) {
        const io: Server = new Server(res.socket.server)
        io.on('connection', serverSocketClient => {

            addServerConsoleVerbose(`New IO connection from ${clientIP}`)

            //
            // WRITE
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, (request: AppToBackendGenericDTO<WorkerToSocketDTO<CalculationWorkerDTO>>) => {
                const workerKey: WorkerKeyType = request.data.keyNames
                const workerWorkAndCalculationData: CalculationWorkerDTO = request.data.unknownData

                if (!workerWorkAndCalculationData.lastCalculations) {
                    return void undefined
                }


                setNewJobDone({
                    clientBrowserID: getSecuredClientBrowserID(request.userAgent, clientIP),
                    data: {
                        workerName: workerKey.workerName,
                        lastCalculations: workerWorkAndCalculationData.lastCalculations
                    }

                })

                serverSocketClient.broadcast.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, getAllJobsDoneResponse(request, clientIP))
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, getAllJobsDoneResponse(request, clientIP))
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone, getClientBrowserIDJobsDoneResponse(request, clientIP))
            })

            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.reportNewLog, (request: AppToBackendGenericDTO<string>) => {
                logToFile(`[${clientIP}] ${request.data}`, 'warn')
            })



            //
            // READ
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, (request: AppToBackendGenericDTO<null>) => {
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, getAllJobsDoneResponse(request, clientIP))
            })

            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, (request: AppToBackendGenericDTO<null>) => {
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, getClientBrowserIDResponse(request, clientIP))
            })



        })
        res.socket.server.io = io
    }
    res.end()
}

export default ioHandler
