import path from "path";
import fs from "fs";
import { pool } from "./pool.js";

export async function handle() {
  console.log("init migrate");
  const dir = path.join(process.cwd(), "src", "infra", "persistence", "tables");

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith(".sql")) continue;

    const filePath = path.join(dir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    try {
      await pool.query(sql);
      process.exit(1);
    } catch (err) {
      console.log("Error on migrate: ", err);
      process.exit(1);
    }
  }
}

handle();
