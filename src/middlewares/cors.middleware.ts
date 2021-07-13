import { cors$ } from '@marblejs/middleware-cors'

export const cors = cors$({
  origin: '*',
  methods: ['OPTIONS', 'GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'HEAD'],
  allowHeaders: ['Authorization', 'Content-Type', 'Origin'],
})
