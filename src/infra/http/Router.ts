import { routes } from "./routes.js";
import { HttpContext } from "./HttpContext.js";

export const router = async (http: HttpContext) => {
  const route = routes.find(
    (r) => r.path === http.getUrl() && r.method === http.getMethod(),
  );

  if (!route) {
    http.send("Not found", 404);
    return;
  }

  try {
    const middlewares = route.middleware;
    if (middlewares.length > 0) {
      for (const MiddlewareClass of middlewares) {
        const middleware = new MiddlewareClass();
        const next = await middleware.handle(http);
        if (!next) {
          return http.send("Bad request", 400);
        }
      }
    }

    return route.handle(http);
  } catch (err) {
    console.log(err);
    http.send("Internal error", 500);
  }
};
