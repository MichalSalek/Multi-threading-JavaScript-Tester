import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'
import requestedIP from 'request-ip'

import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import {
    IWorkerDTO,
    WorkerJobsByClientBrowserIDTypeDTO,
    WorkerJobsTypeDTO,
    WorkerKeyType,
    WorkerToSocketDTO
} from '@/features/background/web-workers-configuration/webWorkers.types'

import { setNewJobDone } from '../../../../src-backend/runtimeData.api'
import { wholeDataResponse } from '../../../../src-backend/responsesEntities'
import { addServerConsoleVerbose } from '../../../../src-backend/features/server-verbose-logs/serverVerboseLogs.api'
import { AppToSocketDTO, SocketToAppDTO } from '@/features/background/socket-client/socket.types'



const ioHandler = (req: NextApiRequest, res: NextApiResponse & any) => {

    const clientIP: string = requestedIP.getClientIp(req) ?? '0.0.0.0'

    const getClientBrowserID = (userAgent: string): string => userAgent + clientIP

    if (!(res?.socket?.server?.io) && res?.socket?.server) {
        const io: Server = new Server(res.socket.server)
        io.on('connection', serverSocketClient => {


            //
            // Socket event handlers below:
            //
            // WRITE
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, (request: AppToSocketDTO<WorkerToSocketDTO<IWorkerDTO>>) => {
                const workerKey: WorkerKeyType = request.data.keyNames
                const workerWorkAndCalculationData: IWorkerDTO = request.data.unknownData

                if (!workerWorkAndCalculationData.lastCalculations) {
                    addServerConsoleVerbose('The message just came in, but with no calculation data: ' + workerKey.workerName + new Date(workerWorkAndCalculationData.timestamp), 'log')
                    return void undefined
                }


                setNewJobDone({
                    clientBrowserID: getClientBrowserID(request.userAgent),
                    data: {
                        workerName: workerKey.workerName,
                        lastCalculations: workerWorkAndCalculationData.lastCalculations
                    }

                })

                const responseAll: SocketToAppDTO<WorkerJobsByClientBrowserIDTypeDTO> = {
                    data: wholeDataResponse,
                    status: 201,
                    clientBrowserID: getClientBrowserID(request.userAgent)

                }


                const clientBrowserDataOnly: WorkerJobsTypeDTO = wholeDataResponse[getClientBrowserID(request.userAgent)]

                const responseClientBrowser: SocketToAppDTO<WorkerJobsTypeDTO> = {
                    data: clientBrowserDataOnly ?? {},
                    status: 201,
                    clientBrowserID: getClientBrowserID(request.userAgent)

                }

                serverSocketClient.broadcast.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, responseAll)
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, responseAll)
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone, responseClientBrowser)

                // @TODO
                //  code down funciton to checking a setNewJobDone transaction. When false, then log:
                // addServerConsoleVerbose('New data wasn\'t saved: ' + request.data, 'error')
            })



            //
            // READ
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, (request: AppToSocketDTO<null>) => {

                const response: SocketToAppDTO<WorkerJobsByClientBrowserIDTypeDTO> = {
                    data: wholeDataResponse,
                    status: 201,
                    clientBrowserID: getClientBrowserID(request.userAgent)
                }
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone, response)
            })

            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, (request: AppToSocketDTO<null>) => {

                const response: SocketToAppDTO<null> = {
                    data: null,
                    status: 201,
                    clientBrowserID: getClientBrowserID(request.userAgent)
                }
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID, response)
            })



        })
        res.socket.server.io = io
    }
    res.end()
}

export default ioHandler
