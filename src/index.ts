import { Hono } from 'hono'
import routes from './routes'

const app = new Hono()

// app.get('/', (c) => {
//   const sampleJson = {
//     name: 'Hono',
//     message: 'Hello Hono!'
//   }
  
//   return c.json(sampleJson)
// })

app.route('/', routes)

export default app
