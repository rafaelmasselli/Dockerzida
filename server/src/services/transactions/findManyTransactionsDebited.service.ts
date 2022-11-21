import { prisma } from "../../lib/prisma";

class findManyTransactionsDebitedService {
  async handle(id: string) {
    return await prisma.accounts.findUnique({
      where: { id },
      select: {
        transactionsDebited: {
          select: {
            id: true,
            value: true,
            creditedAccountId: true,
            debitedAccountId: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }
}

export { findManyTransactionsDebitedService };
