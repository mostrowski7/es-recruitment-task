import { Router } from "express";
import product from "./product";

const routes: Router = Router();

routes.use("/product", product);

export default routes;
