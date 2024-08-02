import { Hono } from 'hono'
import api from './api'

const app = new Hono();

const excludedJwtPaths = [
  '/api/auth/login',
  '/api/auth/register',
];

app.get('/', (c) => {
  const sampleJson = {
    name: 'Hono',
    message: 'Hello Hononafiu~!'
  }
  
  return c.json(sampleJson)
})


app.route('/api', api)

export default app