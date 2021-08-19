import { HttpMiddlewareEffect } from '@marblejs/core'
import { of } from 'rxjs'
import * as rx from 'rxjs/operators'
import { throwUnauthorized } from '../../exceptions/unauthorized'
import { Headers } from '../../shared/types'
import { isAuthenticated } from '../lps.logic'

export const writeAuthMiddleware: HttpMiddlewareEffect =
  req =>
    req.pipe(
      rx.mergeMap(req =>
        isAuthenticated(req.headers as Headers)
          ? of(req)
          : throwUnauthorized('Invalid api key'),
      ),
    )
