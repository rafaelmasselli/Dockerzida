import { prisma } from "./../../lib/prisma";

class findNameAccountService {
  async handle(id: string) {
    return await prisma.accounts.findUnique({
      where: { id },
      select: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}

export { findNameAccountService };
