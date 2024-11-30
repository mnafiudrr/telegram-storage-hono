import { Connect, TeleChat } from "@/db/models";
import { WebhookRequestType } from "./types";
import FileService from "../FileService";


export class VideoService {
  TeleChatModel: TeleChat | null = null;
  Message: WebhookRequestType['message'] | null = null;

  process = async () : Promise<{ message: string, lastCommand?: string }> => {

    const command = this.TeleChatModel?.lastCommand;

    const { video } = this.Message as WebhookRequestType['message'];

    if (!video)
      return {
        message: 'no video'
      }

    const fullUrl = await FileService.getFileFromSource(video.file_id);
    const thumbnail = await FileService.getFileFromSource(video.thumb?.file_id || video.thumbnail?.file_id || '');

    FileService.storeFromSource({
      chat_id: this.TeleChatModel?.chatId as number,
      source: fullUrl,
      mimes: video.mime_type,
      thumbnail: thumbnail,
      size: video.file_size
    });

    return {
      message: 'success'
    }
  };
}