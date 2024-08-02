import { Context } from 'hono'
import { jwt } from 'hono/jwt'

export const jwtAuth = async (c: Context, next: () => Promise<void>) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || 'secret',
  })
  return jwtMiddleware(c, next)
}