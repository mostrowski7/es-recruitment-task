import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { plainToInstance } from "class-transformer";
import HttpException from "../utils/HttpException";

export default (type: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req.body)).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          next(new HttpException(400, "Invalid data"));
        } else {
          next();
        }
      }
    );
  };
};
