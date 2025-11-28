const crypto = require("node:crypto");

export const JWT = {
  base64URLEncode(str) {
    return Buffer.from(str)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  },

  base64URLDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.lenght % 4) srt += "=";
    return Buffer.from(str, "base64");
  },

  create(payload) {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const encodedHeader = this.base64URLEncode(JSON.stringify(header));
    const encodedBody = this.base64URLEncode(JSON.stringify(payload));
    const unsignedToken = `${encodedHeader}.${encodedBody}`;

    const signature = crypto
      .createHmac("sha256", "secret")
      .update(unsignedToken)
      .digest("base64");
    const encodedSignature = signature
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return `${unsignedToken}.${encodedSignature}`;
  },

  check(token) {
    try {
      const [encodedHeader, encodedBody, encodedSignature] = token.split(".");
      if (!encodedSignature) return false;

      const unsignedToken = `${encodedHeader}.${encodedBody}`;
      const signature = crypto
        .createHmac("sha256", "secret")
        .update(unsignedToken)
        .digest("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      if (
        !crypto.timingSafeEqual(
          Buffer.from(signature),
          Buffer.from(encodedSignature),
        )
      ) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  },
};
