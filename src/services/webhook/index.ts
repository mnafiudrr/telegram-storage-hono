import { ChatType, WebhookRequestType } from "./types"
import CommandService from "./commandService";
import textService from "./textService";
import { TeleChat } from "@/db/models";
import { PhotoService } from "./photoService";
import { VideoService } from "./videoService";

class WebhookService {
  
  #chatModel: TeleChat | null = null;

  async process(data: WebhookRequestType) {

    if (!data.message) 
      return false;

    const { message } = data;
    const { chat } = message;

    if (!chat) 
      return false;

    await this.#getChatModel(chat);
    console.log(this.#chatModel?.get());

    if (this.#chatModel?.lastCommand === '/sendMeTheRequest') {

      this.#chatModel?.update({ lastCommand: null });
      this.#chatModel?.save();

      this.#chatModel?.sendMessage(JSON.stringify(data), 'text');
      return data;
    }

    const processed = this.#messageProcess(message);
    
    return processed;
  }


  #getChatModel = async (chat: ChatType) => {
    this.#chatModel = await TeleChat.findOne({ where: { chatId: chat.id } });
    if (!this.#chatModel)
      this.#chatModel = await TeleChat.create({
        chatId: chat.id,
        title: chat.title,
        firstName: chat.first_name,
        lastName: chat.last_name,
        username: chat.username,
        type: chat.type
      });
  }

  #messageProcess = async (message: WebhookRequestType['message']) => {

    const processor = this.#getProcessor(message);
    if (!processor) return;

    processor.Message = message;
    processor.TeleChatModel = this.#chatModel;
    return await processor.process();
  }

  #getProcessor = (message: WebhookRequestType['message']) => {
    if (message.text && message.entities && message.entities.some(entity => entity.type === 'bot_command')) {
      return new CommandService();
    } else if (message.text) {
      return new textService();
    } else if (message.photo) {
      return new PhotoService();
    } else if (message.video) {
      return new VideoService();
    } else if (message.audio) {
      console.log('audio')
      return false;
    } else if (message.voice) {
      console.log('voice')
      return false;
    } else if (message.document) {
      console.log('document')
      return false;
    } else if (message.sticker) {
      console.log('sticker')
      return false;
    } else if (message.animation) {
      console.log('animation')
      return false;
    } else if (message.video_note) {
      console.log('video_note')
      return false;
    } else {
      console.log('unknown type')
      return false;
    }
  }
}

export default new WebhookService()