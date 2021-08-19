import { HttpError, HttpStatus } from '@marblejs/core'
import { throwError } from 'rxjs'
import { ErrorMsg } from '../shared/types'

export class Unauthorized extends HttpError {
  public constructor(message: ErrorMsg) {
    super(
      'Unauthorized: ' + message,
      HttpStatus.UNAUTHORIZED,
    )
  }
}

export const throwUnauthorized = (
  errorMsg: ErrorMsg = '',
) => throwError(new Unauthorized(errorMsg))
