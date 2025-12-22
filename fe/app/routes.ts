import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("/register", "routes/register.tsx"),

  ...prefix("dashboard", [index("routes/dashboard/home.tsx")]),
] satisfies RouteConfig;
