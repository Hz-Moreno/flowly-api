import type { IncomingMessage, ServerResponse } from "node:http";

export class HttpContext {
  private request: IncomingMessage;
  private response: ServerResponse;
  private _url: URL | null = null;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.request = req;
    this.response = res;
  }

  private get urlObj(): URL {
    if (!this._url) {
      const fullUrl = this.request.url || "/";
      const host = this.request.headers.host || "localhost";
      const protocol = (this.request.socket as any)?.encrypted
        ? "https"
        : "http";
      this._url = new URL(fullUrl, `${protocol}://${host}`);
    }
    return this._url;
  }

  get query(): URLSearchParams {
    return this.urlObj.searchParams;
  }

  get pathname(): string {
    return this.urlObj.pathname;
  }

  get url(): string | undefined {
    return this.request.url;
  }

  get method(): string | undefined {
    return this.request.method;
  }

  async content<T = any>(): Promise<{
    headers: IncomingMessage["headers"];
    body: T;
    method: string | undefined;
    query: URLSearchParams;
    url: string | undefined;
  }> {
    return new Promise((resolve, reject) => {
      if (["GET", "HEAD"].includes(this.request.method || "")) {
        return resolve({
          headers: this.request.headers,
          body: {} as T,
          method: this.method,
          url: this.url,
          query: this.query,
        });
      }

      let rawBody = "";

      this.request.on("data", (chunk) => {
        rawBody += chunk;
        if (rawBody.length > 1e6) {
          this.request.destroy(new Error("Payload too large"));
          reject(new Error("Request entity too large"));
        }
      });

      this.request.on("end", () => {
        let parsed: T;

        try {
          if (rawBody.length === 0) {
            parsed = {} as T;
          } else if (this.isJsonContentType()) {
            parsed = JSON.parse(rawBody) as T;
          } else {
            parsed = rawBody as unknown as T;
          }
        } catch (err) {
          if (this.isJsonContentType()) {
            return reject(new Error("Invalid JSON payload"));
          }
          parsed = rawBody as unknown as T;
        }

        resolve({
          headers: this.request.headers,
          body: parsed,
          method: this.method,
          url: this.url,
          query: this.query,
        });
      });

      this.request.on("error", (err) => reject(err));
    });
  }

  private isJsonContentType(): boolean {
    const contentType = this.request.headers["content-type"] || "";
    return /application\/json/.test(contentType);
  }

  getUrl(): string | undefined {
    return this.url;
  }

  getMethod(): string | undefined {
    return this.method;
  }

  json(data: any, statusCode = 200): ServerResponse {
    this.response.setHeader("Content-Type", "application/json");
    this.response.statusCode = statusCode;
    this.response.end(JSON.stringify(data));

    return this.response;
  }

  send(
    body: string | object,
    statusCode = 200,
    contentType = "application/json",
  ): ServerResponse {
    if (!this.response.headersSent) {
      this.response.setHeader("Content-Type", contentType);
      this.response.statusCode = statusCode;
    }

    const payload = typeof body === "object" ? JSON.stringify(body) : body;
    this.response.end(payload);

    return this.response;
  }
}
