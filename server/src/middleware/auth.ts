import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

interface IUser {
  _id: string;
  username: string;
}

class authHeader {
  async handle(
    request: Request,
    response: Response,
    nextFunction: NextFunction
  ) {
    const header = request.headers.authorization;

    if (!header) {
      return response.status(400).json({
        message: "token not informed",
      });
    }

    const parts = header.split(" ");

    if (parts.length !== 2) {
      return response.status(400).json({ message: "Invalid token" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return response.status(400).json({ message: "Badly formatted token" });
    }

    try {
      const result = jwt.verify(token, process.env.JWT_KEY || "") as IUser;
      if (!result._id && !result.username) {
        return response
          .status(401)
          .json({ message: "Invalid token name or id are null" });
      }

      request.user_id = result._id;
      request.username = result.username;

      nextFunction();
    } catch {
      return response.status(401).json({
        message: "Invalid token",
      });
    }
  }
}

export { authHeader };
