import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { dbConfig } from "./../config";

export default async () => {
  useContainer(Container);
  try {
    return await createConnection(dbConfig);
  } catch (err) {
    throw err;
  }
};
