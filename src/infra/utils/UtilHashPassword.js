import { createHmac } from "node:crypto";
import { getEnvValue } from "./UtilEnv.js";

const secret = getEnvValue("APP_KEY");

export const hashPassword = (password) => {
  return createHmac("sha256", secret).update(password).digest("hex");
};
