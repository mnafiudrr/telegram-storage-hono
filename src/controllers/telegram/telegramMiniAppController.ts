import { Context } from "hono"
import { sign } from "hono/jwt"
import { SequelizeScopeError } from "sequelize"
import { checkHash, hash } from "@/utils/crypt"
import { Role, User } from "@/db/models"

class TelegramMiniAppController {
  checkConnection = async (c: Context) => {
    return c.json({ message: "Connection success" });
    // let dataJson = await c.req.json();
    // const user = await User.findOne({ where: { username: dataJson.username } });
    // if (!user || !(await checkHash(dataJson.password, user.password))) {
    //   c.status(400);
    //   return c.json({ message: "Invalid username or password" });
    // }

    // const payload = {
    //   id: user.id,
    //   username: user.username,
    //   email: user.email,
    //   roleId: user.roleId,
    //   exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7 * 4) // 4 weeks
    // }

    // const token = await sign(payload, process.env.JWT_SECRET || 'secret');

    // return c.json({ message: "login success", token });
  }
}

export default new TelegramMiniAppController()