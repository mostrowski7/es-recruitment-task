import { Request } from "express";
import jwt from "express-jwt";
import { env } from "../config";

export default jwt({
  secret: env.JWT_SERVICE_SECRET_KEY,
  requestProperty: "service",
  getToken: (req: Request) => {
    if (req.headers.service) {
      return req.headers.service;
    }
    return null;
  },
  algorithms: ["HS256"],
});
