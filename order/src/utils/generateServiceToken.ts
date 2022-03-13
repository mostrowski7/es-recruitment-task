import HttpException from "./HttpException";
import jwt from "jsonwebtoken";
import { env } from "../config";

export default () => {
  const serviceToken = jwt.sign(
    { service: "basket" },
    env.JWT_SERVICE_SECRET_KEY
  );
  if (!serviceToken)
    throw new HttpException(500, "Cannot generate service token");
  return serviceToken;
};
