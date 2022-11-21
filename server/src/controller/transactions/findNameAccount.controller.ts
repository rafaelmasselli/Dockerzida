import { Response, Request } from "express";
import { findNameAccountService } from "../../services/transactions/findNameCredited.service";

class findNameController {
  async handle(request: Request, response: Response) {
    await new findNameAccountService()
      .handle(request.body.id)
      .then((result) => {
        response.status(200).json({
          result,
        });
      })
      .catch((error) => {
        response.status(400).json({
          error,
        });
      });
  }
}

export { findNameController };
