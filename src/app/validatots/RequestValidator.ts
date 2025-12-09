import { emailValidate } from "./EmailValidate.js";
type DataObject = Record<string, any>;
import { isEmpty } from "../helpers/isEmptyHelper.js";

export default class RequestValidator {
  static handle(
    data: DataObject,
    rules: Array<string>,
  ): { status: boolean; message: string } {
    let result = {
      status: true,
      message: "",
    };

    if (!data) {
      result.status = false;
      result.message = "Invalid payload";

      return result;
    }

    for (const field of rules) {
      const fieldValue = data[field];

      if (field == "email") {
        if (!emailValidate(fieldValue)) {
          result.status = false;
          result.message = "Email not valid";
          break;
        }
      }

      if (isEmpty(fieldValue)) {
        result.message = `Field: ${field} is required`;
        result.status = false;
        break;
      }
    }

    return result;
  }
}
