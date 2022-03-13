import { NextFunction, Request, RequestHandler, Response } from "express";
import UserService from "../services/UserService";
import Container from "typedi";
import HttpException from "../utils/HttpException";
import { Role } from "../entities/User";

const roles = [Role.User, Role.Admin];

export const checkPermissions = (user: Role, role: Role) => {
  return roles.indexOf(user) >= roles.indexOf(role);
};

export default (role: Role): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const userService = Container.get(UserService);
    try {
      const userRow = await userService.findOneById(req.token.id);
      if (!userRow) throw new HttpException(401, "Unauthenticated");
      if (checkPermissions(userRow.role, role)) return next();
      throw new HttpException(401, "Permission denied");
    } catch (e) {
      return next(e);
    }
  };
