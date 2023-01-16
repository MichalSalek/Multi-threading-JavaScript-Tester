import {logger, SERVER_VERBOSE_MODE} from './serverLogs.config'




export const logToFile = (communicate: string, mode: 'log' | 'warn' | 'error' = 'log') => {
    switch (mode) {
    case 'log':
        logger.verbose(communicate)
        break

    case 'warn':
        logger.warn(communicate)
        break

    case 'error':
        logger.error(communicate)
    }
}


// This little shell allows handle app logs.
// Feel free to add a new one - in critical-looks-like areas.
// Check out how this has already been used by follow the reference...
// Most commonly use e.g.: event commands verbose.
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
