import { combineRoutes, r } from '@marblejs/core'
import { getAllLPs } from './lps.effect'

const getAllLPsRoute = r.pipe(r.matchPath('/'), r.matchType('GET'), r.useEffect(getAllLPs))

export const lps = combineRoutes('lps', {
  middlewares: [],
  effects: [getAllLPsRoute],
})
