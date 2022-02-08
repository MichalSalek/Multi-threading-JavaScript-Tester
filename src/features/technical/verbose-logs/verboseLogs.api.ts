import { VERBOSE_MODE } from '@/features/technical/verbose-logs/verboseLogsEntity'



export const changeVerboseModeFlag = (verboseModeEnableState: 'on' | 'off') => {
    switch (verboseModeEnableState) {
    case 'on':
        VERBOSE_MODE.isEnabled = true
        break
    case 'off':
        VERBOSE_MODE.isEnabled = false
    }
}


// This little shell allows handle app logs.
// Feel free to add a new one - in critical-looks-like areas.
// Check out how this has already been used by follow the reference...
// Most commonly use e.g.: CQS commands verbose.
//
export const addConsoleVerbose = (communicate: string | Error, mode: 'log' | 'warn' | 'error' = 'log'): void => {

    const date = `[${Date.parse(String(Date.now()))}]`

    switch (mode) {
    case 'log':
        VERBOSE_MODE.isEnabled && console.log(date, communicate)
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
