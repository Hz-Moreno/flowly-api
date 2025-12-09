import { UserEntity } from "../../domain/entities/UserEntity.js";
import type { RepositoryResponse } from "../types/RepositoryResponse.js";
import UserDTO from "../DTOS/UserDto.js";

export interface IUserRepository {
  save(data: UserDTO): Promise<RepositoryResponse>;
  // update(data: UserEntity): Promise<void>;
  // delete(id: string): Promise<void>;
  // get(id: string): Promise<UserEntity>;
}
