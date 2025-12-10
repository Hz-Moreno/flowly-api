import { routes } from "./routes.js";
import { HttpContext } from "./HttpContext.js";
import { container } from "../dependencies/DependencyContainer.js";
import type { ControllerFactory } from "../interfaces/IDependencyContainer.js";

export const router = async (http: HttpContext): Promise<void> => {
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
          http.send("Bad Request", 400);
          return;
        }
      }
    }

    const controllerFactory = container[route.handlerKey] as ControllerFactory;

    if (typeof controllerFactory !== "function") {
      throw new Error(`Invalid handler to ${route.path}`);
    }

    const controllerInstance = controllerFactory(http);

    await controllerInstance.handle();
  } catch (err) {
    http.send("Internal error", 500);
  }
};
