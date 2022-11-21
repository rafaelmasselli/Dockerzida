import { prisma } from "../../lib/prisma";

import jwt from "jsonwebtoken";
import { TokenUser } from "../../interface";

class authLoginService {
  async handle(username: string) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}

class tokenGenerator {
  handle({ user_id, username }: TokenUser) {
    return jwt.sign({ _id: user_id, username }, process.env.JWT_KEY || "", {
      expiresIn: "24h",
    });
  }
}

export { authLoginService, tokenGenerator };
