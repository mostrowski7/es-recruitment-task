import { cleanEnv, num, str } from "envalid";
import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  DB_TYPE: str({ choices: ["postgres"] }),
  DB_URL: str(),
  JWT_USER_SECRET_KEY: str(),
  JWT_SERVICE_SECRET_KEY: str(),
  AUTH_SERVICE_PATH: str(),
});

export const dbConfig: ConnectionOptions = env.isProduction
  ? {
      type: env.DB_TYPE,
      url: env.DB_URL,
      entities: ["build/entities/**/*.js"],
      migrationsRun: true,
      migrations: ["build/migrations/*.js"],
    }
  : {
      type: env.DB_TYPE,
      url: env.DB_URL,
      synchronize: true,
      entities: ["src/entities/**/*.ts"],
    };
