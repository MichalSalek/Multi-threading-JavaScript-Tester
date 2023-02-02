import {sendCommandMessageToSocket} from '@/application/socket-client/socket.api'
import {WEB_SOCKET_EVENTS_TRIGGERS} from '@/application/socket-client/socketEventsEntities'
import {sendErrorToTrackerTool} from '@/application/error-handler/errorHandler.api'



// Print console.logs or not.
//
export const VERBOSE_MODE = {
    isEnabled:
      //
      process.env.NODE_ENV === 'development'
}



// Resolve issues for tracker tool.
//
export const transportIssueToTrackerTool = (data: string | Error): void => {
    //
    sendErrorToTrackerTool(data)
}


// Resolve logs for server purposes.
//
export const transportLogToServer = (communicate: string): void => {
    //
    sendCommandMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.reportNewLog, communicate)
}
