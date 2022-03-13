import { env } from "../config/index";
import { Request } from "express";
import jwt from "express-jwt";

export default jwt({
  secret: env.JWT_USER_SECRET_KEY,
  requestProperty: "token",
  getToken: (req: Request) => {
    if (
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Token") ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  },
  algorithms: ["HS256"],
});
