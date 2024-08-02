import { Hono } from 'hono'
import AuthController from '@/controllers/authController'
import requestValidator from '@/utils/request-validator'
import { jwtAuth } from '@/middlewares/auth'

const app = new Hono();

app.post('/login', 
  requestValidator('json', { required: ['username', 'password'] }),
  AuthController.login
);

app.get('/my-info', jwtAuth, AuthController.myInfo);

app.post(
  '/register', 
  requestValidator('json', { required: ['username', 'password'] }),
  AuthController.register
);

export default app;