import { prisma } from "./../../lib/prisma";

class findUniqueUserService {
  async handle(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        accounts: {
          select: {
            id: true,
            balance: true,
            transactionsCredited: {
              select: {
                id: true,
              },
            },
            transactionsDebited: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }
}

class findUniqueAccount {
  async handle(id: string) {
    return await prisma.accounts.findUnique({
      where: { id },
      select: {
        transactionsDebited: {
          select: {
            id: true,
          },
        },
        transactionsCredited: {
          select: {
            id: true,
          },
        },
      },
    });
  }
}

export { findUniqueUserService, findUniqueAccount };
