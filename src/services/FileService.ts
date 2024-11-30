import { TeleChat } from "@/db/models";
import File from "@/db/models/File";
import Folder from "@/db/models/Folder";

type FileType = {
  folder?: Folder;
  folder_path?: string;
  chat_id: number;
  name?: string;
  path?: string;
  size?: number;
  mimes: string;
  thumbnail?: string;
  source: string;
}

class FileService {
  getFileFromSource = async(fileId: string): Promise<string> => {

    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}`;
    const getFile = await fetch(
      `https://api.telegram.org/bot${
        process.env.TELEGRAM_BOT_TOKEN
      }/getFile?file_id=${fileId}`
    );
    const result = await getFile.json();
    return `${fileUrl}/${result.result.file_path}`;
  }

  storeFromSource = async(data: FileType): Promise<void> => {
    console.log("storeFromSource");
    console.log(data);

    if (!data.source)
      throw new Error("No source");

    if (!data.chat_id)
      throw new Error("No chat_id");

    if (!data.name)
      data.name = `${this.#randomizer(10)}.${data.mimes.split("/")[1]}`;

    if (!data.folder_path)
      data.folder = await this.#getRootFolder(data.chat_id);
    else
      data.folder = await this.#getFolder(data.folder_path, data.chat_id);

    if (!data.path)
      data.path = `${await this.#createFilePath(data.chat_id)}.${data.mimes.split("/")[1]}`;

    await File.create({
      chatId: data.chat_id,
      folderId: data.folder.id,
      name: data.name,
      source: data.source,
      mimes: data.mimes,
      thumbnail: data.thumbnail,
      path: data.path,
      size: data.size
    });
  }

  #randomizer = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  #getRootFolder = async(chat_id: number): Promise<Folder> => {
    const folder = await Folder.findOne({
      where: {
        chatId: chat_id,
        parentId: null
      }
    });

    if (!folder)
      return await Folder.create({
        chatId: chat_id,
        name: "root",
        parentId: null,
        path: "/"
      });

    return folder;
  }

  #getFolder = async(path: string, chat_id: number): Promise<Folder> => {
    const folder = await Folder.findOne({
      where: {
        chatId: chat_id,
        path
      }
    });

    if (!folder)
      return await this.#getRootFolder(chat_id);

    return folder;
  }

  #createFilePath = async(chat_id: number): Promise<string> => {
    let randomPath = this.#randomizer(24);

    const file = await File.findOne({
      where: {
        chatId: chat_id,
        path: randomPath
      }
    });

    if (file)
      return await this.#createFilePath(chat_id);

    return randomPath;
  }

  #notify = async (chatId: number, message: string): Promise<void> => {
    const chat = await TeleChat.findOne({
      where: {
        chatId
      }
    });

    if (!chat)
      return;

  }
}

export default new FileService;