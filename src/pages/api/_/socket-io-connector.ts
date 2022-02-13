import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'
import requestedIP from 'request-ip'

import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import {
    IWorkerDTO,
    WorkerKeyType,
    WorkerToSocketDTO
} from '@/features/background/web-workers-configuration/webWorkers.types'

import { setNewJobDone } from '../../../../src-backend/runtimeData.api'
import {
    getAllJobsDoneResponse,
    getClientBrowserIDJobsDoneResponse,
    getClientBrowserIDResponse
} from '../../../../src-backend/responsesEntities'
import { addServerConsoleVerbose } from '../../../../src-backend/features/server-verbose-logs/serverVerboseLogs.api'
import { AppToSocketDTO } from '@/features/background/socket-client/socket.types'
import { getSecuredClientBrowserID } from '../../../../src-backend/features/client-browser-id/clientBrowserID.api'



const ioHandler = (req: NextApiRequest, res: NextApiResponse & any) => {


    const clientIP: string = requestedIP.getClientIp(req) ?? '0.0.0.0'
    addServerConsoleVerbose(`New IP connected: ${clientIP}`)


    if (!(res?.socket?.server?.io) && res?.socket?.server) {
        const io: Server = new Server(res.socket.server)
        io.on('connection', serverSocketClient => {



            //
            // WRITE
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, (request: AppToSocketDTO<WorkerToSocketDTO<IWorkerDTO>>) => {
                const workerKey: WorkerKeyType = request.data.keyNames
                const workerWorkAndCalculationData: IWorkerDTO = request.data.unknownData

                if (!workerWorkAndCalculationData.lastCalculations) {
                    addServerConsoleVerbose('The message just came in, but with no calculation data: '
                        + workerKey.workerName + new Date(workerWorkAndCalculationData.timestamp), 'log')
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

            

            //
            // READ
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, (request: AppToSocketDTO<null>) => {
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, getAllJobsDoneResponse(request, clientIP))
            })

            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, (request: AppToSocketDTO<null>) => {
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, getClientBrowserIDResponse(request, clientIP))
            })



        })
        res.socket.server.io = io
    }
    res.end()
}

export default ioHandler
