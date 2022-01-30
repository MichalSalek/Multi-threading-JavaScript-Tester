import React, { useEffect } from 'react'
import { useAppDispatch } from '@/core/store.core'
import { fireJustClientSide } from '@/app-config-and-utils'
import { connectSocketThunk } from '@/features/socket-client/socketSlice'



const SocketConnectionAndListeningController = (): JSX.Element => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        fireJustClientSide(() => {
            dispatch(connectSocketThunk())
        })
        return () => undefined
    }, [dispatch])


    return <></>
}

export default SocketConnectionAndListeningController
