import type IUserRepository from "../../../app/repositories/IUserRepository.js";
import type { RepositoryResponse } from "../../../app/types/RepositoryResponse.js";
import type { UserEntity } from "../../../domain/entities/UserEntity.js";
import { pool } from "../pool.js";
import UserDTO from "../../../app/DTOS/UserDto.js";
import { randomUUID } from "node:crypto";

export default class UserRepository implements IUserRepository {
  async save(data: UserDTO): Promise<RepositoryResponse> {
    try {
      const newID = randomUUID();
      const stmt =
        "INSERT INTO users (id, name, password, email) VALUES (?,?,?,?)";
      await pool.query(stmt, [newID, data.name, data.password, data.email]);

      return {
        status: "ok",
        msg: "",
        content: {},
      };
    } catch (err) {
      return {
        status: "error",
        msg: (err as Error).message,
        content: {},
      };
    }
  }

  async getByEmail(email: string): Promise<RepositoryResponse> {
    try {
      const stmt = "SELECT * FROM users WHERE email = ?";
      const [content] = await pool.query(stmt, [email]);

      return {
        status: "ok",
        msg: "",
        content: content[0],
      };
    } catch (err) {
      return {
        status: "error",
        msg: (err as Error).message,
        content: {},
      };
    }
  }
}
