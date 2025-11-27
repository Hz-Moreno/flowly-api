import HomeController from "../controller/HomeController.js";
import RegisterController from "../controller/auth/RegisterController.js";
import LoginController from "../controller/auth/LoginController.js";
import { validateJWTToken } from "../middleware/AuthMiddleware.js";
import DashboardHomeController from "../controller/dashboard/HomeController.js";

export const routes = [
  {
    path: "/",
    method: "GET",
    middleware: [],
    handle: HomeController.index,
  },
  {
    path: "/auth/register",
    method: "POST",
    middleware: [],
    handle: RegisterController.register,
  },
  {
    path: "/auth/login",
    method: "POST",
    middleware: [],
    handle: LoginController.login,
  },
  {
    path: "/dashboard",
    method: "POST",
    middleware: [validateJWTToken],
    handle: DashboardHomeController.index,
  },
];
