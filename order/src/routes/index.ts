import { Router } from "express";
import order from "./order";

const routes: Router = Router();

routes.use("/order", order);

export default routes;
