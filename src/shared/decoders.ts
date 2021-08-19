import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/Decoder'
import R from 'ramda'
import { URL } from 'url'
import { Brl, ErrorMsg, Integer, Url } from './types'
import * as E from 'fp-ts/Either'

/**
 * Decodes an object using io-ts
 * @param {D.Decoder} decoder a decoder to be used to decode the object
 * @param {unknown} obj an object to be decoded
 * @returns Either an ErrorMessage (string) or the obj
 */
export const ioDecoder =
  <T>(decoder: D.Decoder<unknown, T>) =>
  (obj: unknown): E.Either<ErrorMsg, T> =>
    E.mapLeft(D.draw)(decoder.decode(obj))

export const intDecoder: D.Decoder<unknown, Integer> = pipe(
  D.number,
  D.refine(
    (n): n is Integer => n === Math.round(n),
    'an integer',
  ),
)

export const urlDecoder: D.Decoder<unknown, Url> = pipe(
  D.string,
  D.refine(
    (s): s is Url =>
      pipe(
        E.tryCatch(R.always(new URL(s)), R.toString),
        E.isRight,
      ),
    'a valid url',
  ),
)

export const brlDecoder: D.Decoder<unknown, Brl> = pipe(
  D.string,
  D.refine(
    (s): s is Brl =>
      pipe(
        s,
        R.match(/[0-9]+\.[0-9]{2}/),
        R.length,
        Boolean,
      ),
    'a valid currency e.g. 123.12',
  ),
)

export const dateDecoder: D.Decoder<unknown, string> = pipe(
  D.string,
  D.refine(
    (s): s is string =>
      pipe(
        s,
        R.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
        R.length,
        Boolean,
      ),
    'a valid date e.g. 1992-04-27',
  ),
)
