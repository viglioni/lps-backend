import { Headers } from '../shared/types'

export const isAuthenticated = ({
  api_key,
}: Headers): boolean => {
  const envApiKey = process.env.API_KEY
  return api_key === envApiKey
}
