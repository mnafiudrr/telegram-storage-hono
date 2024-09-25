import { Connect, TeleChat } from "@/db/models";
import { WebhookRequestType } from "./types";


export class PhotoService {
  TeleChatModel: TeleChat | null = null;
  Message: WebhookRequestType['message'] | null = null;

  process = async () : Promise<{ message: string, lastCommand?: string }> => {

    const command = this.TeleChatModel?.lastCommand;

    const { photo } = this.Message as WebhookRequestType['message'];

    if (!photo)
      return {
        message: 'no photo'
      }

    const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}`;

    const getFile = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${photo[photo.length - 1].file_id}`);

    const result = await getFile.json();
    console.log('getFile.json()');
    console.log(result.result);
    console.log(`${url}/${result.result.file_path}`);
    
    this.TeleChatModel?.sendMessage(`${url}/${result.result.file_path}`, 'text');

    return {
      message: 'success'
    }
  };
}