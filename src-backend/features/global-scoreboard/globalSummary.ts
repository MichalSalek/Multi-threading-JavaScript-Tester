import { Socket } from 'socket.io'
import { IPAddressesData } from '../../runtimeData.api'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'
import { addConsoleVerbose } from '@/features/background/verbose-logs/verboseLogs.api'



const IPNumberRegExp = new RegExp('(\\b25[0-5]|\\b2[0-4][0-9]|\\b[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}', 'gm')


export const handleGlobalSummaryBroadcast = (SocketClient: Socket): void => {
    const address: RegExpExecArray | null = IPNumberRegExp.exec(SocketClient.handshake.address)
    const IPAddress = address ? address[0] : 'IP of localhost'
    addConsoleVerbose('New connection from ' + IPAddress)


    IPAddressesData.push(IPAddress); // temp
    (() => SocketClient.broadcast.emit(WEB_SOCKET_EVENTS_TRIGGERS.wholeSummaryGetOnly, IPAddressesData))()
}
