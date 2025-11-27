export default {
  index(request, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("Hello authenticated");
  },
};
