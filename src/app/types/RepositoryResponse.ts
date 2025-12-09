export type RepositoryResponse = {
  status: "ok" | "error" | "fail";
  msg: string;
  content: any;
};
