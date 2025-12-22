import type { HttpContext } from "../HttpContext.js";

export default class AuthenticatedMiddleware {
  async handle(http: HttpContext): Promise<boolean> {
    const jwt = (await http.content()).headers.token;
    if (!jwt) {
      return false;
    }

    return true;
  }
}
