import {useEffect} from 'react'
import {useAppDispatch} from '@/application/store/store'
import {connectSocketThunk} from '@/application/socket-client/socket.slice'
import {fireClientSide} from '@/utils/environmentOperations.api'



const useSocketConnectionAndListeningController = (): void => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        fireClientSide(() => {
            dispatch(connectSocketThunk())
        })
    }, [dispatch])
}

export default useSocketConnectionAndListeningController
