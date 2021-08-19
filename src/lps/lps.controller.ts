import { combineRoutes, r } from '@marblejs/core'
import {
  addNewLPEffect,
  getAllLPsEffect,
} from './lps.effect'

const getAllLPsRoute = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(getAllLPsEffect),
)

const addNewLPRoute = r.pipe(
  r.matchPath('/new'),
  r.matchType('POST'),
  r.useEffect(addNewLPEffect),
)

export const lps = combineRoutes('lps', {
  middlewares: [],
  effects: [getAllLPsRoute, addNewLPRoute],
})
