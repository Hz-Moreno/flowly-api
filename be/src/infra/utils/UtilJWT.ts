import crypto from "node:crypto";
import { env } from "../../../env.js";

function base64URLEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64URLDecode(str: string): Buffer {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64");
}

export function createJWT(payload: object | any): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64URLEncode(JSON.stringify(header));
  const encodedPayload = base64URLEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", env.key)
    .update(unsignedToken)
    .digest("base64");
  const encodedSignature = signature
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsignedToken}.${encodedSignature}`;
}

export function check(token: string): boolean {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");

    if (!encodedSignature) return false;

    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac("sha256", env.key)
      .update(unsignedToken)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/, "-")
      .replace(/\//g, "_");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(encodedSignature),
      )
    ) {
      return false;
    }

    const payload = JSON.parse(base64URLDecode(encodedPayload).toString());

    // if (payload.exp && Date.now() >= payload.exp * 1000) {
    //   return false;
    // }

    return true;
  } catch (err) {
    return false;
  }
}
