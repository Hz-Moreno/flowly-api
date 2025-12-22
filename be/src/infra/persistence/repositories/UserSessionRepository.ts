import type { RepositoryResponse } from "../../../app/types/RepositoryResponse.js";
import { SessionDTO } from "../../../app/DTOS/SessionDto.js";
import { pool } from "../pool.js";

export default class UserSessionRepository {
  async save(data: SessionDTO): Promise<RepositoryResponse> {
    try {
      const stmt =
        "INSERT INTO users_sessions (id, user_id, token, created_at, expires_at) VALUES (?,?,?,?,?)";
      await pool.query(stmt, [
        data.id,
        data.user_id,
        data.token,
        data.created_at,
        data.expires_at,
      ]);

      return {
        status: "ok",
        msg: "",
        content: {},
      };
    } catch (err) {
      return {
        status: "error",
        msg: `${err}`,
        content: {},
      };
    }
  }
}
