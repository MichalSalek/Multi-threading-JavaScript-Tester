import { SERVER_VERBOSE_MODE } from './serverVerboseLogsEntity'



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

    const date = `[${Date.parse(String(Date.now()))}]`

    switch (mode) {
    case 'log':
        SERVER_VERBOSE_MODE.isEnabled && console.log(date, communicate)
        break

    case 'warn':
        console.warn(date, communicate)
        break

    case 'error':
        console.error(date, communicate)
        //
        // Here we can also send the errors to an any error-tracking app
        //
    }
}
