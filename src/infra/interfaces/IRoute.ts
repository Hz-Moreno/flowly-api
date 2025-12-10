export interface IRoute {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  handlerKey: string;
  middleware: any[];
}
