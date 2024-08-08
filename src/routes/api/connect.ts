import { Hono } from 'hono';
import { jwtAuth } from '@/middlewares/auth';
import ConnectController from '@/controllers/connectController';

const app = new Hono();

app.get('/', jwtAuth, ConnectController.getConnect);
app.post('/create', jwtAuth, ConnectController.createConnection);

export default app