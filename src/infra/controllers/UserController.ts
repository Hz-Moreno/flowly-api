import { emailValidate } from "../../app/validatots/EmailValidate.js";
import { HttpContext } from "../http/HttpContext.js";

class UserController {
  create(http: HttpContext): HttpContext {
    const body = http.body();

    if (!emailValidate(body.email)) {
      return http.send("Message Test", 200);
    }

    return http.send("Message Test", 400);
  }
}
