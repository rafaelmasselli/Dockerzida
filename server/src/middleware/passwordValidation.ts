import { Request, NextFunction, Response } from "express";

class passwordValidation {
  handle(request: Request, response: Response, nextFunction: NextFunction) {
    const { password } = request.body;

    let uppercasePasswordValidation = /^(?=.*[A-Z])(?=.*[a-z])/;
    let specialCharacters = /^(?=.*[$*&@#])/;

    if (password.length < 8) {
      return response.status(400).json({
        message: "Password field must be more than 7 digits",
      });
    }

    if (!specialCharacters.test(password)) {
      return response.status(400).json({
        message: "Use one or more special characters",
      });
    }

    if (!uppercasePasswordValidation.test(password)) {
      return response.status(400).json({
        message: "Use uppercase and lowercase letters",
      });
    }

    nextFunction();
  }
}

export { passwordValidation };
