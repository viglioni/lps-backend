import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/Decoder'
import {
  brlDecoder,
  dateDecoder,
  intDecoder,
} from '../shared/decoders'
import { LpYear } from '../shared/types'
import { LPsEntity } from './entities/lps.entity'

/**
 * Decodes valid LP year
 * [1948, 2050[
 */
const lpYeardecoder: D.Decoder<unknown, LpYear> = pipe(
  intDecoder,
  D.refine(
    (n): n is LpYear => n >= 1948 && n < 2050,
    'a valid year [1948,2050[',
  ),
)

export const addLpDecoder = pipe(
  D.struct({
    artist: D.string,
    name: D.string,
    year: lpYeardecoder,
    purchaseDate: dateDecoder,
    value: brlDecoder,
  }),
  D.intersect(
    D.partial({
      origin: D.string,
      giftFrom: D.string,
    }),
  ),
)

export type AddLp = D.TypeOf<typeof addLpDecoder>

export type PreSaveLpsEntity = Omit<LPsEntity, 'id'>
