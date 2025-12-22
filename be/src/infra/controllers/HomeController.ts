import type { HttpContext } from "../http/HttpContext.js";

export default class HomeController {
  static index(http: HttpContext) {
    return http.send("Hello", 200);
  }
}
