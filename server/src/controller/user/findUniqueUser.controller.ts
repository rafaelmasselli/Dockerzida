import { Request, Response } from "express";
import { IUserFindUnique } from "../../interface";
import { findUniqueUserService } from "../../services/user/findUniqueUser.service";

class findUniqueUserController {
  async handle(request: Request, response: Response) {
    try {
      const user = (await new findUniqueUserService().handle(
        request.user_id
      )) as unknown as IUserFindUnique;

      if (!user) {
        return response.status(400).json({
          message: "User not found",
        });
      }
      if (!user.accounts.balance) {
        return response.status(400).json({
          message: "No bank error",
        });
      }

      return response.status(200).json({
        user: user.username,
        balance: user.accounts.balance,
        countDebited: user.accounts.transactionsDebited.length,
        countCredited: user.accounts.transactionsCredited.length,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    }
  }
}

export { findUniqueUserController };
