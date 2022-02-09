import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'

import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import { ISocketDTO, IWorkerDTO, WorkerKeyType } from '@/features/background/web-workers-configuration/webWorkers.types'

import { setNewJobDone } from '../../../../src-backend/runtimeData.api'
import { handleGlobalSummaryBroadcast } from '../../../../src-backend/features/global-scoreboard/globalSummary'
import { wholeDataResponse } from '../../../../src-backend/responsesEntities'
import { addServerConsoleVerbose } from '../../../../src-backend/features/server-verbose-logs/serverVerboseLogs.api'



const ioHandler = (req: NextApiRequest, res: NextApiResponse & any) => {
    if (!(res?.socket?.server?.io) && res?.socket?.server) {
        const io: Server = new Server(res.socket.server)
        io.on('connection', serverSocketClient => {



            handleGlobalSummaryBroadcast(serverSocketClient)


            //
            // Socket event handlers below:
            //
            // WRITE
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, (data: ISocketDTO<IWorkerDTO>) => {
                const workerKey: WorkerKeyType = data.keyNames
                const workerWorkAndCalculationData: IWorkerDTO = data.unknownData

                if (!workerWorkAndCalculationData.lastCalculations) {
                    addServerConsoleVerbose('The message just came in, but with no calculation data: ' + data.keyNames.workerName + new Date(data.unknownData.timestamp), 'log')
                    return void undefined
                }

                const newDataSetResult = setNewJobDone({
                    workerName: workerKey.workerName,
                    lastCalculations: workerWorkAndCalculationData.lastCalculations
                })

                if (newDataSetResult) {
                    serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, wholeDataResponse)
                } else {
                    addServerConsoleVerbose('New data wasn\'t saved: ' + data, 'error')
                }
            })



            //
            // READ
            //
            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, () => {
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, wholeDataResponse)
            })



        })
        res.socket.server.io = io
    }
    res.end()
}

export default ioHandler
