import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";
import * as bcrypt from "bcrypt";

class createUserController {
  async handle(request: Request, response: Response) {
    const { username, password, confirmPassword } = request.body;
    try {
      if (password != confirmPassword) {
        return response.status(400).json({
          message: "The confirm password field is incorrect",
        });
      }

      if (username.indexOf(" ") >= 0) {
        return response.status(400).json({
          message: "The username field cannot contain spaces",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      response.status(201).json({
        message: "User created successfully",
      });
      await new createUserService().handle({
        username: username,
        password: hashPassword,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    }
  }
}

export { createUserController };
