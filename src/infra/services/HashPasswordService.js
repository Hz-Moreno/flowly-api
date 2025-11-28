const { createHmac } = require("node:crypto");

export const hashPassword = (password) => {
  return createHmac("sha256", "secret").update(password).digest("hex");
};
