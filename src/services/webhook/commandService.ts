import { Connect, TeleChat } from '@/db/models';
import { WebhookRequestType } from './types';
import { TEMPLATE_NEED_TO_CONNECT, TEMPLATE_DISCONNECT_SUCCESS, TEMPLATE_NOT_CONNECTED, TEMPLATE_ALREADY_CONNECTED, TEMPLATE_PROVIDE_KEY, TEMPLATE_HELP, TEMPLATE_COMMAND_NOT_FOUND, TEMPLATE_WELCOME_BACK } from '@/utils/templates/messages';

class CommandService {

  TeleChatModel: TeleChat | null = null;

  Message: WebhookRequestType['message'] | null = null;

  process = async () : Promise<{ message: string }> => {
    let command = this.#getCommand();
    if (!command) 
      return {
        message: 'command not found'
      };

    let response: { message: string } = { message: 'command not found' };
    switch (command) {
      case '/start':
        response = await this.#commandStart();
        break;
      case '/connect':
        response = await this.#commandConnect();
        break;
      case '/disconnect':
        response = await this.#commandDisconnect();
        command = null;
        break;
      case '/help':
        response = await this.#commandHelp();
        break;
      case '/sendMeTheRequest':
        response = await this.#commandSendMeTheRequest();
        break;
      default:
        response = await this.#commandNotFound();
        command = null;
        break;
    }

    this.TeleChatModel?.update({ lastCommand: command });
    this.TeleChatModel?.save();

    return response;
  }

  #getCommand = () => {
    const { text, entities } = this.Message as WebhookRequestType['message'];

    if (entities && entities.some(entity => entity.type === 'bot_command')) {
      return text?.split(' ')[0];
    }
    return null;
  }

  #commandStart = async () => {
    const connect = await this.TeleChatModel?.getConnect();
    if (connect) {
      const user = (await connect.getUser()).toJSON();
      let text = TEMPLATE_WELCOME_BACK.replace('SENDER_NAME', this.TeleChatModel?.firstName || this.TeleChatModel?.username || '').replace('USER_NAME', user.username || user.email || '');
      this.TeleChatModel?.sendMessage(text, 'text');
      return {
        message: text
      }
    }
    let text = TEMPLATE_NEED_TO_CONNECT.replace('SENDER_NAME', this.Message?.from?.first_name || this.Message?.from?.username || '');
    this.TeleChatModel?.sendMessage(text, 'text');

    return {
      message: text
    };
  }

  #commandConnect = async () => {
    const connect = await this.TeleChatModel?.getConnect();
    if (connect) {
      this.TeleChatModel?.sendMessage(TEMPLATE_ALREADY_CONNECTED, 'text');
      return {
        message: TEMPLATE_ALREADY_CONNECTED
      }
    } else {
      this.TeleChatModel?.sendMessage(TEMPLATE_PROVIDE_KEY, 'text');
      return {
        message: TEMPLATE_PROVIDE_KEY
      }
    }
  }

  #commandDisconnect = async () => {
    const connect = await this.TeleChatModel?.getConnect();
    if (!connect) {
      this.TeleChatModel?.sendMessage(TEMPLATE_NOT_CONNECTED, 'text');
      return {
        message: TEMPLATE_NOT_CONNECTED
      };
    }

    await connect.destroy();
    this.TeleChatModel?.sendMessage(TEMPLATE_DISCONNECT_SUCCESS, 'text');

    return {
      message: TEMPLATE_DISCONNECT_SUCCESS
    };
  }

  #commandHelp = async () => {
    this.TeleChatModel?.sendMessage(TEMPLATE_HELP, 'text');
    return {
      message: TEMPLATE_HELP
    }
  }

  #commandNotFound = async () => {
    this.TeleChatModel?.sendMessage(TEMPLATE_COMMAND_NOT_FOUND, 'text');
    return {
      message: TEMPLATE_COMMAND_NOT_FOUND
    }
  }

  #commandSendMeTheRequest = async () => {
    this.TeleChatModel?.sendMessage('Ok, please send me the request\nOnly one request', 'text');
    return {
      message: 'Ok then'
    }
  }
}

export default CommandService;