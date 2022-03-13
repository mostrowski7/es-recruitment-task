import { Router } from "express";
import validation from "../middlewares/validation";
import userController from "../controllers/user";
import CreateUserDto from "../dto/CreateUserDto";
import LoginUserDto from "../dto/LoginUserDto";
import isAuth from "../middlewares/isAuth";
import attachUser from "../middlewares/attachUser";
import isAuthMicroservice from "../middlewares/isAuthMicroservice";

const routes: Router = Router();

routes.post("/register", validation(CreateUserDto), userController.register);

routes.post("/login", validation(LoginUserDto), userController.login);

routes.delete("/logout", isAuth, userController.logout);

routes.get(
  "/validate",
  isAuthMicroservice,
  isAuth,
  attachUser,
  userController.validateUser
);

export default routes;
