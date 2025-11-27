import { routes } from "./routes/index.js";
import { UtilRequest } from "./utils/UtilRequest.js";

export default {
  async handle(req, res) {
    const { url, method } = req;
    const route = routes.find((r) => r.path === url && r.method === method);
    const request = await UtilRequest.filter(req);

    if (!route) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));

      return;
    }

    if (route.middleware.length > 0) {
      for (const middleware of route.middleware) {
        try {
          const result = await middleware(request, req, res);
          console.log(result);
          if (res.headersSent) {
            return;
          }

          if (result === false || (result && !result.ok)) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Unauthorized :" + result.msg }));

            return;
          }
        } catch (err) {
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Unauthorized, pleas send a valid token" }),
          );

          return;
        }
      }
    }

    return route.handle(request, res);
  },
};
