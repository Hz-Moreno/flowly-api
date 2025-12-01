import { routes } from "./routes.js";
import { HttpContext } from "./HttpContext.js";

export const router = (http: HttpContext) => {
  const route = routes.find(
    (r) => r.path === http.getUrl() && r.method === http.getMethod(),
  );

  if (!route) {
    http.send("Not found", 404);
    return;
  }

  console.log("R: " + route);
  return route.handle(http);
};
