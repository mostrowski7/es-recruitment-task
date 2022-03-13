import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validation";
import productController from "../controllers/product";
import CreateProductDto from "../dto/CreateProductDto";
import DeleteProductDto from "../dto/DeleteProductDto";
import UpdateProductDto from "../dto/UpdateProductDto";
import GetProductDto from "../dto/GetProductDto";
import checkRole, { Role } from "../middlewares/checkRole";
import isAuthMicroservice from "../middlewares/isAuthMicroservice";
import DecreaseProductAmountDto from "../dto/DecreaseProductAmountDto";
const routes: Router = Router();

routes.post(
  "/add",
  validateBody(CreateProductDto),
  checkRole(Role.Admin),
  productController.addProduct
);

routes.delete(
  "/:id/delete",
  validateParams(DeleteProductDto),
  checkRole(Role.Admin),
  productController.deleteProduct
);

routes.put(
  "/update",
  validateBody(UpdateProductDto),
  checkRole(Role.Admin),
  productController.updateProduct
);

routes.get(
  "/:id?/get",
  validateParams(GetProductDto),
  productController.getProduct
);

routes.put(
  "/decrease/service",
  validateBody(DecreaseProductAmountDto),
  isAuthMicroservice,
  productController.decreaseProductsAmount
);

export default routes;
