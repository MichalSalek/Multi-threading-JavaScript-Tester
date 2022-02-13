import 'winston-daily-rotate-file'


import { SERVER_VERBOSE_MODE } from './serverVerboseLogsEntity'
import { logToFile } from './serverVerboseLogsToFile'



export const changeServerVerboseModeFlag = (verboseModeEnableState: 'on' | 'off') => {
    switch (verboseModeEnableState) {
    case 'on':
        SERVER_VERBOSE_MODE.isEnabled = true
        break
    case 'off':
        SERVER_VERBOSE_MODE.isEnabled = false
    }
}


// This little shell allows handle app logs.
// Feel free to add a new one - in critical-looks-like areas.
// Check out how this has already been used by follow the reference...
// Most commonly use e.g.: CQS commands verbose.
//
export const addServerConsoleVerbose = (communicate: string | Error, mode: 'log' | 'warn' | 'error' = 'log'): void => {

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
        SERVER_VERBOSE_MODE.isEnabled && console.log(dateString, communicate)
        logToFile(`[log] ${dateString} ${communicate}`, 'warn')
        break

    case 'warn':
        console.warn(dateString, communicate)
        logToFile(`${dateString} ${communicate}`, 'warn')
        break

    case 'error':
        console.error(dateString, communicate)
        logToFile(`${dateString} ${communicate}`, 'error')

        //
        // Here we can also send the errors to an any error-tracking app
        //
    }
}


