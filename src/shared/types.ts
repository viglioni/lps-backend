import { IncomingHttpHeaders } from 'http'

export type ErrorMsg = string
export type ApiKey = string
export type LpYear = number
export type Integer = number
export type Url = string
export type Brl = string

export type Headers = IncomingHttpHeaders & {
  api_key?: string
}
