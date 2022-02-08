import React, { useEffect } from 'react'
import { useAppDispatch } from '@/core/store.core'
import { connectSocketThunk } from '@/features/technical/socket-client/socketSlice'
import { fireJustClientSide } from '@/coding-utils/environmentOperations.api'



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
