import { HttpError, HttpStatus } from '@marblejs/core'
import { throwError } from 'rxjs'
import { ErrorMsg } from '../shared/types'

export class BadRequest extends HttpError {
  public constructor(message: ErrorMsg) {
    super('Bad request: ' + message, HttpStatus.BAD_REQUEST)
  }
}

export const throwBadRequest = (errorMsg: ErrorMsg = '') =>
  throwError(new BadRequest(errorMsg))
