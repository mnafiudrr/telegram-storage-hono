import { TEMPLATE_CONNECT_SUCCESS, TEMPLATE_INVALID_KEY } from "@/utils/templates/messages";
import { WebhookRequestType } from "./types";
import { Connect, TeleChat } from "@/db/models";

class TextService {

  TeleChatModel: TeleChat | null = null;

  Message: WebhookRequestType['message'] | null = null;

  process = async () : Promise<{ message: string, lastCommand?: string }> => {
    const command = this.TeleChatModel?.lastCommand;

    const { text } = this.Message as WebhookRequestType['message'];

    if (!text)
      return this.#unknown();

    switch (command) {
      case '/connect':
        return await this.#connect(text);
    
      default:
        return {
          message: text,
          lastCommand: command??''
        }
    }
  }

  #unknown = () => {
    const message = `umm, what do you want me to do?`;
    this.TeleChatModel?.sendMessage(message, 'text');
    return { message };
  }

  #connect = async (key: string) => {
    const connect = await Connect.findOne({ where: { key, chatId: null } });
    if (!connect) {
      this.TeleChatModel?.sendMessage(TEMPLATE_INVALID_KEY, 'text');
      return {
        message: TEMPLATE_INVALID_KEY
      };
    }

    await connect.update({ chatId: this.TeleChatModel?.id });
    await connect.save();

    const user = (await connect.getUser()).toJSON();
    const text = TEMPLATE_CONNECT_SUCCESS.replace('USERNAME', user.username ?? user.email ?? '');
    this.TeleChatModel?.sendMessage(text, 'text');
    
    return {
      message: text,
    };
  }
}

export default TextService