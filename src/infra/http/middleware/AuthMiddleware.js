import { check } from "../utils/UtilJWT.js";
import { SessionRepository } from "../repository/SessionRepository.js";

export async function validateJWTToken(request, req, res) {
  const token = request.headers.token;

  if (!token) {
    return {
      ok: false,
      msg: "Missing Token",
    };
  }

  if (!check(token)) {
    console.log(222);
    return {
      ok: false,
      msg: "Invalid Token",
    };
  }

  const session = await SessionRepository.getByToken(token);

  if (session != null && session.status === 1) {
    return {
      ok: true,
      msg: "",
    };
  }

  return {
    ok: false,
    msg: "Unauthorized",
  };
}
