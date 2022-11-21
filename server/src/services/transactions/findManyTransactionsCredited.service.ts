import { prisma } from "../../lib/prisma";

class findManyTransactionsCreditedService {
  async handle(id: string) {
    return await prisma.accounts.findUnique({
      where: { id },
      select: {
        transactionsCredited: {
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

export { findManyTransactionsCreditedService };
