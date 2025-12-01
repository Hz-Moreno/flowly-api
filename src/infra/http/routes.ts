import HomeController from "../controllers/HomeController.js";

export const routes = [
  {
    path: "/",
    method: "GET",
    middleware: [],
    handle: HomeController.index,
  },
];
