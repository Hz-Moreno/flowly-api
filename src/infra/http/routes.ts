import HomeController from "../controllers/HomeController.js";
import UserController from "../controllers/UserController.js";
import AuthenticatedMiddleware from "./middlewares/authenticated.js";

export const routes = [
  {
    path: "/home",
    method: "GET",
    middleware: [AuthenticatedMiddleware],
    handle: HomeController.index,
  },
  {
    path: "/register",
    method: "POST",
    middleware: [],
    handle: UserController.create,
  },
  {
    path: "/login",
    method: "POST",
    middleware: [],
    handle: UserController.login,
  },
];
