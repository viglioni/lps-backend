import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/Decoder'
import { brlDecoder, dateDecoder } from '../shared/decoders'
import { LPsEntity } from './entities/lps.entity'

export const addLpDecoder = pipe(
  D.struct({
    artist: D.string,
    name: D.string,
    released: dateDecoder,
    purchaseDate: dateDecoder,
    value: brlDecoder,
  }),
  D.intersect(
    D.partial({
      origin: D.string,
      giftFrom: D.string,
      forSale: D.boolean,
    }),
  ),
)

export type AddLp = D.TypeOf<typeof addLpDecoder>

export type PreSaveLpsEntity = Omit<LPsEntity, 'id'>
