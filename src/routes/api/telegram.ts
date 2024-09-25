import { Hono } from 'hono'
import AuthController from '@/controllers/authController'
import requestValidator from '@/utils/request-validator'
import telegramMiniAppController from '@/controllers/telegram/telegramMiniAppController';

const app = new Hono();

app.post(
  '/check-connect', 
  requestValidator('json', { required: ['user_id'] }),
  telegramMiniAppController.checkConnection
);

export default app;