import {
    transportIssueToTrackerTool,
    transportLogToServer,
    VERBOSE_MODE
} from '@/application/logger/logger.config'




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


    VERBOSE_MODE.isEnabled && console[mode](dateString, communicate)


    if (mode === 'error') transportIssueToTrackerTool(communicate)


    transportLogToServer(`${dateString}, ${communicate}, ${mode}`)
}
