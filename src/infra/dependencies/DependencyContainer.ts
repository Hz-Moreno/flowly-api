import UserRepository from "../persistence/repositories/UserRepository.js";
import CreateUserUseCase from "../../app/usecases/CreateUserUseCase.js";
import CreateUserController from "../controllers/CreateUserController.js";
import type { IDependencyConainer } from "../interfaces/IDependencyContainer.js";
import { HttpContext } from "../http/HttpContext.js";

const userRepository = new UserRepository();

export const container: IDependencyConainer = {
  userRepository: userRepository,

  getCreateUserUseCase: () => {
    return new CreateUserUseCase(userRepository);
  },

  getCreateUserController: (http: HttpContext) => {
    const createUserUseCase = container.getCreateUserUseCase();
    return new CreateUserController(http, createUserUseCase);
  },
};
