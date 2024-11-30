import File from "@/db/models/File";
import Folder from "@/db/models/Folder";
import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

class ContentController {
  public async getFolder(c: Context) {
    let path = c.req.param("path");
    let chatId = c.req.param("chatId");

    if (!path) {
      c.status(400);
      return c.json({ message: "Path is required" });
    }

    if (!chatId) {
      c.status(400);
      return c.json({ message: "Chat ID is required" });
    }

    if (path === "root") path = "/";

    const folder = await Folder.findOne({
      where: {
        path,
        chatId,
      },
    });

    if (!folder) {
      c.status(404);
      return c.json({ message: "Folder not found" });
    }

    const folders = await Folder.findAll({
      where: {
        parentId: folder.id,
      }
    });

    const files = await folder.getFiles();

    return c.json({ ...folder.toJSON(), folders, files });
  }

  public async getFile(c: Context) {
    let path = c.req.param("path");
    let chatId = c.req.param("chatId");
    
    if (!path || !chatId || isNaN(Number(chatId))) {
      c.status(404);
      return c.json({ message: "File not found" });
    }

    const file = await File.findOne({
      where: {
        path,
        chatId,
      },
    });

    if (!file) {
      c.status(404);
      return c.json({ message: "File not found" });
    }

    let sourceUrl = file.source;
    let filename = file.name;
    const thumbnail = c.req.query("thumbnail");
    if (thumbnail === "true") {
      sourceUrl = file.thumbnail;
      filename = `${file.name.split(".")[0]}-thumbnail.jpg`;
    }
    try {
      const response = await fetch(sourceUrl);

      if (!response.ok) {
        const statusCode = response.status;
        c.status(statusCode as StatusCode);
        return c.json({ message: "Failed to fetch the file" });
      }

      c.header(
        "Content-Type",
        response.headers.get("Content-Type") || "application/octet-stream"
      );
      c.header(
        "Content-Disposition",
        response.headers.get("Content-Disposition") || "inline"
      );

      c.header(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      return c.body(response.body);
    } catch (error: any) {
      c.status(500);
      return c.json({ 
        message: "Internal server error", 
        error: error 
      });
    }
  }
}

export default new ContentController();
