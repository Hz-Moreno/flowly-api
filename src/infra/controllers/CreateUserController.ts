import type { HttpContext } from "../http/HttpContext.js";
import UserRepository from "../persistence/repositories/UserRepository.js";
import RequestValidator from "../../app/validatots/RequestValidator.js";
import CreateUserUseCase from "../../app/usecases/CreateUserUseCase.js";
import UserDTO from "../../app/DTOS/UserDto.js";
import { randomUUID } from "node:crypto";

export default class CreateUserController {
  private http: HttpContext;
  private createUserUseCase: CreateUserUseCase;

  constructor(http: HttpContext, createUserUseCase: CreateUserUseCase) {
    this.http = http;
    this.createUserUseCase = createUserUseCase;
  }

  async handle() {
    const content = (await this.http.content()).body;
    const rules = ["email", "password", "name"];
    const validate = RequestValidator.handle(content, rules);

    if (!validate.status) {
      return this.http.send(validate.message, 400);
    }

    try {
      const userDto = new UserDTO(
        content.name,
        randomUUID(),
        content.email,
        content.password,
      );

      const saveUser = await this.createUserUseCase.handle(userDto);

      console.log(saveUser);

      this.http.send("User created", 201);
    } catch (err) {
      console.log(err);
      this.http.send("Internal Error", 500);
    }
  }
}
