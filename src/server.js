import http from "http";
import router from "./router.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(PORT, () => {
  console.log("Server on at 3000 port");
});
