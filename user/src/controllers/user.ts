import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { Container } from "typedi";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const userService = Container.get(UserService);
    try {
      const userRow = await userService.register(req.body);
      return res.status(200).json(userRow);
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const userService = Container.get(UserService);
    try {
      const token = await userService.login(req.body);
      return res.status(200).json({ accessToken: token });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: Request, res: Response) => {
    return res.status(200).clearCookie("accessToken").end();
  },

  validateUser: async (req: Request, res: Response, next: NextFunction) => {
    const userService = Container.get(UserService);
    const {
      user,
      headers: { role },
    } = req;
    try {
      const userRow = await userService.validateUser({ user, role });
      return res.status(200).json(userRow);
    } catch (err) {
      next(err);
    }
  },
};
