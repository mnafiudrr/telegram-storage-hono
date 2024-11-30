import { Hono } from 'hono'
import api from './api'
import content from './content';

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

app.get('/get-db', (c) => {
  const sampleJson = {
    name: 'Hono Check DB'
  }
  
  return c.json(sampleJson)
})


app.route('/api', api)
app.route('/content', content)

export default app