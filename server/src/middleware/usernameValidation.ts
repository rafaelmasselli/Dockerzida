import { Request, NextFunction, Response } from "express";
import { ValideUserService } from "../services/user/createUser.service";

class usernameValidation {
  async handle(
    request: Request,
    response: Response,
    nextFunction: NextFunction
  ) {
    const { username } = request.body;

    const usernames = await new ValideUserService().handle();
    usernames.map((res) => {
      if (res.username == username) {
        return response.status(400).json({
          message: "Existing usernames",
        });
      }
    });

    if (username.length < 3) {
      return response.status(400).json({
        message: "The name must contain more than 3 digits",
      });
    }

    nextFunction();
  }
}

export { usernameValidation };
