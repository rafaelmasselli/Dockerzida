import { Request, Response } from "express";
import {
  authLoginService,
  tokenGenerator,
} from "../../services/auth/authLogin.service";
import * as bcrypt from "bcrypt";

import { IAuthUser } from "../../interface";

class authLoginController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;
    try {
      const user = (await new authLoginService().handle(username)) as IAuthUser;

      const hashPassword = await bcrypt.compare(password, user.password);

      if (!hashPassword) {
        return response.status(400).json({
          message: "Incorrect password",
        });
      }

      const token = new tokenGenerator().handle({ user_id: user.id, username });

      response.status(200).json({
        token: token,
      });
    } catch (error) {
      response.status(400).json({
        message: "Password or username is wrong",
      });
    }
  }
}

export { authLoginController };
