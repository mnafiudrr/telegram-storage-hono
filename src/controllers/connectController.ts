import { Connect } from "@/db/models";
import { Context } from "hono"

class ConnectController {

  createConnection = async (c: Context) => {
    const user = c.get('jwtPayload');
    const connectExist = await Connect.findOne({ where: { userId: user.id, chatId: null } });

    if (connectExist) {
      return c.json({ 
        message: `You already have a key need to connect`,
        data: {
          key: connectExist.key
        }
      });
    }
    const connect = await Connect.create({
      userId: user.id,
      key: Math.random().toString(36).substring(2, 10),
      chatId: null
    });
    return c.json({
      message: `Connection created successfully`,
      data: {
        key: connect.key
      }
    });
  }

  getConnect = async (c: Context) => {
    const user = c.get('jwtPayload');
    const params = c.req.param();
    
    let query = {
      where: { userId: user.id }
    }

    const connect = await Connect.findAll(query);
    if (!connect) {
      return c.json({ 
        message: `You don't have a connection`,
      });
    }
    return c.json({
      message: `Connection found`,
      data: connect
    });
  }
}

export default new ConnectController;