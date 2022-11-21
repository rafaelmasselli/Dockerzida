import { Request, Response } from "express";
import { IAccountAndTransfers, ITransactions } from "../../interface";
import { findManyFilterDateTransactionsDebitedService } from "../../services/transactions/findManyFilterDateTransactionsDebited.service";

class findManyFilterDateTransactionsDebitedController {
  async handle(request: Request, response: Response) {
    try {
      const transaction =
        (await new findManyFilterDateTransactionsDebitedService().handle(
          request.user_id
        )) as IAccountAndTransfers;

      if (!transaction.transactionsDebited[0]) {
        return response.status(400).json({
          message: "There is no transaction history",
        });
      }

      return response.status(200).json({
        transaction: transaction.transactionsDebited.map(
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

export { findManyFilterDateTransactionsDebitedController };
