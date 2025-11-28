const path = require("path");
const fs = require("fs");
const { pool } = require("./pool.js");

export async function handle() {
  const dir = path.join(
    process.cwd(),
    "src",
    "infra",
    "persistence",
    "database",
    "migrations",
  );
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;

    const filePath = path.join(dir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    try {
      await pool.query(sql);
      console.log(file, " Migrated!");
    } catch (err) {
      console.error("Error on migrate: ", err);
      process.exit(1);
    }
  }
}

handle();
