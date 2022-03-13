import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validation";
import basketController from "../controllers/basket";
import GetBasketDto from "../dto/GetBasketDto";
import checkRole, { Role } from "../middlewares/checkRole";
import AddProductDto from "../dto/AddProductDto";
import RemoveProductDto from "../dto/RemoveProductDto";
import isAuthMicroservice from "../middlewares/isAuthMicroservice";

const routes: Router = Router();

routes.post("/add", checkRole(Role.User), basketController.addBasket);

routes.post(
  "/addProduct",
  validateBody(AddProductDto),
  checkRole(Role.User),
  basketController.addProduct
);

routes.delete(
  "/removeProduct/:productId/:amount",
  validateParams(RemoveProductDto),
  checkRole(Role.User),
  basketController.removeProduct
);

routes.get(
  "/:id/get",
  validateParams(GetBasketDto),
  checkRole(Role.User),
  basketController.getBasket
);

routes.get(
  "/:id/get/service",
  validateParams(GetBasketDto),
  isAuthMicroservice,
  basketController.getBasket
);

export default routes;
