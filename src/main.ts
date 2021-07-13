import { createServer, httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { pipe } from 'fp-ts/lib/function'
import { IO, of } from 'fp-ts/lib/IO'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import 'reflect-metadata'
import { connectoToDB } from './db/connection'
import { helloThere } from './hello-there/hello-there.controller'
import { lps } from './lps/lps.controller'
import { cors } from './middlewares/cors.middleware'
import * as Env from './shared/env'
import { ErrorMsg } from './shared/types'

function killServer(err: ErrorMsg): T.Task<unknown> {
  console.error(err)
  process.exit()
}

async function main(): Promise<IO<void>> {
  const middlewares = [cors, bodyParser$()]

  const effects = [helloThere, lps]

  const listener = httpListener({
    effects,
    middlewares,
  })

  const server = await createServer({
    port: Env.getPort() || 3000,
    listener,
  })

  await pipe(connectoToDB(), TE.fold(killServer, T.of))()

  server()

  return of({})
}

main()
