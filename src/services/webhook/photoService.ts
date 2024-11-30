import { TeleChat } from "@/db/models";
import { WebhookRequestType } from "./types";
import FileService from "../FileService";


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

    const fullUrl = await FileService.getFileFromSource(photo[photo.length - 1].file_id);
    const thumbnail = await FileService.getFileFromSource(photo[0].file_id);

    FileService.storeFromSource({
      chat_id: this.TeleChatModel?.chatId as number,
      source: fullUrl,
      mimes: 'image/jpg',
      thumbnail: thumbnail,
      size: photo[photo.length - 1].file_size
    });

    return {
      message: 'success'
    }
  };
}