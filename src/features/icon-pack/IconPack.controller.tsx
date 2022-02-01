import React, { useEffect } from 'react'



const IconPackController = (): JSX.Element => {

    useEffect(() => {
        const script1 = document.createElement('script')
        script1.src = '/icon-pack.min.js'
        script1.async = true
        document.head.appendChild(script1)

        const script2 = document.createElement('script')
        script2.src = '/fontawesome.min.js'
        script1.async = true
        document.head.appendChild(script2)
        return () => undefined
    }, [])

    return (<></>)
}

export default IconPackController
