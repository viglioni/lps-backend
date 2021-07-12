import { Either, isLeft, left, right } from 'fp-ts/lib/Either'
import R from 'ramda'
import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm'
import { ErrorMsg } from '../shared/types'

type DataBaseCredentials = {
  database: string
  password: string
  username: string
  host: string
}

function getCredentials(): Either<ErrorMsg, DataBaseCredentials> {
  const credentials = {
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
  } as DataBaseCredentials

  return R.all(Boolean, R.values(credentials))
    ? right(credentials)
    : left('Failed to get database credentials')
}

export async function connectoToDB(): Promise<Either<ErrorMsg, Connection>> {
  const credentials = getCredentials()
  if (isLeft(credentials)) {
    return credentials
  }

  const connOpts = await getConnectionOptions()

  return createConnection({
    ...connOpts,
    ...credentials.right,
  } as ConnectionOptions)
    .then(right)
    .catch(left)
}
