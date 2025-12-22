import { createHmac } from "node:crypto";

export default class Password {
  static hash(str: string): string {
    return createHmac("sha256", "sectret").update(str).digest("hex");
  }
}
