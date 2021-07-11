import { r } from '@marblejs/core'
import { mapTo } from 'rxjs/operators'

export const helloThere = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req => req.pipe(mapTo({ body: 'Hello there!' }))),
)
