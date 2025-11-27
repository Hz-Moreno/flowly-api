import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "dduser",
  password: "ddpassword",
  database: "flowly-db",
  waitForConnections: true,
  connectionLimit: 10,
});
