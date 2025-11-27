import { pool } from "../database/pool.js";

export const UserRepository = {
  async getByEmail(email) {
    const stmt = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(stmt, [email]);

    return rows[0];
  },

  async getById(id) {
    const stmt = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.query(stmt, [id]);

    return rows;
  },

  async save(user) {
    const stmt = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    const [result] = await pool.query(stmt, [
      user.name,
      user.email,
      user.password,
    ]);
    return result;
  },
};
