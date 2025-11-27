import { pool } from "../database/pool.js";

export const SessionRepository = {
  async save(JWTToken, payload) {
    const stmt =
      "INSERT INTO users_sessions (user_id, token, status) VALUES (?, ?, ?)";
    const [result] = await pool.query(stmt, [payload.user.id, JWTToken, 1]);

    return result;
  },

  async getByToken(token) {
    const stmt = "SELECT * FROM users_sessions WHERE token = ? LIMIT 1";

    const [rows] = await pool.query(stmt, [token]);

    return rows[0];
  },
};
