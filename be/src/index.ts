import http from "http";
import { router } from "./infra/http/Router.js";
import { HttpContext } from "./infra/http/HttpContext.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  const http = new HttpContext(req, res);
  router(http);
});

server.listen(PORT, () => {
  console.log("Server on at 3000 port");
});
