import { NextFunction, Request, Response } from "express";
import BasketService from "../services/BasketService";
import { Container } from "typedi";

export default {
  addBasket: async (req: Request, res: Response, next: NextFunction) => {
    const basketService = Container.get(BasketService);
    const { id } = req.userData;
    try {
      const basketRow = await basketService.create(id);
      return res.status(200).json(basketRow);
    } catch (err) {
      next(err);
    }
  },

  getBasket: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const basketService = Container.get(BasketService);
    try {
      const basketRow = await basketService.findOneById(id);
      return res.status(200).json(basketRow);
    } catch (err) {
      next(err);
    }
  },

  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    const basketService = Container.get(BasketService);
    const { id } = req.userData;
    const { productId, amount } = req.body;
    try {
      await basketService.addProduct({
        product: { productId, amount },
        userId: id,
      });
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },

  removeProduct: async (req: Request, res: Response, next: NextFunction) => {
    const basketService = Container.get(BasketService);
    const { id } = req.userData;
    const { productId, amount } = req.params;
    const parsedParams = {
      productId: parseInt(productId),
      amount: parseInt(amount),
    };
    try {
      await basketService.removeProduct({
        product: parsedParams,
        userId: id,
      });
      return res.sendStatus(200);
    } catch (err: any) {
      next(err);
    }
  },
};
