import WebhookService from "@/services/webhook";
import { Context } from "hono"

class TelegramWebhookController {
  webhook = async(c: Context) => {
    const data = await c.req.json();

    const result = await WebhookService.process(data);

    if (!result) {
      c.status(400);
      return c.json({ message: 'Invalid request' });
    }

    return c.json(result);
  }
}

export default new TelegramWebhookController