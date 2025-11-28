const { pool } = require("../database/pool.js");

export const UserRepository = {
  async getByEmail(email) {
    const stmt = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(stmt, [email]);

    return rows[0] || null;
  },

  async getById(id) {
    const stmt = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.query(stmt, [id]);

    return rows[0] || null;
  },

  async save(user) {
    const stmt =
      "INSERT INTO users (id, name, password, email, created_at, updated_at, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const [result] = await pool.query(stmt, [
      user.id,
      user.name,
      user.password,
      user.email,
      user.created_at,
      user.updated_at,
      user.is_active,
    ]);

    return result;
  },
};
