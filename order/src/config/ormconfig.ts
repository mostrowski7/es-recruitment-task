import { dbConfig } from "./index";
import { ConnectionOptions } from "typeorm";

export default {
  ...dbConfig,
  migrations: ["build/migrations/*.js"],
  cli: {
    migrationsDir: __dirname + "/../migrations",
  },
} as ConnectionOptions;
