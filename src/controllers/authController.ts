import { Context } from "hono"
import { sign } from "hono/jwt"
import { SequelizeScopeError } from "sequelize"
import { checkHash, hash } from "@/utils/crypt"
import { Role, User } from "@/db/models"

class AuthController {
  login = async (c: Context) => {
    let dataJson = await c.req.json();
    const user = await User.findOne({ where: { username: dataJson.username } });
    if (!user || !(await checkHash(dataJson.password, user.password))) {
      c.status(400);
      return c.json({ message: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7 * 4) // 4 weeks
    }

    const token = await sign(payload, process.env.JWT_SECRET || 'secret');

    return c.json({ message: "login success", token });
  }

  logout = async (c: Context) => {

    return c.json({ message: "logout success" });
  }

  register = async (c: Context) => {

    let dataJson = await c.req.json();
    
    const hashedPassword = await hash(dataJson.password);
    const role = await Role.findOne({ where: { name: 'user' } });
    
    try {
      const userInstance = User.build({
        username: dataJson.username,
        email: dataJson.email || null,
        password: hashedPassword,
        roleId: role?.id || 2
      });
  
      const newUser = await userInstance.save();
    } catch (error: SequelizeScopeError | any) {
      if (error.errors) {
        c.status(400);
        return c.json({ message: error.errors[0].message });
      }
      c.status(500);
      console.log(error);
      
      return c.json({ message: "An error occurred while processing the request" });
    }

    return c.json({ message: "The register is successful" });
  }

  myInfo = async (c: Context) => {
    const payload = c.get('jwtPayload')
    return c.json(payload)
  }
}

export default new AuthController()