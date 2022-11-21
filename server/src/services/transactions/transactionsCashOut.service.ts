import { ITransactions } from "../../interface";
import { prisma } from "../../lib/prisma";

class userSearch {
  async handle(username: string) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        accounts: {
          select: {
            balance: true,
          },
        },
      },
    });
  }
}

class updateUserDatabase {
  async handle(id: string, balance: number) {
    await prisma.user.update({
      where: { id },
      data: {
        accounts: {
          update: {
            balance: balance,
          },
        },
      },
    });
  }
}

class transactionsCashOutService {
  async handle({ debitedAccountId, creditedAccountId, value }: ITransactions) {
    return await prisma.transactionsDebited.create({
      data: {
        debitedAccountId,
        creditedAccountId,
        value,
      },
    });
  }
}

class transactionsCashInService {
  async handle({ debitedAccountId, creditedAccountId, value }: ITransactions) {
    return await prisma.transactionsCredited.create({
      data: {
        debitedAccountId,
        creditedAccountId,
        value,
      },
    });
  }
}

export {
  transactionsCashOutService,
  userSearch,
  updateUserDatabase,
  transactionsCashInService,
};
