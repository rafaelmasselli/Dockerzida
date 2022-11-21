import { IUser } from "../../interface";
import { prisma } from "../../lib/prisma";

class updatePasswordUserService {
  async handle(id: string, password: string) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}

class updateUsernameUserService {
  async handle(id: string, username: string) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
  }
}

export { updatePasswordUserService, updateUsernameUserService };
