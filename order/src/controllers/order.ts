import { NextFunction, Request, Response } from "express";
import OrderService from "../services/OrderService";
import { Container } from "typedi";

export default {
  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    const orderService = Container.get(OrderService);
    try {
      const orderRow = await orderService.create(req.body);
      return res.status(200).json(orderRow);
    } catch (err) {
      next(err);
    }
  },

  getOrder: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { id: userId } = req.userData;
    const orderService = Container.get(OrderService);
    try {
      const basketRow = await orderService.find({ id, userId });
      return res.status(200).json(basketRow);
    } catch (err) {
      next(err);
    }
  },

  deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
    const orderService = Container.get(OrderService);
    const { id } = req.params;
    try {
      await orderService.deleteOrder(id);
      return res.sendStatus(200);
    } catch (err: any) {
      next(err);
    }
  },
};
