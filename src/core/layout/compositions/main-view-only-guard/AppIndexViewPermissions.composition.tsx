import React, {ReactNode, useMemo} from 'react'
import {useRouter} from 'next/router'
import {getRoute} from '@/application/routing/routing.api'



type Props = {
  children: ReactNode
}

export const AppIndexViewPermissionsComposition = ({children}: Props): JSX.Element => {

    const router = useRouter()

    const isNotStartPageActually = useMemo<boolean>(() => router.route !== getRoute({routeName: 'START_PAGE'}),
        [router.route])

    return isNotStartPageActually ? <>{children}</> : <>{null}</>
}
