import { Request, Response } from "express";
import { IAccountAndTransfers, ITransactions } from "../../interface";
import { viewTransactionsService } from "../../services/transactions/viewTransactions.service";

class viewTransactionsController {
  async handle(request: Request, response: Response) {
    try {
      const transaction = (await new viewTransactionsService().handle(
        request.user_id
      )) as unknown as IAccountAndTransfers;
      if (
        !transaction.transactionsDebited[0] &&
        !transaction.transactionsCredited[0]
      ) {
        return response.status(400).json({
          message: "no transitions yet",
        });
      }

      if (
        transaction.transactionsDebited[0] &&
        transaction.transactionsCredited[0]
      ) {
        return response.status(200).json({
          TransactionsDebited: transaction.transactionsDebited.map(
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
          transactionsCredited: transaction.transactionsCredited.map(
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
      } else if (transaction.transactionsDebited[0]) {
        return response.status(200).json({
          TransactionsDebited: transaction.transactionsDebited.map(
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
      } else {
        return response.status(200).json({
          transactionsCredited: transaction.transactionsCredited.map(
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
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: "unexpected error please try again later",
      });
    }
  }
}

export { viewTransactionsController };
