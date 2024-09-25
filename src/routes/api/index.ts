
import { Hono } from 'hono';
import auth from './auth';
import connect from './connect';
import telegram from './telegram';
import authController from '@/controllers/authController';
import telegramWebhookController from '@/controllers/telegramWebhookController';

const app = new Hono();

app.route('/auth', auth);
app.route('/connect', connect);
app.route('/telegram', telegram);
app.post('/tele/webhook', telegramWebhookController.webhook);

app.get('/my-info', authController.myInfo);

export default app