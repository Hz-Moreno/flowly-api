import path from "path";
import fs from "fs";
import { pool } from "./pool.js";

export async function handle() {
  console.log("INIT FN");
  const dir = path.join(process.cwd(), "src", "database", "migrations");
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;

    const filePath = path.join(dir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    try {
      await pool.query(sql);
      console.log("FINISH FN");
    } catch (err) {
      console.error("Error on migrated: ", err);
      process.exit(1);
    }
  }
}

handle();
