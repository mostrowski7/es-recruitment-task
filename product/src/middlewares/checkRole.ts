import { env } from "../config";
import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpException from "../utils/HttpException";
import jwt from "jsonwebtoken";
import axios from "axios";

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      userData: {
        id: string;
        username: string;
        role: Role;
      };
    }
  }
}

export default (role: Role): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        (req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Token") ||
        (req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer")
      ) {
        const userToken = req.headers.authorization;
        const serviceToken = jwt.sign(
          { service: "product" },
          env.JWT_SERVICE_SECRET_KEY
        );
        if (!serviceToken)
          throw new HttpException(500, "Cannot generate service token");
        const response = await axios.get(`${env.AUTH_SERVICE_PATH}/validate`, {
          headers: {
            service: serviceToken,
            authorization: userToken,
            role,
          },
        });
        if (!response.data)
          throw new HttpException(500, "User object is empty");
        req.userData = response.data;
        return next();
      }
      return next(new HttpException(401, "Authorization token not found"));
    } catch (e) {
      return next(new HttpException(401, "Permission denied"));
    }
  };
