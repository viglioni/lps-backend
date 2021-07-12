import { createServer, httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { IO, of } from 'fp-ts/lib/IO'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { helloThere } from './hello-there/hello-there.controller'
import { lps } from './lps/lps.controller'
import * as Env from './shared/env'

async function main(): Promise<IO<void>> {
  const middlewares = [bodyParser$()]

  const effects = [helloThere, lps]

  const listener = httpListener({
    effects,
    middlewares,
  })

  const server = await createServer({
    port: Env.getPort() || 3000,
    listener,
  })

  await createConnection().catch(err => {
    console.error('Problem connecting to the database: ' + JSON.stringify(err))
    process.exit()
  })

  server()

  return of({})
}

main()
