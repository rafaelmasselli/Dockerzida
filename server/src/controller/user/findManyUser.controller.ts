import { Response, Request } from "express";
import { findManyUserService } from "../../services/user/findManyUser.service";

class findManyUserController {
  async handle(request: Request, response: Response) {
    try {
      const users = await new findManyUserService().handle();

      if (!users) {
        return response.status(400).json({
          status: "Users not found",
        });
      }

      return response.status(200).json({
        users,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    }
  }
}

export { findManyUserController };
