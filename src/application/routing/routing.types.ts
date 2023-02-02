import {pureRoutesList} from '@/core/routes.config'


// @routeName - Simply route name
// @additionalSlug - Some slug what you can add and type with domain string alias by passing a generic <T>.
// @shouldBeSuffixIncluded - Include slash at the very end of route string.
//
export type GetRoute<T> = {
  routeName: keyof typeof pureRoutesList,
  slug?: T | undefined
  slashSuffix?: boolean | undefined,
}
