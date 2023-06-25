import { NnoxxError } from "./nnoxx-error";
import { ValidationError } from "./validation-error";

export const errorHandler = (error, res: any) => {
  switch (true) {
    case error instanceof ValidationError:
      res.status(error.httpCode).send(error.invalidFields);
    case error instanceof NnoxxError:
      res.status(error.httpCode).send({ error: error.message });
  }
};
