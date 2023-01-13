import React, { useEffect, useRef, useState } from 'react'
import { doCalculations } from '@/features/building/workers-work-switch/doCalculations'
import { MAIN_THREAD_KEY } from '@/core/constants.core'
import { sendCommandMessageToSocket } from '@/features/background/socket-client/socket.api'
import { WEB_SOCKET_EVENTS_TRIGGERS } from '@/features/background/socket-client/socketEventsEntities'



// Hook for handling a main thread fake background calculations.
//
type IsMainThreadOnType = boolean
type HandleMainThreadSwitchChangeType = () => void
export type UseMainThreadCalculationsType = [IsMainThreadOnType, HandleMainThreadSwitchChangeType]

export const useMainThreadCalculations = <D>(CALCULATION_INTERVAL_TIMING_IN_MS = 100, CALCULATIONS_COMPLEXITY = 50, isMainThreadActiveOnLoad = false): UseMainThreadCalculationsType => {

    const [isMainThreadOn, setIsMainThreadOn] = useState<boolean>(isMainThreadActiveOnLoad)

    const [lastMadeCalculation, setLastMadeCalculation] = useState<number | undefined>(undefined)

    const intervalIDRef: React.MutableRefObject<number> = useRef(0)


    useEffect(() => {
        const clearInterval = (() => window.clearInterval(intervalIDRef.current))

        if (isMainThreadOn) {
            intervalIDRef.current = window.setInterval(() =>
                setLastMadeCalculation(doCalculations(CALCULATIONS_COMPLEXITY)), CALCULATION_INTERVAL_TIMING_IN_MS)
        } else {
            clearInterval()
        }

        return () => {
            clearInterval()
        }
    }, [isMainThreadOn, CALCULATION_INTERVAL_TIMING_IN_MS, CALCULATIONS_COMPLEXITY])


    useEffect(() => {
        if (typeof lastMadeCalculation === 'undefined') return () => undefined

        sendCommandMessageToSocket(WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone, {
            keyNames: MAIN_THREAD_KEY,
            unknownData: {
                working: isMainThreadOn,
                lastCalculations: lastMadeCalculation,
                timestamp: Date.now()
            }
        })

    }, [lastMadeCalculation, isMainThreadOn])


    const handleMainThreadSwitchChange = (): void => setIsMainThreadOn((prevIsOnState: D | boolean) => !prevIsOnState)

    return [isMainThreadOn, handleMainThreadSwitchChange]
}


export default {}
