import { HttpContext } from "../http/HttpContext.js";
import type { IController } from "./IController.js";

export type ControllerFactory = (httpContext: HttpContext) => IController;

export interface IDependencyConainer {
  [key: string]: ControllerFactory | any;
}
