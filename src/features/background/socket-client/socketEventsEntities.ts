export const WEB_SOCKET_EVENTS_TRIGGERS = (() => Object.freeze({
    reportJobDone: 'report-job-done',
    getAllJobsDone: 'get-all-jobs-done',
    getClientBrowserIDJobsDone: 'get-client-browser-id-jobs-done',
    getClientBrowserID: 'get-client-browser-id'
} as const))()

// Types for events
//
type Keys = keyof typeof WEB_SOCKET_EVENTS_TRIGGERS
export type WebSocketEventTriggersType = typeof WEB_SOCKET_EVENTS_TRIGGERS[Keys]
