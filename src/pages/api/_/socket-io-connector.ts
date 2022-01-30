import { Server, Socket } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/socket-client/socketEventsEntities'
import { IPAddressesData, setNewJobDone } from '@/backend-src/runtimeData.api'
import { ISocketDTO, IWorkerDTO, WorkerKeyType } from '@/features/web-workers-configuration/webWorkers.types'
import { runInDevEnvOnly } from '@/app-config-and-utils'
import { wholeDataResponse } from '@/backend-src/responsesEntities'
import { IPNumberRegExp } from '@/backend-src/types'



const handleGlobalSummaryBroadcast = (SocketClient: Socket): void => {
    const address: RegExpExecArray | null = IPNumberRegExp.exec(SocketClient.handshake.address)
    const IPAddress = address ? address[0] : 'IP of localhost'
    runInDevEnvOnly(() => console.log('New connection from ' + IPAddress))


    IPAddressesData.push(IPAddress); // temp
    (() => SocketClient.broadcast.emit(WEB_SOCKET_EVENTS_TRIGGERS.wholeSummaryGetOnly, IPAddressesData))()
}


const ioHandler = (req: NextApiRequest, res: NextApiResponse & any) => {
    if (!(res?.socket?.server?.io) && res?.socket?.server) {
        const io: Server = new Server(res.socket.server)
        io.on('connection', serverSocketClient => {

            handleGlobalSummaryBroadcast(serverSocketClient)


            //
            // Socket event handlers below:
            //

            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, (data: ISocketDTO<IWorkerDTO>) => {
                const workerKey: WorkerKeyType = data.keyNames
                const workerWorkAndCalculationData: IWorkerDTO = data.unknownData

                if (!workerWorkAndCalculationData.lastCalculations) {
                    runInDevEnvOnly(() =>
                        console.log('The message just came in, but with no calculation data: ', data.keyNames.workerName, new Date(data.unknownData.timestamp)))
                    return void undefined
                }

                const newDataSetResult = setNewJobDone({
                    workerName: workerKey.workerName,
                    lastCalculations: workerWorkAndCalculationData.lastCalculations
                })

                if (newDataSetResult) {
                    serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, wholeDataResponse)
                } else {
                    runInDevEnvOnly(() => console.error('New data wasn\'t saved: ', data))
                }
            })


            serverSocketClient.on(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, () => {
                serverSocketClient.emit(WEB_SOCKET_EVENTS_TRIGGERS.allJobsDone, wholeDataResponse)
            })



        })
        res.socket.server.io = io
    }
    res.end()
}

export default ioHandler
