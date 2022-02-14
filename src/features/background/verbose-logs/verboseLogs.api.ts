import { VERBOSE_MODE } from '@/features/background/verbose-logs/verboseLogsConfig'
import { sendCommandMessageToSocket } from '@/features/background/socket-client/socket.api'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'



export const changeVerboseModeFlag = (verboseModeEnableState: 'on' | 'off') => {
    switch (verboseModeEnableState) {
    case 'on':
        VERBOSE_MODE.isEnabled = true
        break
    case 'off':
        VERBOSE_MODE.isEnabled = false
    }
}


const emitLogToServer = (communicate: string): void => {
    sendCommandMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.reportNewLog, communicate)
}


// This little shell allows handle app logs.
// Feel free to add a new one - in critical-looks-like areas.
// Check out how this has already been used by follow the reference...
// Most commonly use e.g.: CQS commands verbose.
//
export const addConsoleVerbose = (communicate: string | Error, mode: 'log' | 'warn' | 'error' = 'log'): void => {

    const dateNow = new Date()
    const date = dateNow.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
    const dateString = `[${date}]`

    switch (mode) {
    case 'log':
        VERBOSE_MODE.isEnabled && console.log(dateString, communicate)
        break

    case 'warn':
        console.warn(dateString, communicate)
        break

    case 'error':
        console.error(dateString, communicate)
        //
        // Here we can also send the errors to an any error-tracking app
        //
    }

    emitLogToServer(`${dateString}, ${communicate}, ${mode}`)
}
