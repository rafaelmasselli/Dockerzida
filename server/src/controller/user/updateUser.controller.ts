import { Request, Response } from "express";
import {
  updatePasswordUserService,
  updateUsernameUserService,
} from "../../services/user/updateUser.service";

class updaterUsernameUserController {
  async handle(request: Request, response: Response) {
    const { username } = request.body;
    try {
      const user = await new updateUsernameUserService().handle(
        request.user_id,
        username
      );
      if (!user) {
        return response.status(400).json({
          message: "User not found",
        });
      }
      return response.status(201).json({
        message: `User ${username} successfully edited`,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    }
  }
}

class updatePasswordUserController {
  async handle(request: Request, response: Response) {
    const { password } = request.body;
    try {
      const user = await new updatePasswordUserService().handle(
        request.user_id,
        password
      );
      if (!user) {
        return response.status(400).json({
          message: "User not found",
        });
      }
      return response.status(201).json({
        message: `User ${request.username} successfully edited`,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    }
  }
}

export { updaterUsernameUserController, updatePasswordUserController };
