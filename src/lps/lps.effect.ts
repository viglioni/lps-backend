import { HttpEffect } from '@marblejs/core'
import { map, mergeMap } from 'rxjs/operators'
import { getRepository } from 'typeorm'
import { LPsEntity } from './entities/lps.entity'

const getAll = () => getRepository(LPsEntity).createQueryBuilder().getMany()

export const getAllLPs: HttpEffect = req =>
  req.pipe(
    mergeMap(getAll),
    map(LPs => ({
      body: {
        LPs,
      },
    })),
  )
