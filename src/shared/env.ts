export function getPort(): number | undefined {
  const port = process.env.PORT
  return port?.length && Number(port)
}

enum RunMode {
  PRODUCTION,
  DEV,
}

export function getRunMode(): RunMode {
  return process.env.TS_NODE_DEV ? RunMode.DEV : RunMode.PRODUCTION
}

export function isProd(): boolean {
  return getRunMode() === RunMode.PRODUCTION
}

export function isDev(): boolean {
  return getRunMode() === RunMode.DEV
}
