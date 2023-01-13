import {useEffect} from 'react'
import {useAppDispatch} from '@/core/store.core'
import {connectSocketThunk} from '@/features/background/socket-client/socket.slice'
import {fireClientSide} from '@/core/low-level-utils/environmentOperations.api'



const useSocketConnectionAndListeningController = (): void => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        fireClientSide(() => {
            dispatch(connectSocketThunk())
        })
    }, [dispatch])
}

export default useSocketConnectionAndListeningController
