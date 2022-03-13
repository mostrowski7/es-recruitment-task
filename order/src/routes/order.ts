import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validation";
import orderController from "../controllers/order";
import GetOrderDto from "../dto/GetOrderDto";
import checkRole, { Role } from "../middlewares/checkRole";
import DeleteOrdertDto from "../dto/DeleteOrderDto";
import CreateOrderDto from "../dto/CreateOrderDto";

const routes: Router = Router();

routes.post(
  "/add",
  validateBody(CreateOrderDto),
  checkRole(Role.User),
  orderController.createOrder
);

routes.delete(
  "/:id/delete",
  validateParams(DeleteOrdertDto),
  checkRole(Role.User),
  orderController.deleteOrder
);

routes.get(
  "/:id?/get",
  validateParams(GetOrderDto),
  checkRole(Role.User),
  orderController.getOrder
);

export default routes;
