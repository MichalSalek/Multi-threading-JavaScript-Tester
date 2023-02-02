import {useEffect} from 'react'



const useIconPackController = (): void => {

    useEffect(() => {
        const script1 = document.createElement('script')
        script1.src = '/icon-pack.min.js'
        script1.async = true
        document.head.appendChild(script1)

        const script2 = document.createElement('script')
        script2.src = '/fontawesome.min.js'
        script1.async = true
        document.head.appendChild(script2)
    }, [])
}

export default useIconPackController
