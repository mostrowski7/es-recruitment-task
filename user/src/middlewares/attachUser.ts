import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import Container from "typedi";
import jwt from "express-jwt";
import HttpException from "../utils/HttpException";
import User, { Role } from "entities/User";

export type Token = jwt.Options;

declare global {
  namespace Express {
    interface Request {
      token: Token;
    }
  }
}

declare module "http" {
  interface IncomingHttpHeaders {
    role: Role;
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const userService = Container.get(UserService);
  try {
    const userRow = await userService.findOneById(req.token.id);
    if (!userRow) throw new HttpException(401, "Unauthorized");
    req.user = userRow;
    return next();
  } catch (e) {
    next(e);
  }
};
