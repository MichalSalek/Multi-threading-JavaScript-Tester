import React, {ReactNode, useMemo} from 'react'
import {useRouter} from 'next/router'
import {ROUTE_START_PAGE_SCREEN} from '@/core/routes.core'



type Props = {
  children: ReactNode
}

export const MainViewOnlyGuardComposition = ({children}: Props): JSX.Element => {

    const router = useRouter()

    const isNotStartPageActually = useMemo<boolean>(() => router.route !== ROUTE_START_PAGE_SCREEN,
        [router.route])

    return isNotStartPageActually ? <>{children}</> : <>null</>
}
