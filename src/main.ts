import { createServer, httpListener } from '@marblejs/core'
import { bodyParser$ } from '@marblejs/middleware-body'
import { IO } from 'fp-ts/lib/IO'
import * as Task from 'fp-ts/lib/Task'
import 'reflect-metadata'
import { connectToDb } from './db/connection'
import { helloThere } from './hello-there/hello-there.controller'
import { lps } from './lps/lps.controller'
import { tryCatch } from 'fp-ts/lib/TaskEither'
import * as Env from './shared/env'

async function prepareServer(): Promise<void> {
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

  tryCatch(Task.of(connectToDb()), err => {
    console.error(err)
    process.exit()
  })

  server()
}

function main(): IO<void> {
  return () => prepareServer()
}

main()()
