import "reflect-metadata";
import { env } from "./config";
import server from "./server";

const start = async () => {
  const app = await server();
  app.listen(env.PORT, () => {
    console.log(`Product service listening on PORT ${env.PORT}`);
  });
};

start();
