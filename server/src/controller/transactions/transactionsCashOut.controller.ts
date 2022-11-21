import { Request, Response } from "express";
import {
  transactionsCashOutService,
  userSearch,
  updateUserDatabase,
  transactionsCashInService,
} from "../../services/transactions/transactionsCashOut.service";

class transactionsCashOutController {
  async handle(request: Request, response: Response) {
    const transactionCashOut = new transactionsCashOutService();
    const transactionCashIn = new transactionsCashInService();
    const searchUser = new userSearch();
    const UpdateUserBalance = new updateUserDatabase();

    const { username, value } = request.body;

    const senderUser = await searchUser.handle(request.username);
    const recipientUser = await searchUser.handle(username);

    if (senderUser == username) {
      return response.status(400).json({
        message: "you cannot make a transaction for you",
      });
    }

    if (!recipientUser || !senderUser) {
      return response.status(400).json({
        message: "User not found",
      });
    }

    if (!senderUser.accounts?.balance) {
      return response.status(400).json({
        message: "Account without balance",
      });
    }

    if (senderUser.accounts.balance < value) {
      return response.status(400).json({
        message: "Insufficient funds",
      });
    }

    await UpdateUserBalance.handle(
      request.user_id,
      senderUser.accounts.balance - value
    ).catch((error) => {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    });

    await UpdateUserBalance.handle(
      recipientUser.id,
      recipientUser.accounts?.balance + value
    ).catch((error) => {
      console.log(error);
      return response.status(500).json({
        message: "Unexpected error please try again later",
      });
    });

    await transactionCashOut
      .handle({
        creditedAccountId: recipientUser.id,
        debitedAccountId: request.user_id,
        value: value,
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({
          message: "Download failed, please try again later.",
        });
      });

    await transactionCashIn
      .handle({
        creditedAccountId: recipientUser.id,
        debitedAccountId: request.user_id,
        value: value,
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({
          message: "Download failed, please try again later.",
        });
      });

    return response.status(200).json({
      message: `Transaction for ${username} successfully completed`,
      value: value,
    });
  }
}

export { transactionsCashOutController };
