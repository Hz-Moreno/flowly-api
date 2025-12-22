import { HttpContext } from "../http/HttpContext.js";

export interface IController {
  handle: () => Promise<void>;
}
