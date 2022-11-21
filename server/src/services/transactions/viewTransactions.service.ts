import { prisma } from "../../lib/prisma";

class viewTransactionsService {
  async handle(id: string) {
    return await prisma.accounts.findUnique({
      where: { id },
      select: {
        balance: true,
        transactionsCredited: {
          select: {
            id: true,
            value: true,
            creditedAccountId: true,
            debitedAccountId: true,
            createdAt: true,
          },
        },
        transactionsDebited: {
          select: {
            id: true,
            value: true,
            creditedAccountId: true,
            debitedAccountId: true,
            createdAt: true,
          },
        },
      },
    });
  }
}

export { viewTransactionsService };
