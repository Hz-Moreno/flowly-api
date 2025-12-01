import type { IUserRepository } from "../repositories/IUserRepository.js";
import { User } from "../../domain/entities/UserEntity.js";

class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  handle(data: User): User {
    return this.repository.save(data);
  }
}
