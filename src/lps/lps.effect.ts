import { HttpEffect } from '@marblejs/core'
import { map, mergeMap } from 'rxjs/operators'
import repo from './lps.repo'

export const getAllLPs: HttpEffect = req =>
  req.pipe(
    mergeMap(repo.getAllLPs),
    map(LPs => ({ body: { LPs } })),
  )
