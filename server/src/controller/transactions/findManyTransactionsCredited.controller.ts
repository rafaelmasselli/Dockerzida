import { Request, Response } from "express";
import { IAccountAndTransfers, ITransactions } from "../../interface";
import { findManyTransactionsCreditedService } from "../../services/transactions/findManyTransactionsCredited.service";

class findManyTransactionsCreditedController {
  async handle(request: Request, response: Response) {
    try {
      const transaction =
        (await new findManyTransactionsCreditedService().handle(
          request.user_id
        )) as IAccountAndTransfers;

      if (!transaction.transactionsCredited[0]) {
        return response.status(400).json({
          message: "There is no transaction history",
        });
      }

      return response.status(200).json({
        transaction: transaction.transactionsCredited.map(
          ({
            id,
            value,
            createdAt,
            creditedAccountId,
            debitedAccountId,
          }: ITransactions) => {
            return {
              id: id,
              value: value,
              date: createdAt,
              creditedId: creditedAccountId,
              debitedId: debitedAccountId,
            };
          }
        ),
      });
    } catch (error) {
      console.log(error);
      return response.status(404).json({
        message: "transaction not found",
      });
    }
  }
}

export { findManyTransactionsCreditedController };
