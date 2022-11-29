import * as O from 'fp-ts/Option'
import {
  HttpEffect,
  HttpRequest,
  use,
} from '@marblejs/core'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { of } from 'rxjs'
import * as rx from 'rxjs/operators'
import { throwBadRequest } from '../exceptions/bad-request'
import { ioDecoder } from '../shared/decoders'
import adapter from './lps.adapter'
import {
  addLpDecoder,
  PreSaveLpsEntity,
} from './lps.decoders'
import repo from './lps.repo'
import { writeAuthMiddleware } from './middlewares/lps.auth.middleware'
import { LPsEntity } from './entities/lps.entity'

/**
 * Get all LPs from database
 */
export const getAllLPsEffect: HttpEffect = req =>
  req.pipe(
    rx.mergeMap(repo.getAllLPs),
    rx.map(lps => ({ body: lps })),
  )

const decodeReq = rx.mergeMap((req: HttpRequest) =>
  pipe(
    req.body,
    ioDecoder(addLpDecoder),
    E.fold(throwBadRequest, validated => of(validated)),
  ),
)

const addOrReturnLP = async (
  lpInfo: PreSaveLpsEntity,
): Promise<LPsEntity> => {
  const lp = await repo.getLP(lpInfo)
  if (O.isSome(lp)) {
    return lp.value
  }
  return repo.saveLP(lpInfo)
}

/**
 * Creates new LP
 */
export const addNewLPEffect: HttpEffect = req =>
  req.pipe(
    use(writeAuthMiddleware),
    decodeReq,
    rx.map(adapter.preCreateLp),
    rx.mergeMap(addOrReturnLP),
    rx.map(body => ({ body })),
  )

/**
 * Gets all LPs that are for sale
 */
export const getAllForSaleEffect: HttpEffect = req =>
  req.pipe(
    rx.mergeMap(repo.getAllForSale),
    rx.map(body => ({ body })),
  )

/**
 * Gets a random LP
 */
export const getRandomLPEffect: HttpEffect = req =>
  req.pipe(
    rx.mergeMap(repo.getRandomLP),
    rx.map(body => ({ body })),
  )
