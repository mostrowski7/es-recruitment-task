import "reflect-metadata";
import { env } from "./config/index";
import server from "./server";

const start = async () => {
  const app = await server();
  app.listen(env.PORT, () => {
    console.log(`Order service listening on PORT ${env.PORT}`);
  });
};

start();
