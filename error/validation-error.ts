import { ValidationErrorItem } from "joi";
import { NnoxxError } from "./nnoxx-error";
interface IInvalidField {
  field: ValidationErrorItem["path"][number];
  message: ValidationErrorItem["message"];
}
export class ValidationError extends NnoxxError {
  public invalidFields: IInvalidField[];

  constructor(invalidFields: ValidationErrorItem[]) {
    super("Validation Error", 422);
    this.invalidFields = this.getErrors(invalidFields);
  }

  private getErrors = (invalidFields: ValidationErrorItem[]) =>
    invalidFields.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
}
