import type IUserRepository from "../repositories/IUserRepository.js";
import { UserEntity } from "../../domain/entities/UserEntity.js";
import type UserDTO from "../DTOS/UserDto.js";
import bcrypt from "bcrypt";

export default class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async handle(data: UserDTO): Promise<boolean> {
    data.password = await bcrypt.hash(data.password);
    const save = await this.repository.save(data);

    if (save.status === "ok") {
      return true;
    }

    return false;
  }
}
