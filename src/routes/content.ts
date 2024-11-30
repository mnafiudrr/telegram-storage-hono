import ContentController from "@/controllers/contentController";
import { Context, Hono } from "hono";

const content = new Hono();

content.get("/folder/:chatId/:path", ContentController.getFolder);
content.get("/file/:chatId/:path", ContentController.getFile);

export default content;