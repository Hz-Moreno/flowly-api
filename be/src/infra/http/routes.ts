import HomeController from "../controllers/HomeController.js";
import AuthenticatedMiddleware from "./middlewares/authenticated.js";

export const routes = [
  {
    path: "/users",
    method: "POST",
    middleware: [],
    handlerKey: "getCreateUserController",
  },
];
