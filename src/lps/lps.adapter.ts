import { pipe } from 'fp-ts/lib/function'
import R from 'ramda'
import { AddLp, PreSaveLpsEntity } from './lps.decoders'

const preCreateLp = (reqBody: AddLp): PreSaveLpsEntity => {
  const cover_url = pipe(
    [reqBody.artist, reqBody.name, reqBody.year],
    R.map(R.toString),
    R.reduce(R.concat, ''),
    R.replace(/[^a-zA-Z0-9]/g, ''),
    name => `http://lps-covers.viglioni.com/${name}.jpeg`,
  )

  return {
    name: reqBody.name,
    artist: reqBody.artist,
    year: reqBody.year,
    purchase_date: new Date(reqBody.purchaseDate),
    value: reqBody.value,
    origin: reqBody.origin,
    gift_from: reqBody.giftFrom,
    cover_url,
  }
}

export default { preCreateLp }
