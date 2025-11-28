export const UtilRequest = {
  filter(req) {
    return new Promise((resolve) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        let json;

        try {
          json = JSON.parse(body);
        } catch {
          json = body;
        }

        resolve({
          headers: req.headers,
          body: json,
          method: req.method,
          url: req.url,
        });
      });
    });
  },
};
