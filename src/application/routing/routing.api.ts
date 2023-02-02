import {pureRoutesList} from '@/core/routes.config'
import {GetRoute} from '@/application/routing/routing.types'



export const getRoute = <T = string>({routeName, slashSuffix, slug}: GetRoute<T>): string =>
    `${pureRoutesList[routeName]}${slug ? ('/' + slug) : ''}${slashSuffix ? '/' : ''}`
