import { pipe } from 'fp-ts/lib/function'
import {
  left,
  mapLeft,
  TaskEither,
  tryCatch,
  chain,
  map,
} from 'fp-ts/lib/TaskEither'
import R from 'ramda'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import { ErrorMsg } from '../shared/types'

function getConnectionConfig(): TaskEither<ErrorMsg, ConnectionOptions> {
  const credentials = {
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
  }

  if (R.any(R.isNil, R.values(credentials))) {
    return left('Failed to get database credentials')
  }

  return pipe(
    tryCatch(getConnectionOptions, R.toString),
    map(opts => ({ ...opts, ...credentials } as ConnectionOptions)),
  )
}

export function connectoToDB(): TaskEither<ErrorMsg, Connection> {
  return pipe(
    getConnectionConfig(),
    chain(opts => tryCatch(() => createConnection(opts), R.toString)),
    mapLeft(R.concat('Problem connecting to the database: ')),
  )
}
