import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
const envLines = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, "utf-8").split("\n")
  : [];

const env = {};

for (const line of envLines) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const [key, ...valueParts] = trimmed.split("=");
    if (key) {
      const value = valueParts
        .join("=")
        .trim()
        .replace(/^["']|["']$/g, "");
      env[key.trim()] = value;
    }
  }
}

function getEnvValue(field) {
  const value = env[field] ?? process.env[field];
  if (value === undefined) {
    if (defaultValue !== null) return defaultValue;
  }

  return value;
}

export { getEnvValue };
