import type { ServerResponse } from "http";
import { emailValidate } from "../../app/validatots/EmailValidate.js";
import { HttpContext } from "../http/HttpContext.js";
import CreateUserUseCase from "../../app/usecases/CreateUserUseCase.js";
import UserRepository from "../persistence/repositories/UserRepository.js";
import RequestValidator from "../../app/validatots/RequestValidator.js";
import UserDTO from "../../app/DTOS/UserDto.js";
import Password from "../utils/UtilPassword.js";
import { createJWT } from "../utils/UtilJWT.js";
import UserSessionRepository from "../persistence/repositories/UserSessionRepository.js";
import { SessionDTO } from "../../app/DTOS/SessionDto.js";
import { randomUUID } from "crypto";

export default class UserController {
  static async create(
    http: HttpContext,
  ): Promise<HttpContext | ServerResponse> {
    const userRepository = new UserRepository();
    const rules = ["email", "password", "name"];
    const content = await http.content();
    const validate = RequestValidator.handle(content.body, rules);

    if (validate.status === false) {
      return http.send(validate.message, 400);
    }

    try {
      const hashedPassword = Password.hash(content.body.password);
      const userDTO = new UserDTO(
        content.body.name,
        "",
        hashedPassword,
        content.body.email,
      );
      const saveUser = await userRepository.save(userDTO);
      console.log(saveUser);
      if (saveUser.status !== "ok") {
        return http.send(saveUser.msg, 500);
      }

      return http.send("User created", 201);
    } catch (err) {
      console.log("ERR: ", err);
      return http.send("Internal error", 500);
    }
  }

  static async login(http: HttpContext): Promise<HttpContext | ServerResponse> {
    const userRepository = new UserRepository();
    const rules = ["email", "password"];
    const content = await http.content();
    const validate = RequestValidator.handle(content.body, rules);

    const savedUser = await userRepository.getByEmail(content.body.email);

    if (!savedUser) {
      return http.send("User not found!", 404);
    }

    const hashedPassword = Password.hash(content.body.password);
    if (hashedPassword !== savedUser.content.password) {
      return http.send("Unauthorized! Password or email not found", 401);
    }

    try {
      const payload = {
        user_id: savedUser.content.id,
        created_at: Date.now(),
        role: "USER",
      };

      const jwt = createJWT(payload);
      const userSession = new UserSessionRepository();
      const expiresAt = content.body.lock_session
        ? null
        : new Date(Date.now() + +2 * 60 * 60 * 1000);

      const sessionDTO = new SessionDTO(
        randomUUID(),
        savedUser.content.id,
        jwt,
        new Date(),
        expiresAt,
      );

      userSession.save(sessionDTO);

      return http.send(
        {
          session_token: jwt,
        },
        201,
      );
    } catch (err) {
      return http.send("Internal Error", 500);
    }
  }
}
