import { IUser } from "../../interface";
import { prisma } from "../../lib/prisma";

class ValideUserService {
  async handle() {
    return await prisma.user.findMany({
      select: {
        username: true,
      },
    });
  }
}

class createUserService {
  async handle({ username, password }: IUser) {
    return await prisma.user.create({
      data: { username, password, accounts: { create: { balance: 10000} } },
    });
  }
}

export { createUserService, ValideUserService };
