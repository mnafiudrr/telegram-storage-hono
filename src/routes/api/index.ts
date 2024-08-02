
import { Hono } from 'hono'
import auth from './auth'
import authController from '@/controllers/authController';

const app = new Hono()

app.route('/auth', auth)

app.get('/my-info', authController.myInfo);

export default app