import type { IUserRepository } from "../repositories/IUserRepository.js";
import { UserEntity } from "../../domain/entities/UserEntity.js";

export default class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async handle(data: UserEntity): Promise<UserEntity> {
    return this.repository.save(data);
  }
}
