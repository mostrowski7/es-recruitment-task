import { Router } from "express";
import basket from "./basket";

const routes: Router = Router();

routes.use("/basket", basket);

export default routes;
