
export const WEB_SOCKET_EVENTS_TRIGGERS = (() => Object.freeze( {
	reportJobDone: 'report-job-done',
	allJobsDone: 'all-jobs-done',
	wholeSummaryGetOnly: 'whole-summary-get-only'
} as const))()


// Types for events
//
type Keys = keyof typeof WEB_SOCKET_EVENTS_TRIGGERS
export type WebSocketEventTriggersType = typeof WEB_SOCKET_EVENTS_TRIGGERS[Keys]
 