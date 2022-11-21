import { prisma } from "../../lib/prisma";

class findManyUserService {
  async handle() {
    return await prisma.user.findMany({
      select: {
        username: true,
      },
    });
  }
}

export { findManyUserService };
