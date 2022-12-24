import React, { useEffect } from 'react'
import { useAppDispatch } from '@/core/store.core'
import { connectSocketThunk } from '@/features/background/socket-client/socketSlice'
import { fireClientSide } from '@/coding-utils/environmentOperations.api'



const SocketConnectionAndListeningController = (): JSX.Element => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        fireClientSide(() => {
            dispatch(connectSocketThunk())
        })
        return () => undefined
    }, [dispatch])


    return <></>
}

export default SocketConnectionAndListeningController
