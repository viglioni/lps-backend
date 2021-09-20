/* eslint-disable camelcase */
import { pipe } from 'fp-ts/lib/function'
import R from 'ramda'
import { AddLp, PreSaveLpsEntity } from './lps.decoders'

const preCreateLp = (reqBody: AddLp): PreSaveLpsEntity => {
  const year = pipe(
    reqBody.released,
    R.replace(/-.*/, ''),
    Number,
  )

  const cover_url = pipe(
    [reqBody.artist, reqBody.name, year],
    R.map(R.toString),
    R.reduce(R.concat, ''),
    R.replace(/[^a-zA-Z0-9]/g, ''),
    name => `http://lps-covers.viglioni.com/${name}.jpeg`,
  )

  return {
    name: reqBody.name,
    artist: reqBody.artist,
    released: new Date(reqBody.released),
    purchase_date: new Date(reqBody.purchaseDate),
    value: reqBody.value,
    origin: reqBody.origin,
    gift_from: reqBody.giftFrom,
    cover_url,
    for_sale: reqBody.forSale,
  }
}

export default { preCreateLp }
