import { UserEntity } from "../../domain/entities/UserEntity.js";

export interface IUserRepository {
  save(data: UserEntity): Promise<UserEntity>;
  // update(data: UserEntity): Promise<void>;
  // delete(id: string): Promise<void>;
  // get(id: string): Promise<UserEntity>;
}
