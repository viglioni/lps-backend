import { Either, isLeft, left, right } from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import * as R from 'ramda'
import { Connection, createConnection } from 'typeorm'
import { ErrorMsg } from '../shared/types'
import * as Env from '../shared/env'

type DataBaseCredentials = {
  database: string
  username: string
  host: string
  password: string
}

export function getCredentials(): Either<ErrorMsg, DataBaseCredentials> {
  const conn = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
  }

  return R.all(Boolean, R.values(conn))
    ? right(conn as DataBaseCredentials)
    : left('Could not find credentials')
}

export function connectToDb(): TaskEither<ErrorMsg, Connection> {
  const credentials = getCredentials()
  if (isLeft(credentials)) {
    return TE.left(credentials.left)
  }

  const conn = createConnection({
    ...credentials.right,
    name: 'default',
    type: 'mysql',
    port: 3306,
    entities: [Env.isDev() ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
    synchronize: true,
    logging: ['error'],
  })

  return tryCatch(
    () => conn,
    err => 'Error connecting to Database: ' + JSON.stringify(err),
  )
}
